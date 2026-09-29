import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch18_p1: SimDef = {
    id: 'v3_c11_eng_w_ch18_p1',
    title: 'Felling of the Banyan Tree (Poem) · Part 1/3',
    subtitle: 'Watch two hundred years come down in seven days — and keep growing in a dream.',
    classLevel: 11, subject: 'eng_w', topic: 'Felling of the Banyan Tree (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch18'],
    nodeIds: ['c11_eng_w_cbse_18_001', 'c11_eng_w_cbse_18_002', 'c11_eng_w_cbse_18_003', 'c11_eng_w_cbse_18_004', 'c11_eng_w_cbse_18_005', 'c11_eng_w_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a child watching the family banyan come down', intro: 'Sacred tree, developer\'s logic, fifty men with axes — and a boy who carries the stump to Bombay in his sleep.', goal: 'Analyse the poem\'s engineered narrative time and its unresolved ending.' },
    discovery: {
        question: 'The tree\'s seven-day felling sprawls across line after line, while its two hundred years of life compress into a single phrase: \'the rings of two hundred years.\' Why engineer time that way?',
        options: ['To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief', 'To keep the poem short for exams', 'Because seven days is poetically harder to say than two centuries', 'No reason — narrative pacing is accidental here'],
        answer: 'To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief',
        hook: 'The grandmother says \'trees are sacred\'; the father \'massacred them all\' — the poem lets both be true, and makes you watch the saw do it slowly.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Felling of the Banyan Tree\' (Woven Words, ch. 18) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_18_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Label the stages of a felling — order, warning, seven days of sawing, fifty men, revealed rings — then test the ending where the tree \'grows and seethes in one\'s dreams.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Felling of the Banyan Tree\', then the period, then the literary context — background turns a text from a puzzle into a story you can.',
            decisions: [{ prompt: 'Who is the poet of "Felling of the Banyan Tree" and what is significant about his linguistic background?', options: [
                { text: 'The poet is Dilip Chitre (1938–2009), born in Baroda, who wrote poetry in both Marathi', outcome: 'The poet is Dilip Chitre (1938–2009), born in Baroda, who wrote poetry in both Marathi and English.' },
                { text: 'raw mythology', outcome: 'Not quite — Students often think "context and background" means memorizing the poet\'s birth/death dates and the.', reveals: 'context-and-background-means-memorizing' },
                { text: 'seethes', outcome: 'Not quite — Students often think "context and background" means memorizing the poet\'s birth/death dates and the.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Felling of the Banyan Tree\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the two primary geographical locations mentioned in the poem that form the physical setting?', options: [
                { text: 'The two primary geographical locations are Baroda (where the house on the hill and the', outcome: 'The two primary geographical locations are Baroda (where the house on the hill and the banyan tree.' },
                { text: 'setting', outcome: 'Not quite — Students often think "setting" only means the physical location (Baroda, Bombay) and "atmosphere".', reveals: 'setting-only-means-the-physical' },
                { text: 'atmosphere', outcome: 'Not quite — Students often think "setting" only means the physical location (Baroda, Bombay) and "atmosphere".', reveals: 'setting-only-means-the-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Felling of the Banyan Tree\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist of "Felling of the Banyan Tree," and what is the single most important action they take in the poem?', options: [
                { text: 'The protagonist is the poet\'s father', outcome: 'The protagonist is the poet\'s father; his decisive action is ordering the removal of the massive.' },
                { text: 'the poet or the tree', outcome: 'Not quite — Students often assume the poet (the "I") is the protagonist because the poem is written in first.', reveals: 'the-poet-the-i-is' },
                { text: 'the poet (the "I") is the protagonist', outcome: 'Not quite — Students often assume the poet (the "I") is the protagonist because the poem is written in first.', reveals: 'the-poet-the-i-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Felling of the Banyan Tree\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "Felling of the Banyan Tree" as distinct from its subject matter?', options: [
                { text: 'The primary theme is the irreversible destruction of natural and cultural heritage in the', outcome: 'The primary theme is the irreversible destruction of natural and cultural heritage in the name.' },
                { text: 'The poem is about a father cutting down a tree', outcome: 'Not quite — Students often think the primary theme is simply "deforestation is bad" or "we should save trees.".', reveals: 'the-primary-theme-is-simply' },
                { text: 'deforestation is bad', outcome: 'Not quite — Students often think the primary theme is simply "deforestation is bad" or "we should save trees.".', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your colony\'s oldest banyan is marked for felling to widen a road. At a residents\' meeting you read Chitre\'s \'Felling of the Banyan Tree\'. A neighbour shrugs: \'It\'s just a poem about chopping a tree — sentimental green stuff.\'',
            decisions: [{ prompt: 'What do you say the poem is actually about?', options: [
                { text: 'Read it as an elegy for a worldview: the banyan is sacred in Indian tradition, a community shelter, an ecological keystone — and its felling, ordered by the father over the grandmother\'s warning, enacts the violence of replacing roots with concrete. The family moves to Bombay where the only tree left \'grows and seethes in one\'s dreams\'; the personal migration mirrors millions. Structure enacts it: seven days of sawing stretch unbearably while two hundred years of rings compress into one phrase.', outcome: 'The poem stops being \'green sentiment\' and becomes what it is — memory, displacement, and a way of life where nature was kin, not resource.' },
                { text: 'Concede it\'s a simple chronological report — father orders, men saw, tree falls, family moves.', outcome: 'That misses the engineered narrative time: the sawing is stretched across enjambed lines to feel interminable while the tree\'s 200-year life is compressed — the pacing is the meaning.', reveals: 'felling-is-chronological-report' },
                { text: 'Offer it as an anti-development poem — the father is the villain who kills a sacred tree.', outcome: 'Blaming one man flattens it: the felling stands for an era\'s migration from green Baroda to concrete Bombay — the tragedy is systemic, not personal villainy.', reveals: 'father-is-the-villain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'The banyan is felled in Baroda and replanted as a nightmare in Bombay — the past tense ends, the present tense seethes.',
            decisions: [{ prompt: 'What comes next? Felling of the Banyan Tree (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Felling of the Banyan Tree (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_001', difficulty: 'standard',
          question: '\'Felling of the Banyan Tree\' (Woven Words, ch. 18) — the context and background.',
          hint: 'If stuck, review Class 9 node c9_engl_ch3_2 (Cultural Heritage: Pankhas as Traditional.',
          misconception: 'Students often think "context and background" means memorizing the poet\'s birth/death dates and the publication year.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Felling of the Banyan Tree\' (Woven Words, ch',
                  options: ['\'Felling of the Banyan Tree\' (Woven Words, ch', 'The plot/narrative arc of \'Felling of the Banyan Tree\'', 'The setting of \'Felling of the Banyan Tree\'', 'Character analysis in \'Felling of the Banyan Tree\''],
                  hint: 'If stuck, review Class 9 node c9_engl_ch3_2 (Cultural Heritage: Pankhas as Traditional Craft Items).',
                  misconception: 'Students often think "context and background" means memorizing the poet\'s birth/death dates and the publication year.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biographical trivia, assign this three-step remediation: (1) Have them read Chitre\'s.', '(2) Ask them to find three words/phrases in the poem that feel "Marathi-inflected" (e.g., "massacred" for a tree.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context and background" means memorizing the poet\'s birth/death dates and the publication year.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the phrase "raw mythology" in capturing the moment the tree\'s rings are revealed.', answer: '"Raw mythology" is highly effective',
                  options: ['"Raw mythology" is highly effective', 'context and background'],
                  hint: 'If stuck, review Class 9 node c9_engl_ch3_2 (Cultural Heritage: Pankhas as Traditional Craft Items).',
                  misconception: 'Students often think "context and background" means memorizing the poet\'s birth/death dates and the publication year.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student reduces context to biographical trivia, assign this three-step remediation: (1) Have them read Chitre\'s.', '(2) Ask them to find three words/phrases in the poem that feel "Marathi-inflected" (e.g., "massacred" for a tree.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Felling of the Banyan Tree\' — what happens, in what.',
          hint: 'Review the "Narrative Poetry and Its Features" node (c6_english_u1_006) and practice.',
          misconception: 'Students often treat the poem as a simple chronological report: "first this happened, then that happened." They miss.',
          parts: [
                { id: 'a', prompt: 'In your own words, summarize the narrative progression of "Felling of the Banyan Tree" from start to finish without quoting the poem.', answer: 'The poem narrates: the father orders tenants out and trees cut',
                  options: ['The poem narrates: the father orders tenants out and trees cut', 'it describes a big tree being cut', 'treats the poem as a static description (e'],
                  hint: 'Review the "Narrative Poetry and Its Features" node (c6_english_u1_006) and practice mapping.',
                  misconception: 'Students often treat the poem as a simple chronological report: "first this happened, then that happened." They miss that the poem\'s.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student cannot identify the plot stages, have them: (1) List every concrete action in the poem on sticky notes.', '(2) Physically arrange the notes on a desk in a mountain shape (Freytag\'s pyramid).', '(3) For each note, ask: "Does this increase tension, peak tension, or release tension?" (4) Then map the poem\'s line.', 'This tactile sorting bridges the gap between abstract structure and textual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_003', difficulty: 'standard',
          question: 'The setting of \'Felling of the Banyan Tree\' — the place, time and atmosphere.',
          hint: 'If stuck, review c7_engl_ch04_005 (Atmosphere in "The Tunnel") to practice identifying.',
          misconception: 'Students often think "setting" only means the physical location (Baroda, Bombay) and "atmosphere" only means the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Felling of the Banyan Tree\'',
                  options: ['The setting of \'Felling of the Banyan Tree\'', '\'Felling of the Banyan Tree\' (Woven Words, ch', 'The plot/narrative arc of \'Felling of the Banyan Tree\'', 'Character analysis in \'Felling of the Banyan Tree\''],
                  hint: 'If stuck, review c7_engl_ch04_005 (Atmosphere in "The Tunnel") to practice identifying mood through.',
                  misconception: 'Students often think "setting" only means the physical location (Baroda, Bombay) and "atmosphere" only means the general mood (sad.' }
          ],
            remediations: { 'setting-only-means-the-physical': { steps: ['If a student cannot distinguish setting from atmosphere, have them draw a two-column chart: Column.', 'Then ask: "Which column explains *why* the tree matters?', 'Which explains *how the poet feels* about its loss?" Guide them to see that setting provides the facts; atmosphere.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_004', difficulty: 'standard',
          question: 'Character analysis in \'Felling of the Banyan Tree\' — the central figure(s).',
          hint: 'Review the distinction between "narrator" and "protagonist" using the Class 10 example.',
          misconception: 'Students often assume the poet (the "I") is the protagonist because the poem is written in first person.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist of "Felling of the Banyan Tree," and what is the single most important action they take in the poem?', answer: 'The protagonist is the poet\'s father',
                  options: ['The protagonist is the poet\'s father', 'the poet or the tree', 'the poet (the "I") is the protagonist'],
                  hint: 'Review the distinction between "narrator" and "protagonist" using the Class 10 example of Lencho.',
                  misconception: 'Students often assume the poet (the "I") is the protagonist because the poem is written in first person.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a short paragraph showing how the father\'s treatment of the tenants ("My father told the tenants to leave") foreshadows his.', answer: 'Point: The father displaces both people and nature with equal ruthlessness',
                  options: ['Point: The father displaces both people and nature with equal ruthlessness', 'the poet (the "I") is the protagonist'],
                  hint: 'Review the distinction between "narrator" and "protagonist" using the Class 10 example of Lencho.',
                  misconception: 'Students often assume the poet (the "I") is the protagonist because the poem is written in first person.' },
                { id: 'c', prompt: 'Compare the father\'s attitude toward the banyan tree with the grandmother\'s belief ("Trees are sacred... Felling them is a crime").', answer: 'The grandmother represents reverence, tradition, and ecological spirituality',
                  options: ['The grandmother represents reverence, tradition, and ecological spirituality', 'the poet (the "I") is the protagonist'],
                  hint: 'Review the distinction between "narrator" and "protagonist" using the Class 10 example of Lencho.',
                  misconception: 'Students often assume the poet (the "I") is the protagonist because the poem is written in first person.' }
          ],
            remediations: { 'the-poet-the-i-is': { steps: ['Ask the student to list every verb attached to "my father" (told, ordered, massacred).', 'Ask them to list every verb attached to "I/we" (watched, left).', 'Have them compare: which character *causes* events?', 'Guide them to re-read the textbook question 2 ("Identify the words that help you understand the nature of the poet\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_005', difficulty: 'standard',
          question: 'Supporting characters in \'Felling of the Banyan Tree\' — the secondary figures.',
          hint: 'If stuck, review the protagonist analysis steps in c11_eng_w_cbse_18_004 and the plot.',
          misconception: 'Students often believe that because the poem is short and centred on the father, the other figures are decorative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Felling of the Banyan Tree\'',
                  options: ['Supporting characters in \'Felling of the Banyan Tree\'', '\'Felling of the Banyan Tree\' (Woven Words, ch', 'The plot/narrative arc of \'Felling of the Banyan Tree\'', 'The setting of \'Felling of the Banyan Tree\''],
                  hint: 'If stuck, review the protagonist analysis steps in c11_eng_w_cbse_18_004 and the plot summary.',
                  misconception: 'Students often believe that because the poem is short and centred on the father, the other figures are decorative extras.' }
          ],
            remediations: { 'because-the-poem-is-short': { steps: ['Ask the student to reread the poem and highlight every noun that refers to a living being or group.', 'For each highlighted noun, write one sentence answering: "What does this figure do or say?" and "What idea does.', 'Have the student place these notes in a two‑column table: Figure | Function/Idea.', 'Discuss how the table reveals a chorus of perspectives that the father\'s action silences.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_006', difficulty: 'standard',
          question: 'The primary theme of \'Felling of the Banyan Tree\' — the central idea the whole.',
          hint: 'If stuck, review the distinction between subject and theme using the "King Bruce and the.',
          misconception: 'Students often think the primary theme is simply "deforestation is bad" or "we should save trees." This is a moralistic.',
          parts: [
                { id: 'a', prompt: 'Analyze how the poem\'s structural progression — from the demolition of houses, to the cutting of smaller trees, to the seven-day branch removal, to the fifty.', answer: 'The structure enacts the theme: it begins with displacing human tenants (social',
                  options: ['The structure enacts the theme: it begins with displacing human tenants (social', 'deforestation is bad', 'we should save trees', 'the primary theme is simply "deforestation is bad" or "we should save trees'],
                  hint: 'If stuck, review the distinction between subject and theme using the "King Bruce and the Spider".',
                  misconception: 'Students often think the primary theme is simply "deforestation is bad" or "we should save trees." This is a moralistic summary, not.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student reduces the theme to a slogan, guide them through this sequence: (1) Re-read the grandmother\'s line and.', '(3) Examine the 200-year rings — what does "raw mythology" mean?', '(4) Contrast the physical absence of trees in Bombay with the tree\'s presence in dreams — what does "seethes" and.', '(5) Have them write one sentence starting with "The poem suggests that when we destroy what we revere..." to force.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
