import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p3',
    title: 'd¡qoj ukjk;.k · Part 3/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'd¡qoj ukjk;.k · Part 3/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_013', 'c12_hin_ar_cbse_02_014', 'c12_hin_ar_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to examine a literary text beyond its literal meaning by breaking down its components (imagery, structure, tone, symbolism), evaluating.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you see a group of children playing barefoot on a hot Delhi street at sunset — they are laughing, but their clothes are torn and they should be.',
            decisions: [{ prompt: 'What is the primary difference between *literal comprehension* (understanding what the text says) and *critical interpretation* (analyzing.', options: [
                { text: 'Literal comprehension identifies explicit details: "The poem describes children playing', outcome: 'Literal comprehension identifies explicit details: "The poem describes children playing in the.' },
                { text: 'The poem describes children playing in the street at sunset', outcome: 'Not quite — Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing*.', reveals: 'critical-analysis-means-criticizing-the' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing*.', reveals: 'critical-analysis-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall facing a 5-mark question: "How does the poet depict the joy of children playing in the rain?" Many students freeze and.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a paragraph summarizing the poem stanza-by-stanza constitutes.', reveals: 'writing-a-paragraph-summarizing-the' },
                { text: 'critical appreciation', outcome: 'Not quite — Students believe that writing a paragraph summarizing the poem stanza-by-stanza constitutes.', reveals: 'writing-a-paragraph-summarizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a Class 12 literature circle and the teacher says, "Discuss why the poet calls childhood \'the most beautiful fragrance\' — you have 10.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a literature classroom, as distinct from a comprehension question?', options: [
                { text: 'A discussion point invites multiple valid interpretations supported by textual evidence', outcome: 'A discussion point invites multiple valid interpretations supported by textual evidence and.' },
                { text: 'to test if we read the poem', outcome: 'Not quite — Students believe a literary discussion is a \'share your feelings\' circle where any personal.', reveals: 'a-literary-discussion-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to examine.',
          hint: 'If stuck, return to node c12_hin_ar_cbse_02_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "lcls rs\'k ckSNkjsa x;ha Hkknks x;k / losjk gqvk" (The smallest lanes lost their way / darkness fell) appears.', answer: 'The student only translates the literal event (nightfall)',
                  options: ['The student only translates the literal event (nightfall)', 'critical analysis'],
                  hint: 'If stuck, return to node c12_hin_ar_cbse_02_008 (Imagery and Metaphor) and c12_hin_ar_cbse_02_009.',
                  misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy words.' },
                { id: 'b', prompt: 'Apply the concept of *irony* to the stanza where the poet describes the children\'s play: "irax mM+kus okys cPpksa osQ >qaM dks / pedhys b\'kkjksa ls cqykrs.', answer: 'The irony lies in the juxtaposition of "irax mM+kus" (raising the sun/dawn)',
                  options: ['The irony lies in the juxtaposition of "irax mM+kus" (raising the sun/dawn)', 'critical analysis'],
                  hint: 'If stuck, return to node c12_hin_ar_cbse_02_008 (Imagery and Metaphor) and c12_hin_ar_cbse_02_009.',
                  misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy words.' },
                { id: 'c', prompt: 'Analyze how the poet uses *sensory imagery* (visual, auditory, tactile) in the first two stanzas to build the atmosphere of the street.', answer: 'Visual: "yky losjk" (blood-red sunset)',
                  options: ['Visual: "yky losjk" (blood-red sunset)', 'critical analysis'],
                  hint: 'If stuck, return to node c12_hin_ar_cbse_02_008 (Imagery and Metaphor) and c12_hin_ar_cbse_02_009.',
                  misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy words.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['Have the student re-read only the *third stanza* (starting "vH;kl") and annotate every verb: "mM+rh", "ykrs".', 'Ask: "Which verbs show *agency* (children acting) vs *passivity* (things happening to them)?" 3.', 'Guide them to see the shift: children *choose* to play (agency) but *are forced* to work (passivity).', 'Assign: Write one PEEL paragraph using only verbs from that stanza as evidence to prove "The poem shows childhood.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The poem \'इराक्ष\' romanticizes poverty by making the children\'s suffering look poetic and beautiful." Defend or refute using specific.', answer: 'Refute',
                  options: ['Refute', 'vkdk\'k', 'D;k vki Hkh muosQ lkFk gSa\\', 'critical analysis'],
                  hint: 'If stuck, return to node c12_hin_ar_cbse_02_008 (Imagery and Metaphor) and c12_hin_ar_cbse_02_009.',
                  misconception: 'Students believe "critical analysis" means *criticizing* the poem (finding faults) or *summarizing* it with fancy words.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-the': { steps: ['Have the student re-read only the *third stanza* (starting "vH;kl") and annotate every verb: "mM+rh", "ykrs".', 'Ask: "Which verbs show *agency* (children acting) vs *passivity* (things happening to them)?" 3.', 'Guide them to see the shift: children *choose* to play (agency) but *are forced* to work (passivity).', 'Assign: Write one PEEL paragraph using only verbs from that stanza as evidence to prove "The poem shows childhood.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit the identification of imagery and symbolism in nodes 008 and 009, and.',
          misconception: 'Students believe that writing a paragraph summarizing the poem stanza-by-stanza constitutes a "critical appreciation".',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'critical appreciation', 'analysis'],
                  hint: 'If stuck, revisit the identification of imagery and symbolism in nodes 008 and 009, and practice.',
                  misconception: 'Students believe that writing a paragraph summarizing the poem stanza-by-stanza constitutes a "critical appreciation" or "analysis" answer.' },
                { id: 'b', prompt: 'Why is it insufficient to only summarize the poem when answering a question like "Analyze the use of imagery in \'irax\'"?', answer: 'Summarizing only retells what happens',
                  options: ['Summarizing only retells what happens', 'critical appreciation', 'analysis'],
                  hint: 'If stuck, revisit the identification of imagery and symbolism in nodes 008 and 009, and practice.',
                  misconception: 'Students believe that writing a paragraph summarizing the poem stanza-by-stanza constitutes a "critical appreciation" or "analysis" answer.' }
          ],
            remediations: { 'writing-a-paragraph-summarizing-the': { steps: ['Have the student list all poetic devices identified in nodes 008 and 009 for this poem.', 'Practice converting each device into a PEEL paragraph: Point = device name, Evidence = line reference, Explanation.', 'Give a 3-mark question and ask the student to write only the Point and Evidence for two different devices.', 'Gradually build to full PEEL paragraphs, then full 5-mark answers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points are structured conversational prompts.',
          hint: 'If unable to structure a spoken PEEL response, revisit node 014 (Writing Skills) and.',
          misconception: 'Students believe a literary discussion is a \'share your feelings\' circle where any personal anecdote counts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points are structured conversational prompts that',
                  options: ['Speaking and Listening: Discussion Points are structured conversational prompts that', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and narrative structure in a poem refer to the sequence of events, images, or', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If unable to structure a spoken PEEL response, revisit node 014 (Writing Skills) and convert.',
                  misconception: 'Students believe a literary discussion is a \'share your feelings\' circle where any personal anecdote counts.' }
          ],
            remediations: { 'a-literary-discussion-is-a': { steps: ['**Re-anchor**: Have the student re-read *only* the two NCERT discussion questions they find hardest (e.g., Q2.', '**Model**: Teacher demonstrates a 60-second PEEL response to that question, explicitly saying "My point is...', 'This connects to the theme of..." 3.', '**Practice**: Student delivers the *same* PEEL response to a peer, who checks off each component on a checklist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
