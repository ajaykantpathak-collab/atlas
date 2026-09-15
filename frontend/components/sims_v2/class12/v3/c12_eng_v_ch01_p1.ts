import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch01_p1: SimDef = {
    id: 'v3_c12_eng_v_ch01_p1',
    title: 'The Third Level · Part 1/3',
    subtitle: 'Grand Central has two levels — Charley found a third',
    classLevel: 12, subject: 'eng_v', topic: 'The Third Level · Part 1/3',
    chapters: ['c12_eng_v_ch01'],
    nodeIds: ['c12_eng_v_cbse_01_001', 'c12_eng_v_cbse_01_002', 'c12_eng_v_cbse_01_003', 'c12_eng_v_cbse_01_004', 'c12_eng_v_cbse_01_005', 'c12_eng_v_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Speculative fiction reader', intro: 'An ordinary commuter takes a wrong turn in a station and ends up in 1894. Nobody believes him — and that disbelief is the story.', goal: 'Read The Third Level as the collision of modern anxiety and the fantasy of a gentler past.' },
    discovery: {
        question: 'Charley swears Grand Central has a hidden third level that opens onto 1894. His psychiatrist calls it \'waking-dream wish fulfillment.\' Is the diagnosis a dismissal — or the story\'s whole point?',
        options: ['The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address', 'A dismissal — Charley is simply lying', 'Proof he\'s insane', 'Evidence of a real tunnel'],
        answer: 'The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address',
        hook: 'Finney grounds the impossible in the mundane — a tan gabardine suit, a stamp collection, a wife to get home to — so fantasy borrows credibility. Even the stamps are contested ground: the psychiatrist calls them \'refuge,\' Charley calls them inheritance from a gentler era.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read" section is a pre-reading activity that activates prior knowledge, sets historical and psychological context, and introduces the central thematic tension of the story — the human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow Charley below the platforms: weigh the 1894 evidence — gaslights, Cleveland-era bills, a bought ticket — against the waking-dream diagnosis, and decide what Sam\'s letter proves.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you tell your friends you saw a dinosaur in your backyard — they\'d laugh, right?',
            decisions: [{ prompt: 'What is the specific question posed in the "Before You Read" box of "The Third Level"?', options: [
                { text: 'The question is: "Have you ever had any curious experience', outcome: 'The question is: "Have you ever had any curious experience which others find hard to believe?".' },
                { text: 'Have you ever had any curious experience', outcome: 'Not quite — Students often think the "Before You Read" section is optional or separate from the story.', reveals: 'the-before-you-read-section' },
                { text: 'What is the third level?', outcome: 'Not quite — Students often think the "Before You Read" section is optional or separate from the story.', reveals: 'the-before-you-read-section' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re standing in a busy metro station today — noise, crowds, digital screens, anxiety about missing your train.',
            decisions: [{ prompt: 'What are the two primary physical settings contrasted in "The Third Level," and what specific year does the Third Level represent?', options: [
                { text: 'The two primary settings are the modern Grand Central Station (first and second levels)', outcome: 'The two primary settings are the modern Grand Central Station (first and second levels) and the.' },
                { text: 'Charley\'s office and Galesburg', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms, writing: "The setting of the Third Level.', reveals: 'students-treat-setting-and-atmosphere' },
                { text: 'the subway and the train', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms, writing: "The setting of the Third Level.', reveals: 'students-treat-setting-and-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Start by asking the student: "Have you ever felt so overwhelmed by modern life that you wished you could just step into a simpler past?',
            decisions: [{ prompt: 'What is Charley\'s age and occupation as stated in the story?', options: [
                { text: 'Charley is 31 years old and works in an office (he mentions working late at the office)', outcome: 'Charley is 31 years old and works in an office (he mentions working late at the office).' },
                { text: 'he is a student or retired', outcome: 'Not quite — Students often think Charley is either "crazy" or a "time traveler." The text supports neither.', reveals: 'charley-is-either-crazy-or' },
                { text: 'Charley is either "crazy" or a "time traveler', outcome: 'Not quite — Students often think Charley is either "crazy" or a "time traveler." The text supports neither.', reveals: 'charley-is-either-crazy-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re a detective trying to understand why Charley believes in the third level — you wouldn\'t just interview Charley; you\'d talk to his wife, his.',
            decisions: [{ prompt: 'List the five supporting characters in "The Third Level" who directly interact with Charley or his narrative, and state one concrete action.', options: [
                { text: 'The five supporting characters are: (1) Louisa', outcome: 'The five supporting characters are: (1) Louisa — Charley\'s wife who initially worries about his.' },
                { text: 'waking-dream wish fulfillment', outcome: 'Not quite — Students treat supporting characters as mere "helpers" or "obstacles" to the protagonist, writing.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'That ain\'t money, mister', outcome: 'Not quite — Students treat supporting characters as mere "helpers" or "obstacles" to the protagonist, writing.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re sitting in a crowded metro after a terrible exam, wishing you could just step onto a train that takes you back to Class 10 when life felt.',
            decisions: [{ prompt: 'What is the psychiatrist\'s exact diagnosis of Charley\'s experience on the third level, and what modern-world conditions does he cite as the.', options: [
                { text: 'The psychiatrist diagnoses it as a "waking-dream wish fulfillment" caused by the modern', outcome: 'The psychiatrist diagnoses it as a "waking-dream wish fulfillment" caused by the modern world being.' },
                { text: 'waking-dream wish fulfillment', outcome: 'Not quite — Students treat the primary theme as "time travel exists" or "the third level is a real place.', reveals: 'students-treat-the-primary-theme' },
                { text: 'hallucination', outcome: 'Not quite — Students treat the primary theme as "time travel exists" or "the third level is a real place.', reveals: 'students-treat-the-primary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate drowning in board-exam stress swears he found a forgotten stairwell in the old school block that opens into the town as it looked decades ago — gaslights, quiet streets, no exam timetables. Everyone laughs; he insists it\'s real and keeps trying to go back.',
            decisions: [{ prompt: 'How do you respond, having read \'The Third Level\'?', options: [
                { text: 'Neither mock him nor book a ticket — hear it the way the psychiatrist frames Charley\'s third level: a waking-dream wish fulfillment. Ask what he\'s escaping, because the vividness of the refuge is a map of the anxiety he\'s fleeing.', outcome: 'Finney grounds the fantasy in an ordinary man under \'insecurity, fear, war, worry\' — the experience is psychologically true even if the corridor isn\'t, so the useful move is listening to what the escape is escaping from.' },
                { text: 'Take his detailed description as proof and start searching for the stairwell yourself.', outcome: 'Vivid detail is exactly what makes wish fulfillment convincing — Charley\'s gaslights and derby hats felt real too; treating the description as evidence misses that the detail serves the longing, not the claim.', reveals: 'detail-equals-proof' },
                { text: 'Tell him plainly he\'s making it up and should get back to revision.', outcome: 'That repeats Louisa\'s anger and the friends\' disbelief — the story shows dismissal isolates the believer without touching the wish that produced the dream.', reveals: 'disbelief-fixes-fantasy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read escapism as diagnosis and desire at once — and see how realism smuggles the impossible past the reader\'s guard.',
            decisions: [{ prompt: 'What comes next? The Third Level · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Third Level · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_001', difficulty: 'standard',
          question: 'The "Before You Read" section is a pre-reading activity that activates prior.',
          hint: 'If stuck, review Class 11 Hornbill c11_eng_h_cbse_01_001 "Before You Read" for "The.',
          misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.',
          parts: [
                { id: 'a', prompt: 'What is the specific question posed in the "Before You Read" box of "The Third Level"?', answer: 'The question is: "Have you ever had any curious experience',
                  options: ['The question is: "Have you ever had any curious experience', 'Have you ever had any curious experience', 'What is the third level?', 'Who is Charley?'],
                  hint: 'If stuck, review Class 11 Hornbill c11_eng_h_cbse_01_001 "Before You Read" for "The Portrait of.',
                  misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.' },
                { id: 'b', prompt: 'In your own words, explain why Charley\'s psychiatrist friend calls the third level a "waking-dream wish fulfillment."', answer: 'The psychiatrist means Charley\'s experience is a conscious fantasy born from his',
                  options: ['The psychiatrist means Charley\'s experience is a conscious fantasy born from his', 'The psychiatrist thinks Charley is lying', 'It\'s a dream Charley had while sleeping', 'waking-dream'],
                  hint: 'If stuck, review Class 11 Hornbill c11_eng_h_cbse_01_001 "Before You Read" for "The Portrait of.',
                  misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.' },
                { id: 'c', prompt: 'Compare the psychiatrist\'s interpretation of Charley\'s stamp collecting ("temporary refuge from reality") with Charley\'s own defense ("my grandfather didn\'t.', answer: 'The psychiatrist sees stamp collecting as escapism',
                  options: ['The psychiatrist sees stamp collecting as escapism', 'They just disagree about stamps', 'Before You Read', 'the "Before You Read" section is optional or separate from the story'],
                  hint: 'If stuck, review Class 11 Hornbill c11_eng_h_cbse_01_001 "Before You Read" for "The Portrait of.',
                  misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.' }
          ],
            remediations: { 'the-before-you-read-section': { steps: ['If a student cannot link the pre-reading prompt to Charley\'s experience, do this: 1.', 'Have them re-read the prompt and the first paragraph side-by-side.', 'Ask: "Who is the \'I\' in the first paragraph?', 'Map each element: Prompt → "curious experience" = third level; "others find hard to believe" = psychiatrist, wife.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The \'Before You Read\' question is just a gimmick to get students interested; it has no analytical value for understanding the story.".', answer: 'The statement is false',
                  options: ['The statement is false', 'Before You Read', 'the "Before You Read" section is optional or separate from the story'],
                  hint: 'If stuck, review Class 11 Hornbill c11_eng_h_cbse_01_001 "Before You Read" for "The Portrait of.',
                  misconception: 'Students often think the "Before You Read" section is optional or separate from the story — something to skip.' }
          ],
            remediations: { 'the-before-you-read-section': { steps: ['If a student cannot link the pre-reading prompt to Charley\'s experience, do this: 1.', 'Have them re-read the prompt and the first paragraph side-by-side.', 'Ask: "Who is the \'I\' in the first paragraph?', 'Map each element: Prompt → "curious experience" = third level; "others find hard to believe" = psychiatrist, wife.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_002', difficulty: 'standard',
          question: 'Plot is the sequence of events that make up a story, while narrative structure.',
          hint: 'If stuck, review the worked example in c11_eng_h_cbse_01_002 that maps a linear story.',
          misconception: 'Students often treat the psychiatrist’s “waking-dream wish fulfillment” as the author’s definitive explanation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the sequence of events that make up a story, while narrative structure refers to',
                  options: ['Plot is the sequence of events that make up a story, while narrative structure refers to', 'The "Before You Read" section is a pre-reading activity that activates prior knowledge,', 'Setting is the time, place, and social environment in', 'Character analysis of the protagonist involves examining the main character\'s personality'],
                  hint: 'If stuck, review the worked example in c11_eng_h_cbse_01_002 that maps a linear story to Freytag’s.',
                  misconception: 'Students often treat the psychiatrist’s “waking-dream wish fulfillment” as the author’s definitive explanation, ignoring that the story’s.' }
          ],
            remediations: { 'students-often-treat-the-psychiatrist': { steps: ['Re-read the story and highlight every time marker (e.g., “One night last summer,” “Next day,” “July 18, 1894”).', 'Draw two timelines: one for chronological events, one for the order they appear in the text.', 'Compare the two and note where they diverge — that divergence *is* the narrative structure.', 'Revisit the Class 11 node on narrative structure (c11_eng_h_cbse_01_002) and complete its worked example on framing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_003', difficulty: 'standard',
          question: 'Setting is the time, place, and social environment in which a story occurs.',
          hint: 'If the student cannot separate detail from effect, return to c11_eng_h_cbse_01_003 and.',
          misconception: 'Students treat "setting" and "atmosphere" as synonyms, writing: "The setting of the Third Level is peaceful." They list.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the narrator describes the atmosphere of the modern Grand Central Station versus the Third Level.', answer: 'Modern station: disorienting, cavernous, anxiety-inducing',
                  options: ['Modern station: disorienting, cavernous, anxiety-inducing', 'there were gaslights and spittoons', 'only lists objects without naming the *feeling* (e'],
                  hint: 'If the student cannot separate detail from effect, return to c11_eng_h_cbse_01_003 and practice the.',
                  misconception: 'Students treat "setting" and "atmosphere" as synonyms, writing: "The setting of the Third Level is peaceful." They list period objects.' },
                { id: 'b', prompt: 'Compare the function of the arched doorway/corridor in "The Third Level" with the function of the tunnel in "The Tunnel" (Class 7, c7_engl_ch04_001).', answer: 'In "The Third Level," the corridor is a *psychological threshold*',
                  options: ['In "The Third Level," the corridor is a *psychological threshold*', 'tunnels leading to adventure'],
                  hint: 'If the student cannot separate detail from effect, return to c11_eng_h_cbse_01_003 and practice the.',
                  misconception: 'Students treat "setting" and "atmosphere" as synonyms, writing: "The setting of the Third Level is peaceful." They list period objects.' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['Have the student re-read only the Third Level discovery passage (para 3-4 of NCERT text) and highlight every sensory.', 'Ask: "Group these highlights into clusters. What feeling does each cluster produce?"', 'Repeat for the modern station passage (para 2).', 'Write two PEEL paragraphs — one for each setting — using the clusters as Evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the main character\'s.',
          hint: 'If stuck, review Class 11 character analysis (c11_eng_h_cbse_01_004) and re-read the.',
          misconception: 'Students often think Charley is either "crazy" or a "time traveler." The text supports neither extreme: Charley is.',
          parts: [
                { id: 'a', prompt: 'Charley says, "I wasn\'t trying to escape from anything; I just wanted to get home to Louisa." Apply the concept of dramatic irony: why is this statement ironic.', answer: 'The statement is ironic',
                  options: ['The statement is ironic', 'it\'s not ironic because he really just wanted to go home', 'Charley is either "crazy" or a "time traveler'],
                  hint: 'If stuck, review Class 11 character analysis (c11_eng_h_cbse_01_004) and re-read the story focusing.',
                  misconception: 'Students often think Charley is either "crazy" or a "time traveler." The text supports neither extreme: Charley is a psychologically.' }
          ],
            remediations: { 'charley-is-either-crazy-or': { steps: ['If a student holds the "crazy vs.', 'time traveler" misconception, do this: (1) Have them re-read the psychiatrist\'s dialogue and Charley\'s reaction.', '(2) Ask: "Does the psychiatrist say Charley is mentally ill?', 'What words does he use?" (3) Point out the ending: Sam\'s letter and the first-day cover.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_005', difficulty: 'standard',
          question: 'Supporting character analysis examines how secondary characters (Louisa, Sam.',
          hint: 'If stuck, revisit c12_eng_v_cbse_01_004 (Protagonist Analysis) and re-read paragraphs 1.',
          misconception: 'Students treat supporting characters as mere "helpers" or "obstacles" to the protagonist, writing answers like "Louisa.',
          parts: [
                { id: 'a', prompt: 'List the five supporting characters in "The Third Level" who directly interact with Charley or his narrative, and state one concrete action or line of dialogue.', answer: 'The five supporting characters are: (1) Louisa',
                  options: ['The five supporting characters are: (1) Louisa', 'waking-dream wish fulfillment', 'That ain\'t money, mister', 'The World'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_01_004 (Protagonist Analysis) and re-read paragraphs 1, 2, and 6.',
                  misconception: 'Students treat supporting characters as mere "helpers" or "obstacles" to the protagonist, writing answers like "Louisa supports Charley".' },
                { id: 'b', prompt: 'Sam Weiner is Charley\'s psychiatrist. Apply the concept of "dramatic irony" to analyze Sam\'s final letter from 1894.', answer: 'Dramatic irony occurs when the audience knows something a character doesn\'t',
                  options: ['Dramatic irony occurs when the audience knows something a character doesn\'t', 'hypocrite'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_01_004 (Protagonist Analysis) and re-read paragraphs 1, 2, and 6.',
                  misconception: 'Students treat supporting characters as mere "helpers" or "obstacles" to the protagonist, writing answers like "Louisa supports Charley".' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student writes generic "supporting character" answers: (1) Have them reread only the dialogues of Louisa, Sam, and.', '(2) For each line, ask: "What thematic position does this voice represent?', 'Proof?" (3) Have them rewrite one 100-word answer using this template: "Character X represents [thematic position].', '"Documentary Verification."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of "The Third Level" is the human desire to escape the.',
          hint: 'If stuck, review c12_eng_v_cbse_01_004 for Charley\'s anxiety evidence and.',
          misconception: 'Students treat the primary theme as "time travel exists" or "the third level is a real place Charley discovered." They.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "waking-dream wish fulfillment" to a new scenario: A student stressed about board exams starts vividly daydreaming about a childhood.', answer: 'Stressor: board exam pressure (modern insecurity/fear)',
                  options: ['Stressor: board exam pressure (modern insecurity/fear)', 'just dreaming', 'waking'],
                  hint: 'If stuck, review c12_eng_v_cbse_01_004 for Charley\'s anxiety evidence and c12_eng_v_cbse_01_001 for.',
                  misconception: 'Students treat the primary theme as "time travel exists" or "the third level is a real place Charley discovered." They focus on the.' }
          ],
            remediations: { 'students-treat-the-primary-theme': { steps: ['Re-read the psychiatrist\'s dialogue (paragraph 1) and underline every modern-world condition he lists (insecurity.', 'List three moments where Charley explicitly says he wants to escape TO (Galesburg 1894 details).', 'Write one PEEL paragraph answering: "How does the psychiatrist\'s diagnosis explain Charley\'s stamp collecting AND the.', 'Check c12_eng_v_cbse_01_004 (Character Analysis: Protagonist) for Charley\'s anxiety evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
