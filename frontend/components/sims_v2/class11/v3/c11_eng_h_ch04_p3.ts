import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch04_p3: SimDef = {
    id: 'v3_c11_eng_h_ch04_p3',
    title: 'Landscape of the Soul · Part 3/3',
    subtitle: 'See why Chinese painters walked away from the single fixed viewpoint on purpose.',
    classLevel: 11, subject: 'eng_h', topic: 'Landscape of the Soul · Part 3/3',
    chapters: ['c11_eng_h_ch04'],
    nodeIds: ['c11_eng_h_cbse_04_013', 'c11_eng_h_cbse_04_014', 'c11_eng_h_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a curator comparing two wings of an art museum', intro: 'Misty mountains with tiny humans on one side, pin-sharp portraits on the other — decide what each culture was really painting.', goal: 'Contrast the Chinese and European landscape traditions and interpret \'landscape of the soul.\'' },
    discovery: {
        question: 'A common verdict: Chinese landscape painting looks \'less realistic\' because its painters never mastered perspective. What\'s wrong with that?',
        options: ['They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion', 'Nothing — they genuinely lacked the technique until Europe arrived', 'They avoided perspective only because paper scrolls were too small', 'Realism was banned under imperial decree'],
        answer: 'They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion',
        hook: 'Judging Shanshui by European realism is a rigged test — the European painter lends you his eyes; the Chinese painter invites you into his mind.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Landscape of the Soul\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_04_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast single-viewpoint perspective with a scroll\'s travelling viewpoints, then test whether \'landscape of the soul\' implies a greener relationship to nature.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Landscape of the Soul\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central thesis of Nani Palkhivala\'s "The Ailing Planet" and where is it explicitly stated in the text?', options: [
                { text: 'The central thesis is that humanity has undergone a revolutionary shift from a', outcome: 'The central thesis is that humanity has undergone a revolutionary shift from a mechanistic to.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe "critical thinking" means *criticizing* or *finding faults* with the text.', reveals: 'critical-thinking-means-criticizing-or' },
                { text: 'critical thinking', outcome: 'Not quite — Students believe "critical thinking" means *criticizing* or *finding faults* with the text.', reveals: 'critical-thinking-means-criticizing-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Landscape of the Soul\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills" means reproducing chapter summary points in paragraph form.', reveals: 'writing-skills-means-reproducing-chapter' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means reproducing chapter summary points in paragraph form.', reveals: 'writing-skills-means-reproducing-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Landscape of the Soul\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of "Talking about the text" discussion points in the NCERT textbook for Class 11?', options: [
                { text: 'The primary purpose is to develop oral communication skills by encouraging students to', outcome: 'The primary purpose is to develop oral communication skills by encouraging students to explore.' },
                { text: 'to memorize answers for exams', outcome: 'Not quite — Students treat discussion as a turn-taking exercise where each person gives a pre-prepared answer.', reveals: 'students-treat-discussion-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating the school art show, you hang a Song-dynasty style scroll beside a Renaissance-style portrait. A visitor remarks: \'The Chinese painting is charming but primitive — those artists hadn\'t discovered perspective yet. European art was simply more advanced.\'',
            decisions: [{ prompt: 'Is \'hadn\'t discovered perspective\' a fair reading?', options: [
                { text: 'No — Chinese artists knew perspective (their architecture proves it) but deliberately used multiple viewpoints: the goal of Shanshui was conceptual completeness — letting the viewer spiritually enter the landscape and wander it — not an optical illusion for a single eye at a single moment. It\'s a choice of aim, not a lack of skill.', outcome: 'Judging one tradition by another\'s goal posts is the error: Wu Daozi\'s painting-as-doorway versus Metsys\'s fly-real-enough-to-swat are different ideas of what art is for.' },
                { text: 'Fair — realism measures progress; perspective is the technical peak of painting.', outcome: 'That\'s the Eurocentric assumption the chapter dismantles: \'one eye, one moment, one truth\' is the European aim; the Chinese aim was the Dao — a mountain has no single correct view.', reveals: 'perspective-equals-progress' },
                { text: 'The scroll is just decorative — landscapes can\'t carry philosophy.', outcome: 'Shanshui literally means mountain-water as a vision of complementary forces; the misty gaps are the Daoist void the viewer\'s imagination is meant to fill.', reveals: 'landscape-is-decoration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'A European landscape is a window you look through; a Chinese one is a country you wander — the difference is a philosophy, not a skill gap.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_013', difficulty: 'standard',
          question: 'Critical thinking on \'Landscape of the Soul\' — analysing the text to reach.',
          hint: 'If stuck, review the "argument mapping" technique from Class 10 (c10_engl_cbse_02_008.',
          misconception: 'Students believe "critical thinking" means *criticizing* or *finding faults* with the text.',
          parts: [
                { id: 'a', prompt: 'What is the central thesis of Nani Palkhivala\'s "The Ailing Planet" and where is it explicitly stated in the text?', answer: 'The central thesis is that humanity has undergone a revolutionary shift from a',
                  options: ['The central thesis is that humanity has undergone a revolutionary shift from a', 'A wrong answer (e.g', 'critical thinking', '"critical thinking" means *criticizing* or *finding faults* with the text'],
                  hint: 'If stuck, review the "argument mapping" technique from Class 10 (c10_engl_cbse_02_008 - Mandela\'s.',
                  misconception: 'Students believe "critical thinking" means *criticizing* or *finding faults* with the text.' },
                { id: 'b', prompt: 'Explain in your own words what the author means by "sustainable development" and why he cites the 1987 World Commission definition.', answer: 'Sustainable development means meeting present needs without compromising future',
                  options: ['Sustainable development means meeting present needs without compromising future', 'critical thinking', '"critical thinking" means *criticizing* or *finding faults* with the text'],
                  hint: 'If stuck, review the "argument mapping" technique from Class 10 (c10_engl_cbse_02_008 - Mandela\'s.',
                  misconception: 'Students believe "critical thinking" means *criticizing* or *finding faults* with the text.' },
                { id: 'c', prompt: 'The author uses the metaphor of a mirror in a zoo cage labeled "The world\'s most dangerous animal." Identify the target of this metaphor and explain how.', answer: 'The target is humanity itself',
                  options: ['The target is humanity itself', 'pollution', 'industrialists', 'critical thinking'],
                  hint: 'If stuck, review the "argument mapping" technique from Class 10 (c10_engl_cbse_02_008 - Mandela\'s.',
                  misconception: 'Students believe "critical thinking" means *criticizing* or *finding faults* with the text.' }
          ],
            remediations: { 'critical-thinking-means-criticizing-or': { steps: ['If a student produces a fault-finding response: (1) Ask: "What is the author *trying to achieve* in this paragraph?".', '(2) Have them label each paragraph: "Claim," "Evidence," "Analogy," "Counter-argument addressed," "Call to action." (3).', 'This builds the habit of *structural seeing* before *evaluative judging*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills from \'Landscape of the Soul\' — using the text as a model.',
          hint: 'Review c11_eng_h_cbse_04_012 (Comprehension) for evidence-location practice and.',
          misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'writing skills', '"writing skills" means reproducing chapter summary points in paragraph form'],
                  hint: 'Review c11_eng_h_cbse_04_012 (Comprehension) for evidence-location practice and.',
                  misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.' },
                { id: 'b', prompt: 'A student writes: "The author says forests are disappearing. He gives data about 3.7 million acres.', answer: 'The Explanation component is missing',
                  options: ['The Explanation component is missing', 'writing skills', '"writing skills" means reproducing chapter summary points in paragraph form'],
                  hint: 'Review c11_eng_h_cbse_04_012 (Comprehension) for evidence-location practice and.',
                  misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.' },
                { id: 'c', prompt: 'Rewrite the following weak answer into a strong PEEL paragraph: "Population is a big problem. The chapter says world population is 5.7 billion.', answer: 'Strong version: "Unchecked population growth distorts humanity\'s future (Point)',
                  options: ['Strong version: "Unchecked population growth distorts humanity\'s future (Point)', 'writing skills', '"writing skills" means reproducing chapter summary points in paragraph form'],
                  hint: 'Review c11_eng_h_cbse_04_012 (Comprehension) for evidence-location practice and.',
                  misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.' }
          ],
            remediations: { 'writing-skills-means-reproducing-chapter': { steps: ['Give the student a 6-mark question and a sample answer with PEEL components colour-coded (Point=blue, Evidence=green.', 'Ask them to label each sentence in their own answer with P/E/E/L.', 'Have them rewrite one paragraph adding the missing colour.', 'Practice with a new question, insisting on colour-coding before submission.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line poem stanza that captures the theme of "Childhood" by Markus Natten, using at least two poetic devices (e.g., metaphor, refrain, rhetorical.', answer: 'Example: "When did my wonder turn to knowing?',
                  options: ['Example: "When did my wonder turn to knowing?', 'writing skills', '"writing skills" means reproducing chapter summary points in paragraph form'],
                  hint: 'Review c11_eng_h_cbse_04_012 (Comprehension) for evidence-location practice and.',
                  misconception: 'Students believe "writing skills" means reproducing chapter summary points in paragraph form.' }
          ],
            remediations: { 'writing-skills-means-reproducing-chapter': { steps: ['Give the student a 6-mark question and a sample answer with PEEL components colour-coded (Point=blue, Evidence=green.', 'Ask them to label each sentence in their own answer with P/E/E/L.', 'Have them rewrite one paragraph adding the missing colour.', 'Practice with a new question, insisting on colour-coding before submission.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_015', difficulty: 'standard',
          question: 'Discussion points on \'Landscape of the Soul\' — speaking and listening around.',
          hint: 'Review the "eye of the painter vs eye of the viewer" distinction in the prose and the.',
          misconception: 'Students treat discussion as a turn-taking exercise where each person gives a pre-prepared answer unrelated to what.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Landscape of the Soul\'',
                  options: ['Discussion points on \'Landscape of the Soul\'', '\'Landscape of the Soul\' (Hornbill, ch', 'The plot/narrative arc of \'Landscape of the Soul\'', 'The setting of \'Landscape of the Soul\''],
                  hint: 'Review the "eye of the painter vs eye of the viewer" distinction in the prose and the three stanzas.',
                  misconception: 'Students treat discussion as a turn-taking exercise where each person gives a pre-prepared answer unrelated to what others said.' }
          ],
            remediations: { 'students-treat-discussion-as-a': { steps: ['If a student cannot connect their contribution to the previous speaker, pause the group.', 'Model a "bridge statement": "What [Peer] said about the \'void\' in Shanshui connects to my point about the poem\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
