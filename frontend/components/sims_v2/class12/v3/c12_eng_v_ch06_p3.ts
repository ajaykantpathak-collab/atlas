import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch06_p3: SimDef = {
    id: 'v3_c12_eng_v_ch06_p3',
    title: 'Memories of Childhood · Part 3/3',
    subtitle: 'A pair of scissors and a string-held packet — oppression\'s small tools',
    classLevel: 12, subject: 'eng_v', topic: 'Memories of Childhood · Part 3/3',
    chapters: ['c12_eng_v_ch06'],
    nodeIds: ['c12_eng_v_cbse_06_013', 'c12_eng_v_cbse_06_014', 'c12_eng_v_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir analyst', intro: 'A Dakota girl hides under a bed to save her hair; a Tamil girl watches an elder carry food like it\'s radioactive. Two systems, one chapter.', goal: 'Read both childhood narratives as systemic oppression — forced assimilation and caste — working through children.' },
    discovery: {
        question: 'Two childhoods, two systems: Zitkala-Sa\'s braids cut off at a boarding school; a Dalit elder carrying a vadai packet by its string so no one is \'polluted.\' What links these memories?',
        options: ['Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines', 'Nothing — different countries', 'Both are just sad anecdotes', 'Only racism links them'],
        answer: 'Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines',
        hook: 'The haircut was cultural annihilation, not hygiene — among her people only mourners and captured cowards were shingled. And the packet carried by its string was pollution theory performed in public. Each scene is evidence, not anecdote; read the system inside the memory.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to evaluate the author\'s purpose, perspective, and techniques, and to interpret underlying themes, biases.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Cross two worlds of enforced shame: decode the Carlisle school\'s bells and scissors beside a Tamil village\'s rules of touch — and weigh Judewin\'s submission against Annan\'s counsel to study and fight.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist interviewing both Zitkala-Sa and Bama as adults looking back at their childhood selves.',
            decisions: [{ prompt: 'What is the cultural significance of long hair for Zitkala-Sa\'s people, and what does its cutting symbolize in the context of the boarding.', options: [
                { text: 'For Zitkala-Sa\'s people, long hair is a sign of bravery and skill', outcome: 'For Zitkala-Sa\'s people, long hair is a sign of bravery and skill; only captured unskilled.' },
                { text: 'it was just a haircut', outcome: 'Not quite — Students often treat the two accounts as "the same thing: discrimination" and write generic answers.', reveals: 'students-often-treat-the-two' },
                { text: 'it was for hygiene', outcome: 'Not quite — Students often treat the two accounts as "the same thing: discrimination" and write generic answers.', reveals: 'students-often-treat-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "Write an article on \'Education as a Tool for Breaking Social Barriers\' based on your reading of \'Memories.',
            decisions: [{ prompt: 'What is the PEEL structure for writing analytical paragraphs, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (specific textual', outcome: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (specific textual reference.' },
                { text: 'Point, Example, Explain, Leave', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the story* in a different.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *retelling the story* in a different.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a university admission group discussion on "Childhood and Social Injustice" — the moderator asks: "What do a Native American girl in 1880s.',
            decisions: [{ prompt: 'What are the two essential protocols for a productive literary discussion in a CBSE Class 12 speaking assessment?', options: [
                { text: 'The two essential protocols are: (1) Turn-taking with time awareness', outcome: 'The two essential protocols are: (1) Turn-taking with time awareness — each speaker gets 45-60.' },
                { text: 'speak loudly and share your opinion', outcome: 'Not quite — Students believe "discussion points" means preparing a monologue summarizing each story separately.', reveals: 'discussion-points-means-preparing-a' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" means preparing a monologue summarizing each story separately.', reveals: 'discussion-points-means-preparing-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At your coaching institute, a girl from a marginalised community is quietly served tea last and made to sit apart \'as per tradition.\' She\'s furious and ready to drop out; others say either fight publicly or swallow it.',
            decisions: [{ prompt: 'Which path does \'Memories of Childhood\' validate?', options: [
                { text: 'Annan\'s answer to Bama: the humiliation is real and rage is justified, but the durable reply is to study, excel, and make yourself impossible to keep out — Bama tops her class and the same village comes to her.', outcome: 'Both episodes pair violation with response: Zitkala-Sa loses her hair to forced assimilation; Bama converts the vadai-packet humiliation into academic climb, because education is the one door the hierarchy can\'t hold shut.' },
                { text: 'Make a scene right there — public protest is the only language such insults understand.', outcome: 'The chapter distinguishes anger from strategy: Bama\'s fury is validated but channelled; Annan explicitly warns that indignation without education changes nothing about who gets served last.', reveals: 'outrage-equals-resistance' },
                { text: 'Advise her to endure quietly — making waves will only make the exclusion worse.', outcome: 'That\'s the reading the paired structure refutes: neither woman resigns — one resists bodily and is overpowered, the other resists through achievement; the chapter never treats silent endurance as dignity.', reveals: 'endurance-equals-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a childhood memory as forensic evidence of oppression — and tell the difference between resistance that submits and resistance that studies.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, re-read the "Reading with Insight" questions at the end of the chapter — they.',
          misconception: 'Students often treat the two accounts as "the same thing: discrimination" and write generic answers about "fighting.',
          parts: [
                { id: 'a', prompt: 'What is the cultural significance of long hair for Zitkala-Sa\'s people, and what does its cutting symbolize in the context of the boarding school?', answer: 'For Zitkala-Sa\'s people, long hair is a sign of bravery and skill',
                  options: ['For Zitkala-Sa\'s people, long hair is a sign of bravery and skill', 'it was just a haircut', 'it was for hygiene'],
                  hint: 'If stuck, re-read the "Reading with Insight" questions at the end of the chapter — they are the.',
                  misconception: 'Students often treat the two accounts as "the same thing: discrimination" and write generic answers about "fighting injustice." The.' },
                { id: 'b', prompt: 'Both Zitkala-Sa and Bama describe a specific sensory detail that makes the injustice physical.', answer: 'Zitkala-Sa: "the cold blades of the scissors against my neck"',
                  options: ['Zitkala-Sa: "the cold blades of the scissors against my neck"', 'it shows it was cold', 'lists details without explaining their analytical function (e'],
                  hint: 'If stuck, re-read the "Reading with Insight" questions at the end of the chapter — they are the.',
                  misconception: 'Students often treat the two accounts as "the same thing: discrimination" and write generic answers about "fighting injustice." The.' }
          ],
            remediations: { 'students-often-treat-the-two': { steps: ['If a student conflates the two systems, have them create a two-column table: Column A for Zitkala-Sa (oppressor.', 'Column B for Bama (oppressor: caste Hindus/landlord; mechanism: purity/pollution rules, economic exploitation.', 'Then ask: "Which column shows a child fighting with her body?', 'Which shows a child fighting with her mind?" This forces the distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_014', difficulty: 'standard',
          question: 'Writing Skills based on "Memories of Childhood" refers to the ability.',
          hint: 'If stuck on evidence selection: Revisit c12_eng_v_cbse_06_008 (Imagery/Metaphor) and.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in a different format (e.g., "write.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Both Zitkala-Sa and Bama faced discrimination. Zitkala-Sa\'s hair was cut. Bama saw an elder carry a packet by a string.', answer: 'Weakness 1: No PEEL structure',
                  options: ['Weakness 1: No PEEL structure', 'interpretation', 'critical appreciation', 'it\'s too short'],
                  hint: 'If stuck on evidence selection: Revisit c12_eng_v_cbse_06_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in a different format (e.g., "write a letter.' },
                { id: 'b', prompt: 'Given the prompt: "Write a speech on \'Resisting Injustice Begins in Childhood\' based on the chapter," draft the opening paragraph (50-60 words) using a hook.', answer: '"Respected Principal, teachers, and friends',
                  options: ['"Respected Principal, teachers, and friends', 'Childhood is important', 'engagement', 'writing skills based on the chapter'],
                  hint: 'If stuck on evidence selection: Revisit c12_eng_v_cbse_06_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in a different format (e.g., "write a letter.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student writes a story-retelling instead of an analytical piece: (1) Show them a side-by-side comparison: a 3-mark.', 'a 6-mark PEEL paragraph on the same incident.', '(2) Have them highlight every sentence in their draft that is *plot summary* (yellow) vs.', '*analysis/argument* (green).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in a different format (e.g., "write.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s diary entry (written as Bama): "Today I saw an elder carry vadais by a string. Annan explained it\'s because of caste. I felt angry.', answer: 'Rating: 2/5',
                  options: ['Rating: 2/5', 'it covers the plot', 'writing skills based on the chapter', 'write a letter as Zitkala-Sa to her mother describing the hair-cutting'],
                  hint: 'If stuck on evidence selection: Revisit c12_eng_v_cbse_06_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means *retelling the story* in a different format (e.g., "write a letter.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student writes a story-retelling instead of an analytical piece: (1) Show them a side-by-side comparison: a 3-mark.', 'a 6-mark PEEL paragraph on the same incident.', '(2) Have them highlight every sentence in their draft that is *plot summary* (yellow) vs.', '*analysis/argument* (green).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, return to node 013 (Critical Thinking) and re-do the "Reading with Insight" Q3.',
          misconception: 'Students believe "discussion points" means preparing a monologue summarizing each story separately, then stating "both.',
          parts: [
                { id: 'a', prompt: 'What are the two essential protocols for a productive literary discussion in a CBSE Class 12 speaking assessment?', answer: 'The two essential protocols are: (1) Turn-taking with time awareness',
                  options: ['The two essential protocols are: (1) Turn-taking with time awareness', 'speak loudly and share your opinion', 'discussion points', 'both show discrimination'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and re-do the "Reading with Insight" Q3 comparison.',
                  misconception: 'Students believe "discussion points" means preparing a monologue summarizing each story separately, then stating "both show.' },
                { id: 'b', prompt: 'During a discussion, a peer claims: "Bama\'s story is more hopeful because Annan gives her a solution — education — while Zitkala-Sa only suffers." Using.', answer: '"I hear you — Annan\'s advice \'study hard',
                  options: ['"I hear you — Annan\'s advice \'study hard', 'respond and extend', 'discussion points', 'both show discrimination'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and re-do the "Reading with Insight" Q3 comparison.',
                  misconception: 'Students believe "discussion points" means preparing a monologue summarizing each story separately, then stating "both show.' },
                { id: 'c', prompt: 'Compare how the two authors use sensory imagery to convey the moment of humiliation.', answer: 'Zitkala-Sa: "cold blades of the scissors against my neck" (tactile/thermal)',
                  options: ['Zitkala-Sa: "cold blades of the scissors against my neck" (tactile/thermal)', 'discussion points', 'both show discrimination'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and re-do the "Reading with Insight" Q3 comparison.',
                  misconception: 'Students believe "discussion points" means preparing a monologue summarizing each story separately, then stating "both show.' }
          ],
            remediations: { 'discussion-points-means-preparing-a': { steps: ['If a student cannot move beyond summary: (1) Give them a "Discussion Template" card with sentence stems: "Building.', '(3) Record and replay; student self-scores using CBSE rubric: Evidence (0-2), Interaction (0-2), Synthesis (0-1).', 'Repeat until they score 4/5 consistently.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
