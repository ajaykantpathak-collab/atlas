import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p3: SimDef = {
    id: 'v3_c12_hin_a_ch01_p3',
    title: 'lw;Zdkar f=kikBh ^fujkyk · Part 3/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'lw;Zdkar f=kikBh ^fujkyk · Part 3/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_013', 'c12_hin_a_cbse_01_014', 'c12_hin_a_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to interpret themes, evaluate author\'s choices, analyze literary devices, and synthesize evidence to form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine the board exam asks: "Compare the vision of India in दकुसजफ्यक का छर with the personal spiritual journey in नसोलसुक का छर." Where do you begin?',
            decisions: [{ prompt: 'What is the central theme of नसोलसुक का छर?', options: [
                { text: 'Central theme: The futility of worldly attachments and the search for spiritual', outcome: 'Central theme: The futility of worldly attachments and the search for spiritual liberation through.' },
                { text: 'it\'s about a sad woman remembering her life', outcome: 'Not quite — Students think "analysis" means listing literary devices found in the poem.', reveals: 'analysis-means-listing-literary-devices' },
                { text: 'analysis', outcome: 'Not quite — Students think "analysis" means listing literary devices found in the poem.', reveals: 'analysis-means-listing-literary-devices' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "नसोल्सुक के छर्रे में कवि ने स्वतंत्रता की लालसा को कैसे व्यक्त किया है?" Most students freeze.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12 Hindi?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Language', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for each question.', reveals: 'writing-skills-means-memorizing-model' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for each question.', reveals: 'writing-skills-means-memorizing-model' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) and c12_hin_a_cbse_01_009.',
          misconception: 'Students think "analysis" means listing literary devices found in the poem.',
          parts: [
                { id: 'a', prompt: 'What is the central theme of नसोलसुक का छर?', answer: 'Central theme: The futility of worldly attachments and the search for spiritual',
                  options: ['Central theme: The futility of worldly attachments and the search for spiritual', 'it\'s about a sad woman remembering her life', 'analysis', '"analysis" means listing literary devices found in the poem'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) and c12_hin_a_cbse_01_009 (Irony and.',
                  misconception: 'Students think "analysis" means listing literary devices found in the poem.' },
                { id: 'b', prompt: 'Explain why the poet addresses "करुणा" (compassion) as "कोयल" (cuckoo) in नसोलसुक का छर.', answer: 'The cuckoo\'s call signals spring/renewal',
                  options: ['The cuckoo\'s call signals spring/renewal', 'because the cuckoo sings sweetly', 'analysis', '"analysis" means listing literary devices found in the poem'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) and c12_hin_a_cbse_01_009 (Irony and.',
                  misconception: 'Students think "analysis" means listing literary devices found in the poem.' },
                { id: 'c', prompt: 'In दकुसजफ्यक का छर, the line "गसे ओकककक यक मकक लोसजकककक" uses a specific literary device. Identify it and explain its effect in 2-3 sentences.', answer: 'Device: व्यक्ति अलंकार (personification) combined with रूपक (metaphor)—the',
                  options: ['Device: व्यक्ति अलंकार (personification) combined with रूपक (metaphor)—the', 'personification', 'analysis', '"analysis" means listing literary devices found in the poem'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) and c12_hin_a_cbse_01_009 (Irony and.',
                  misconception: 'Students think "analysis" means listing literary devices found in the poem.' }
          ],
            remediations: { 'analysis-means-listing-literary-devices': { steps: ['Have student pick ONE image from नसोलसुक का छर (e.g., "नकचय इन चय" or "गख गकस+ यकसवक यक लरयक नथ").', 'Ask three questions in sequence: "What does this literally describe?" → "What does it suggest about the speaker\'s state.', 'Guide them to write 3 sentences following PEEL: Point (the image suggests X), Evidence (the line "..."), Explanation.', 'therefore...), Link (this reinforces the theme of...).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme.',
          misconception: 'Students believe "writing skills" means memorizing model answers for each question.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12 Hindi?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Language', 'writing skills', '"writing skills" means memorizing model answers for each question'],
                  hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme: Primary) and.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for each question.' },
                { id: 'b', prompt: 'A student writes: "नसोल्सुक का छर्रा स्वतंत्रता के बारे में है। नसोल्सुक जेल में है और वह आजाद होना चाहता है। कवि ने बहुत सुंदर शब्दों का प्रयोग किया है।".', answer: 'Weaknesses: (1) No clear Point',
                  options: ['Weaknesses: (1) No clear Point', 'writing skills', '"writing skills" means memorizing model answers for each question'],
                  hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme: Primary) and.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for each question.' },
                { id: 'c', prompt: 'Compare how the two poems in Chapter 1 (नसोल्सुक का छर्रा and डकुस्ज़फ़िक का छर्रा) use the image of "chain/bondage" (शृंखला/बेड़ी).', answer: 'Point 1 (नसोल्सुक): Chains are internalized sorrow',
                  options: ['Point 1 (नसोल्सुक): Chains are internalized sorrow', 'writing skills', '"writing skills" means memorizing model answers for each question'],
                  hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme: Primary) and.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for each question.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['Take the last 3 years\' CBSE Hindi Core sample papers. Extract every 5-6 mark question from Chapter 1.', 'For each question, write ONLY the Point (topic sentence) and list 2 evidence quotes with stanza numbers — do NOT write.', 'Check if your Points directly answer the specific question verb (विश्लेषण कीजिए / तुलना कीजिए / व्याख्या कीजिए).', 'Rewrite Points that don\'t match.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means memorizing model answers for each question.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "दोनों छर्रों में कवि ने एक ही भाव व्यक्त किया है — देशभक्ति।" Is this a valid interpretation?', answer: 'Invalid',
                  options: ['Invalid', 'writing skills', '"writing skills" means memorizing model answers for each question'],
                  hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme: Primary) and.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for each question.' },
                { id: 'b', prompt: 'Write a 4-line original stanza in Hindi (using Tulsidas\'s style: simple vocabulary, rhythmic meter, nature imagery) that could serve as a third poem in this.', answer: 'Title: "स्वतंत्रता के बाद" vjQ.k ;g eèkqe',
                  options: ['Title: "स्वतंत्रता के बाद" vjQ.k ;g eèkqe', 'writing skills', '"writing skills" means memorizing model answers for each question'],
                  hint: 'If unable to generate Points for a question, revisit c12_hin_a_cbse_01_006 (Theme: Primary) and.',
                  misconception: 'Students believe "writing skills" means memorizing model answers for each question.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['Take the last 3 years\' CBSE Hindi Core sample papers. Extract every 5-6 mark question from Chapter 1.', 'For each question, write ONLY the Point (topic sentence) and list 2 evidence quotes with stanza numbers — do NOT write.', 'Check if your Points directly answer the specific question verb (विश्लेषण कीजिए / तुलना कीजिए / व्याख्या कीजिए).', 'Rewrite Points that don\'t match.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening discussion points are structured oral communication.',
          hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) — list 5 images from each.',
          misconception: 'छात्र समझते हैं कि ASL चर्चा में \'अच्छा बोलना\' = \'तेज़ बोलना\', \'भारी शब्दावली\', या \'लंबा बोलना\' है। वास्तव में CBSE ASL.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening discussion points are structured oral communication activities',
                  options: ['Speaking and Listening discussion points are structured oral communication activities', '"Before You Read: Context and Background" refers to the preparatory step of understanding', 'Plot and Narrative Structure in poetry refers to the organized sequence of emotions,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_01_008 (Imagery and Metaphor) — list 5 images from each poem with.',
                  misconception: 'छात्र समझते हैं कि ASL चर्चा में \'अच्छा बोलना\' = \'तेज़ बोलना\', \'भारी शब्दावली\', या \'लंबा बोलना\' है। वास्तव में CBSE ASL रूब्रिक में \'विषय.' }
          ],
            remediations: { 'asl': { steps: ['चरण 1: छात्र को एक ही कविता (नसोलसुक) का एक स्टैंजा देकर कहें: "इसमें से तीन प्रतीक चुनो और प्रत्येक का एक वाक्य में.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
