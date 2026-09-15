import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch18_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch18_p3: SimDef = {
    id: 'v3_c12_eng_k_ch18_p3',
    title: 'The Argumentative Indian (Non-fiction) · Part 3/3',
    subtitle: 'A Nobel economist reads the Gita as a debate India never finished',
    classLevel: 12, subject: 'eng_k', topic: 'The Argumentative Indian (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch18'],
    nodeIds: ['c12_eng_k_cbse_18_013', 'c12_eng_k_cbse_18_014', 'c12_eng_k_cbse_18_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Public reasoning analyst', intro: 'Three thousand years of argument — epics, Upanishads, women questioners, dissident movements — and Sen asks if that\'s why democracy survived here.', goal: 'Evaluate Sen\'s evidence for India\'s argumentative tradition and its qualified link to democracy.' },
    discovery: {
        question: 'On the battlefield, Krishna orders Arjuna to fight as duty; Arjuna counts the corpses the war will make. Sen refuses to call either wrong — why preserve both voices?',
        options: ['Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts', 'Because Krishna is always right', 'Because Arjuna won the argument', 'Because epics need conflict'],
        answer: 'Because the Gita stages two live moral frameworks — duty-based \'faring forward\' vs consequence-based \'faring well\' — and the epic\'s tragic end quietly vindicates Arjuna\'s doubts',
        hook: 'This isn\'t a pride parade of \'Indians love to argue\' — Sen is an economist building evidence: a nine-hour UN speech, an epic seven times the Iliad and Odyssey combined, Gargi\'s interrogations. He critiques exclusions too — who was allowed to argue matters as much as that they argued.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to deconstruct an argumentative essay\'s structure, evaluate the validity of its claims and evidence, interpret the author\'s underlying.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_18_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prosecute the thesis like Sen: weigh prolixity\'s evidence, test whether the argumentative tradition was truly inclusive of women and the marginalised, and judge if it really undergirds Indian democracy.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re in a debate competition and the topic is "India\'s democracy is a Western import." You remember Sen\'s essay argues the opposite — that India\'s.',
            decisions: [{ prompt: 'What is the central distinction Sen draws between Krishna\'s position (\'faring forward\') and Arjuna\'s position (\'faring well\') in the.', options: [
                { text: 'Sen distinguishes Krishna\'s deontological emphasis on duty regardless of consequences', outcome: 'Sen distinguishes Krishna\'s deontological emphasis on duty regardless of consequences (\'fare.' },
                { text: 'Krishna wins so Arjuna is wrong', outcome: 'Not quite — Students often treat Sen\'s essay as a *celebration* of India\'s argumentative past, missing his.', reveals: 'students-often-treat-sen-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "Sen says \'Arjuna\'s contrary arguments are not really vanquished.\' Do you agree?',
            decisions: [{ prompt: 'What is the PEEL structure, and what does each letter stand for in the context of writing a textual answer?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (direct quote or', outcome: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (direct quote or close.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the chapter\'s content.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the chapter\'s content.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a CUET group discussion round where the prompt is: "Does India\'s ancient argumentative tradition strengthen or weaken modern democracy?" You.',
            decisions: [{ prompt: 'List two specific discussion points from the chapter that could anchor a conversation on "Argumentative Tradition and Social Justice."', options: [
                { text: 'Correct answer: (1) The Gargi-Yajnavalkya and Maitreyi-Yajnavalkya dialogues in the', outcome: 'Correct answer: (1) The Gargi-Yajnavalkya and Maitreyi-Yajnavalkya dialogues in the Upanishads show.' },
                { text: 'women spoke', outcome: 'Not quite — Students treat "discussion points" as a list of opinions to memorize ("Sen says democracy is good,".', reveals: 'students-treat-discussion-points-as' },
                { text: 'caste was challenged', outcome: 'Not quite — Students treat "discussion points" as a list of opinions to memorize ("Sen says democracy is good,".', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Drafting a club speech, a student writes: \'Indians have always argued, so democracy here is automatic and always included everyone.\'',
            decisions: [{ prompt: 'Would Sen endorse that line?', options: [
                { text: 'No — Sen qualifies everything: the argumentative tradition is real but historically excluded women, lower castes and classes; public reasoning strengthens democracy only when it\'s deliberately inclusive, not \'natural\'.', outcome: 'The essay\'s power is in its qualifications — pride-affirming soundbites are precisely what it refuses to offer.' },
                { text: 'Yes — a talkative culture makes democracy inevitable.', outcome: 'Sen rejects cultural determinism; argument is a resource that must be used, not a guarantee.', reveals: 'culture-causes-democracy' },
                { text: 'Yes — and the tradition was open to everyone from the start.', outcome: 'Sen documents exactly who was shut out; romanticising the past as universal is the selectivity he warns against.', reveals: 'tradition-was-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_18_015', title: 'You made it',
          caseStudy: { intro: 'You can now handle a big cultural claim with a scholar\'s restraint — celebrating the tradition while auditing its exclusions. That\'s the essay\'s true discipline.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to deconstruct.',
          hint: 'If stuck, re-read the \'Stop and Think\' boxes in the NCERT text — they are the author\'s.',
          misconception: 'Students often treat Sen\'s essay as a *celebration* of India\'s argumentative past, missing his critical qualifications.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the ability to deconstruct an',
                  options: ['Critical Thinking: Analysis and Interpretation is the ability to deconstruct an', '"Before You Read: Context and Background" for Amartya Sen\'s "The Argumentative Indian" is', 'In a non-fiction argumentative essay like "The Argumentative Indian," **plot and', 'In non-fiction argumentative prose, **setting** refers to the historical, cultural,'],
                  hint: 'If stuck, re-read the \'Stop and Think\' boxes in the NCERT text — they are the author\'s own.',
                  misconception: 'Students often treat Sen\'s essay as a *celebration* of India\'s argumentative past, missing his critical qualifications: he repeatedly says.' }
          ],
            remediations: { 'students-often-treat-sen-s': { steps: ['If the student conflates \'tradition exists\' with \'tradition was inclusive/effective\', do this 3-step remediation: (1).', '180-185) and highlight every qualifying phrase: \'by and large\', \'much less pronounced\', \'not negligible\', \'did not win.', '(2) Create a two-column table: Column A = Sen\'s positive claims (e.g., \'Gargi questioned Yajnavalkya\'); Column.', '(3) Practice answering: "Sen dispels the misconception that the argumentative tradition was uniformly democratic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_014', difficulty: 'standard',
          question: 'Writing Skills based on "The Argumentative Indian" involve crafting structured.',
          hint: 'If stuck on evidence selection, revisit c12_eng_k_cbse_18_012 (Comprehension) and.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the chapter\'s content in their own words.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Sen uses qualifying phrases like "often enough," "by and large," and "particularly" in his essay, and how a student should mirror.', answer: 'Sen uses qualifications to show intellectual honesty',
                  options: ['Sen uses qualifications to show intellectual honesty', 'qualifications make writing weak', 'The text implies', 'writing skills based on the chapter'],
                  hint: 'If stuck on evidence selection, revisit c12_eng_k_cbse_18_012 (Comprehension) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the chapter\'s content in their own words.' },
                { id: 'b', prompt: 'Given the question "How does Sen connect Maitreyi\'s question to economic development?", write a PEEL paragraph using two pieces of evidence from the text.', answer: '**Point:** Sen uses Maitreyi\'s rhetorical question',
                  options: ['**Point:** Sen uses Maitreyi\'s rhetorical question', 'writing skills based on the chapter'],
                  hint: 'If stuck on evidence selection, revisit c12_eng_k_cbse_18_012 (Comprehension) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the chapter\'s content in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a descriptive summary, do NOT say "write analytically." Instead: (1) Give them a sample question.', '(2) Have them highlight *only* the sentences in their answer that directly answer "how" — they\'ll find few.', '(3) Provide a two-column template: left column = "Sen\'s claim," right column = "My explanation of how it answers the.', '(5) Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the chapter\'s content in their own words.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student answer to "Talking about the Text Q1: Does Amartya Sen see argumentation as a positive or a negative value?" *Student answer:* "Sen sees.', answer: '**Weakness 1:** No textual evidence',
                  options: ['**Weakness 1:** No textual evidence', 'writing skills based on the chapter'],
                  hint: 'If stuck on evidence selection, revisit c12_eng_k_cbse_18_012 (Comprehension) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the chapter\'s content in their own words.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a descriptive summary, do NOT say "write analytically." Instead: (1) Give them a sample question.', '(2) Have them highlight *only* the sentences in their answer that directly answer "how" — they\'ll find few.', '(3) Provide a two-column template: left column = "Sen\'s claim," right column = "My explanation of how it answers the.', '(5) Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_18_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit the "Stop and Think" boxes in the chapter — they are ready-made.',
          misconception: 'Students treat "discussion points" as a list of opinions to memorize ("Sen says democracy is good," "Women argued.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Sen argues that democracy in India is not merely a "gift of the Western world" but draws on indigenous traditions of public.', answer: 'Correct answer: Sen contends that India\'s long history of heterodox debates',
                  options: ['Correct answer: Sen contends that India\'s long history of heterodox debates', 'India had democracy before the British', 'Sen likes Indian culture', 'Sen talks about Gargi'],
                  hint: 'If stuck, revisit the "Stop and Think" boxes in the chapter — they are ready-made discussion.',
                  misconception: 'Students treat "discussion points" as a list of opinions to memorize ("Sen says democracy is good," "Women argued in ancient India").' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student cannot generate evidence-based discussion points: (1) Return to c12_eng_k_cbse_18_012 (Comprehension) and.', '(2) Go to c12_eng_k_cbse_18_013 (Critical Thinking) and practice the "Talking about the Text" prompts orally with.', '(3) Watch a 5-minute clip of a model literary discussion (e.g., NCERT\'s "Samvad" series) and annotate how speakers use.', '(4) Re-attempt Diagnostic Question 3 with a new quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
