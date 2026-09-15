import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p3',
    title: 'xksLokeh rqylhnkl · Part 3/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'xksLokeh rqylhnkl · Part 3/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_013', 'c11_hin_ar_cbse_07_014', 'c11_hin_ar_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text beyond its surface meaning by breaking down its components (plot, character, theme, language.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist investigating why a 100-year-old mango tree and a poor old poet nearly died for a road-widening project.',
            decisions: [{ prompt: 'Identify the specific literary device Renu employs when the Executive Engineer (कार्यपालक अभियंता) writes in his official note: "वक़्त.', options: [
                { text: '**Correct Answer:** Verbal Irony (व्यंग्यात्मक विडंबना)', outcome: '**Correct Answer:** Verbal Irony (व्यंग्यात्मक विडंबना). The Engineer uses "साहस" (courage) —.' },
                { text: 'sarcasm', outcome: 'Not quite — Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with.', reveals: 'critical-analysis-means-finding-faults' },
                { text: 'metaphor', outcome: 'Not quite — Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with.', reveals: 'critical-analysis-means-finding-faults' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a classroom where the teacher asks: "Why does the old man refuse to leave the tree even when offered compensation?" — this isn\'t a question.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in Class 11 Hindi, and how does it differ from a casual conversation about a story?', options: [
                { text: 'The primary purpose is collaborative meaning-making through evidence-based analysis of', outcome: 'The primary purpose is collaborative meaning-making through evidence-based analysis of literary.' },
                { text: 'sharing opinions freely', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I think the mother is brave").', reveals: 'discussion-means-taking-turns-stating' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I think the mother is brave").', reveals: 'discussion-means-taking-turns-stating' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'Review "Inferential Question Types" in Node 012 — specifically, practice converting.',
          misconception: 'Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with the author.',
          parts: [
                { id: 'a', prompt: 'Identify the specific literary device Renu employs when the Executive Engineer (कार्यपालक अभियंता) writes in his official note: "वक़्त है...', answer: '**Correct Answer:** Verbal Irony (व्यंग्यात्मक विडंबना)',
                  options: ['**Correct Answer:** Verbal Irony (व्यंग्यात्मक विडंबना)', 'sarcasm', 'metaphor', 'Critical Analysis'],
                  hint: 'Review "Inferential Question Types" in Node 012 — specifically, practice converting explicit.',
                  misconception: 'Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with the author.' },
                { id: 'b', prompt: 'Apply the concept of "Kafkaesque bureaucracy" to the scene where the file moves from Executive Engineer → Horticulture Superintendent → Forest Ranger →.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Critical Analysis', 'The story is unrealistic'],
                  hint: 'Review "Inferential Question Types" in Node 012 — specifically, practice converting explicit.',
                  misconception: 'Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with the author.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['**Re-anchor to Satire Definition:** "Satire uses exaggeration to reveal truth.', 'The \'pushing\' is a metaphor for file-notings that deny pensions, delay compensation, or ignore environmental impact.', '**Map the Paper Trail:** Give the student a blank flowchart of the 5 departments.', 'Ask them to fill *only* the official reason each gives for refusal (from text).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with the author.',
          parts: [
                { id: 'a', prompt: 'Evaluate the story\'s ending: The tree is saved, the poet lives, the road is widened *around* the tree. Is this a "happy ending"?', answer: '**Correct Answer:** No, it is a *tragic irony*, not a happy ending',
                  options: ['**Correct Answer:** No, it is a *tragic irony*, not a happy ending', 'Yes, justice prevailed', 'The tree was saved', 'Critical Analysis'],
                  hint: 'Review "Inferential Question Types" in Node 012 — specifically, practice converting explicit.',
                  misconception: 'Students believe "Critical Analysis" means *finding faults* with the story or *disagreeing* with the author.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['**Re-anchor to Satire Definition:** "Satire uses exaggeration to reveal truth.', 'The \'pushing\' is a metaphor for file-notings that deny pensions, delay compensation, or ignore environmental impact.', '**Map the Paper Trail:** Give the student a blank flowchart of the 5 departments.', 'Ask them to fill *only* the official reason each gives for refusal (from text).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills based on a literary chapter involve the ability to construct.',
          hint: 'Review c11_hin_ar_cbse_07_006 (Theme: Primary Theme) and c11_hin_ar_cbse_07_013 (Critical.',
          misconception: 'छात्र अक्सर मानते हैं कि \'लेखन कौशल\' का अर्थ केवल \'सुंदर भाषा में लिखना\' या \'कहानी का सारांश लिखना\' है। वे PEEL संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on a literary chapter involve the ability to construct structured,',
                  options: ['Writing skills based on a literary chapter involve the ability to construct structured,', '"Before You Read: Context and Background" prepares students to engage with Phanishwar', 'Plot and narrative structure refers to the deliberate arrangement of events in a', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review c11_hin_ar_cbse_07_006 (Theme: Primary Theme) and c11_hin_ar_cbse_07_013 (Critical Thinking).',
                  misconception: 'छात्र अक्सर मानते हैं कि \'लेखन कौशल\' का अर्थ केवल \'सुंदर भाषा में लिखना\' या \'कहानी का सारांश लिखना\' है। वे PEEL संरचना को \'स्कूल का नियम\'.' }
          ],
            remediations: { 'peel': { steps: ['चरण 1: छात्र से कहें - "एक वाक्य में बताओ: यह कहानी किस बारे में है?" (अपेक्षित: "नौकरशाही की संवेदनहीनता के बारे.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the engineer\'s report (page 93) and the final bureaucratic resolution.',
          misconception: 'Students believe "discussion" means taking turns stating opinions ("I think the mother is brave") without textual.',
          parts: [
                { id: 'a', prompt: 'During a discussion, a peer argues: "The mother is the true protagonist because she fights for the tree." Using the PEEL structure (Point, Evidence.', answer: 'Strong response: "Point: The mother acts as catalyst, not protagonist',
                  options: ['Strong response: "Point: The mother acts as catalyst, not protagonist', 'discussion', 'I think the mother is brave', 'the mother is brave") without textual evidence or engaging peers\' ideas'],
                  hint: 'If stuck, review the engineer\'s report (page 93) and the final bureaucratic resolution (page 98).',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I think the mother is brave") without textual evidence or engaging.' },
                { id: 'b', prompt: 'Compare how two discussion participants might use the same textual detail — the genealogical chain of officials (page 92: "vaMj&lsozsQVjh ls iwN yw¡...', answer: 'Reading (a) highlights the comic escalation',
                  options: ['Reading (a) highlights the comic escalation', 'discussion', 'I think the mother is brave', 'the mother is brave") without textual evidence or engaging peers\' ideas'],
                  hint: 'If stuck, review the engineer\'s report (page 93) and the final bureaucratic resolution (page 98).',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I think the mother is brave") without textual evidence or engaging.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student offers opinion-only responses: (1) Pause and model: "Let\'s find where the text shows that — can you point.', '(4) Assign a \'listener role\' in next discussion: their job is to paraphrase three peers\' arguments before adding their.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
