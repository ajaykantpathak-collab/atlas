import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p3',
    title: 'lw;Zdkar f=ikBh ^fujkyk · Part 3/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'lw;Zdkar f=ikBh ^fujkyk · Part 3/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_013', 'c12_hin_ar_cbse_05_014', 'c12_hin_ar_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literature involves analyzing and interpreting a text by examining its themes, literary devices, structure, and context to form a reasoned judgment about its meaning and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re standing in a cornfield at sunset - the golden stalks swaying, wind whispering through leaves, children\'s laughter echoing.',
            decisions: [{ prompt: 'What is the central theme of the poem "मक्का" as reflected in the imagery of the cornfield and the wind?', options: [
                { text: 'The central theme is the harmonious coexistence of nature and human life, where the', outcome: 'The central theme is the harmonious coexistence of nature and human life, where the cornfield.' },
                { text: 'description of a farm', outcome: 'Not quite — Students often think "critical analysis" means finding faults or criticizing the poem.', reveals: 'critical-analysis-means-finding-faults' },
                { text: 'critical analysis', outcome: 'Not quite — Students often think "critical analysis" means finding faults or criticizing the poem.', reveals: 'critical-analysis-means-finding-faults' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing Question 4: "Compare the three poems on imagery, word-choice, and experience." Your mind races — you know the poems but.',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Conclusion', outcome: 'Not quite — **Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s.', reveals: 'exact-error-students-believe-writing' },
                { text: 'writing based on the chapter', outcome: 'Not quite — **Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s.', reveals: 'exact-error-students-believe-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking in literature involves analyzing and interpreting a text.',
          hint: 'Review the 4-step analysis method (Observe, Connect, Interpret, Evaluate) practiced.',
          misconception: 'Students often think "critical analysis" means finding faults or criticizing the poem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literature involves analyzing and interpreting a text by examining',
                  options: ['Critical thinking in literature involves analyzing and interpreting a text by examining', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review the 4-step analysis method (Observe, Connect, Interpret, Evaluate) practiced in Class 11.',
                  misconception: 'Students often think "critical analysis" means finding faults or criticizing the poem.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['Ask the student to explain the difference between "criticizing" and "analyzing" using a simple example (e.g., a movie.', 'understanding a movie\'s message).', 'Have them re-read the poem with the prompt: "What is the poet trying to make me feel/understand?" not "What is wrong.', 'Practice with a familiar poem (like Class 11\'s "कबीर की साखी") using the 4-step method: Observe -> Connect -> Interpret.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "critical analysis" means finding faults or criticizing the poem.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s ending (the wind continuing its journey) suggests optimism or melancholy about the passage of time.', answer: 'The ending suggests quiet optimism - the wind\'s endless journey mirrors life\'s',
                  options: ['The ending suggests quiet optimism - the wind\'s endless journey mirrors life\'s', 'sadness because things end', 'critical analysis', 'The poem is good but could have more rhyme'],
                  hint: 'Review the 4-step analysis method (Observe, Connect, Interpret, Evaluate) practiced in Class 11.',
                  misconception: 'Students often think "critical analysis" means finding faults or criticizing the poem.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['Ask the student to explain the difference between "criticizing" and "analyzing" using a simple example (e.g., a movie.', 'understanding a movie\'s message).', 'Have them re-read the poem with the prompt: "What is the poet trying to make me feel/understand?" not "What is wrong.', 'Practice with a familiar poem (like Class 11\'s "कबीर की साखी") using the 4-step method: Observe -> Connect -> Interpret.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_014', difficulty: 'standard',
          question: 'Writing Skills: Based on the Chapter refers to the ability to compose.',
          hint: 'If stuck on device identification, revisit **c12_hin_ar_cbse_05_008** (Imagery and.',
          misconception: '**Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s notes or the.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in the context of writing literature answers for CBSE Class 12?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Conclusion', 'writing based on the chapter', 'narrate rather than analyse'],
                  hint: 'If stuck on device identification, revisit **c12_hin_ar_cbse_05_008** (Imagery and Metaphor) and.',
                  misconception: '**Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s notes or the textbook\'s critical.' },
                { id: 'b', prompt: 'Apply the PEEL structure to write a 4-sentence response to: "Identify one metaphor in \'मक्क\' and explain its effect." Use the corn-cob imagery.', answer: '**Point**: The poet uses metaphor to animate the cornfield',
                  options: ['**Point**: The poet uses metaphor to animate the cornfield', 'writing based on the chapter'],
                  hint: 'If stuck on device identification, revisit **c12_hin_ar_cbse_05_008** (Imagery and Metaphor) and.',
                  misconception: '**Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s notes or the textbook\'s critical.' },
                { id: 'c', prompt: 'Analyze how the imagery of \'light\' functions differently in \'मक्क\' (evening lamp/glow) versus \'चकोरक वग्सज\' (moonlight).', answer: 'In \'मक्क\', light is domestic and fleeting',
                  options: ['In \'मक्क\', light is domestic and fleeting', 'writing based on the chapter'],
                  hint: 'If stuck on device identification, revisit **c12_hin_ar_cbse_05_008** (Imagery and Metaphor) and.',
                  misconception: '**Exact error**: Students believe "writing based on the chapter" means *reproducing* the teacher\'s notes or the textbook\'s critical.' }
          ],
            remediations: { 'exact-error-students-believe-writing': { steps: ['**Day 1**: Take ONE stanza from \'मक्क\' (e.g., the corn-cob stanza).', 'Write 3 PEEL paragraphs on it — each focusing on ONE device (personification, auditory imagery, color symbolism).', 'Use the template: "The poet uses [device] in \'[phrase]\' to suggest [effect], which reinforces [theme]." 2.', '**Day 2**: Compare two stanzas — one from \'मक्क\', one from \'चकोरक वग्सج\' — on *one* criterion (e.g., treatment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_05_008 (Literary Devices: Imagery and Metaphor).',
          misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा बिंदु\' (discussion points) का अर्थ है — कविता के बारे में जो मन में आए, बोल देना। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral communication',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral communication', 'This node covers the "Before You Read" section', 'In poetry, narrative structure refers to the deliberate organization of images, ideas,', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_05_008 (Literary Devices: Imagery and Metaphor) to re-learn how.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा बिंदु\' (discussion points) का अर्थ है — कविता के बारे में जो मन में आए, बोल देना। वे सोचते हैं: "मुझे कविता.' }
          ],
            remediations: { 'discussion-points': { steps: ['चरण 1: छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जो तुम्हें सबसे प्रभावशाली लगे। उसे जोर से पढ़ो। अब बताओ: इस पंक्ति.', '(ख) इसकी ध्वनि क्या करती है?', 'चरण 3: छात्र को उसी शब्द पर 60 सेकंड बोलने को कहें — केवल उस शब्द पर। चरण 4: फिर दूसरी पंक्ति पर यही प्रक्रिया दोहराएं।.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
