import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p3: SimDef = {
    id: 'v3_c12_hin_a_ch09_p3',
    title: 'Hkh"e lkguh · Part 3/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'Hkh"e lkguh · Part 3/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_013', 'c12_hin_a_cbse_09_014', 'c12_hin_a_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride and spite', 'A pen name for style', 'An apology'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation in Hindi literature is the systematic process of examining a text\'s deeper layers — themes, symbols, structure, language choices, and socio-cultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE board exam and see a 5-mark question: "Kabir\'s poetry uses simple metaphors to convey profound spiritual truths.',
            decisions: [{ prompt: 'What is the primary difference between *literal comprehension* (understanding what happens in the poem) and *critical interpretation*.', options: [
                { text: 'Literal comprehension states: "The poet says he was a weaver, his guru\'s name was', outcome: 'Literal comprehension states: "The poet says he was a weaver, his guru\'s name was Ramanand, and.' },
                { text: 'Critical interpretation explains', outcome: 'Not quite — Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched.', reveals: 'critical-analysis-means-finding-hidden' },
                { text: 'knowledge', outcome: 'Not quite — Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched.', reveals: 'critical-analysis-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the board exam and see this question: "कुकुआन के दोहों में विरह-वेदना को प्रकृति के माध्यम से कैसे व्यक्त किया गया है?',
            decisions: [{ prompt: 'What is the PEEL structure for writing literature answers, and what does each letter stand for in the context of poetry analysis?', options: [
                { text: 'PEEL stands for Point (main argument about the poem), Evidence (specific line/word from', outcome: 'PEEL stands for Point (main argument about the poem), Evidence (specific line/word from the text).' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills for poetry" means memorizing model answers for each question.', reveals: 'writing-skills-for-poetry-means' },
                { text: 'specifically demands thematic connection, not just summary', outcome: 'Not quite — Students believe "writing skills for poetry" means memorizing model answers for each question.', reveals: 'writing-skills-for-poetry-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation in Hindi literature is the.',
          hint: 'If stuck on metaphor function (Diagnostic Q2), revisit c12_hin_a_cbse_09_008 "Imagery and.',
          misconception: 'Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched readings (e.g.',
          parts: [
                { id: 'a', prompt: 'Apply the "Tension → Craft → Effect → Context → Synthesis" method to analyze the second poem\'s opening: "vkukdkuh vkjlh fugkfjcks djkSxs dkSykSa \\ dgk eks pfdr.', answer: '**Tension:** Ritual performance (vkukdkuh vkjlh',
                  options: ['**Tension:** Ritual performance (vkukdkuh vkjlh', 'how the poem does what it says', 'critical analysis', 'lanslks = the five elements'],
                  hint: 'If stuck on metaphor function (Diagnostic Q2), revisit c12_hin_a_cbse_09_008 "Imagery and Metaphor".',
                  misconception: 'Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched readings (e.g., "lanslks = the five.' },
                { id: 'b', prompt: 'Compare the role of "sound patterning" (anunāśik, alliteration, rhythm) in the two prescribed poems.', answer: 'Poem 1: "cgqr fnuku dks vofèk vklikl ijs / [kjs vjcjfu Hkjs gSa mfB tku dks"',
                  options: ['Poem 1: "cgqr fnuku dks vofèk vklikl ijs / [kjs vjcjfu Hkjs gSa mfB tku dks"', 'alliteration present', 'critical analysis', 'lanslks = the five elements'],
                  hint: 'If stuck on metaphor function (Diagnostic Q2), revisit c12_hin_a_cbse_09_008 "Imagery and Metaphor".',
                  misconception: 'Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched readings (e.g., "lanslks = the five.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['**Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and c12_hin_a_cbse_09_009 (Irony/Symbolism)** — re-do the "metaphor.', '**Revisit c11_hin_ar_cbse_01_013 / 02_013 / 09_013 (Class 11 Critical Thinking)** — practice the 5-step method on.', '**Diagnostic re-test:** Take Diagnostic Questions 2, 3, 4 again after 48 hours.', 'If still scoring <80%, schedule 1:1 with teacher for "think-aloud" modeling of Poem 2 analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched readings (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Kabir\'s poems are simple village songs — they don\'t need critical analysis because their meaning is obvious." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'simplicity fallacy', 'evaluate', 'critical analysis'],
                  hint: 'If stuck on metaphor function (Diagnostic Q2), revisit c12_hin_a_cbse_09_008 "Imagery and Metaphor".',
                  misconception: 'Students believe "critical analysis" means *finding hidden symbols* — so they invent far-fetched readings (e.g., "lanslks = the five.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['**Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and c12_hin_a_cbse_09_009 (Irony/Symbolism)** — re-do the "metaphor.', '**Revisit c11_hin_ar_cbse_01_013 / 02_013 / 09_013 (Class 11 Critical Thinking)** — practice the 5-step method on.', '**Diagnostic re-test:** Take Diagnostic Questions 2, 3, 4 again after 48 hours.', 'If still scoring <80%, schedule 1:1 with teacher for "think-aloud" modeling of Poem 2 analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_014', difficulty: 'standard',
          question: 'Writing Skills based on Chapter 9 (कुकुआन) refers to the ability to compose.',
          hint: 'If stuck on Explanation step: Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and 009.',
          misconception: 'Students believe "writing skills for poetry" means memorizing model answers for each question.',
          parts: [
                { id: 'a', prompt: 'A student writes: "कुकुआन के पहले दोहे में बादल बरसते हैं और मोर नाचते हैं जिससे विरहिणी को दुःख होता है।" Identify TWO specific weaknesses in this answer.', answer: 'Weakness 1: No direct textual evidence',
                  options: ['Weakness 1: No direct textual evidence', 'writing skills for poetry', '"writing skills for poetry" means memorizing model answers for each question'],
                  hint: 'If stuck on Explanation step: Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and 009.',
                  misconception: 'Students believe "writing skills for poetry" means memorizing model answers for each question.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "दूसरे दोहे में \'रात\' और \'सुबह\' के चक्र का क्या महत्व है?" Write a complete 4-sentence PEEL paragraph.', answer: 'Point: The night-dawn cycle symbolizes the endless waiting in virah',
                  options: ['Point: The night-dawn cycle symbolizes the endless waiting in virah', 'बहु बेरि', 'writing skills for poetry', '"writing skills for poetry" means memorizing model answers for each question'],
                  hint: 'If stuck on Explanation step: Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and 009.',
                  misconception: 'Students believe "writing skills for poetry" means memorizing model answers for each question.' },
                { id: 'c', prompt: 'Compare how the FIRST doha uses AUDITORY imagery (sound) versus the SECOND doha using VISUAL imagery (sight). Which creates a stronger sense of virah?', answer: 'First doha: Auditory',
                  options: ['First doha: Auditory', 'Both are equal', 'writing skills for poetry', '"writing skills for poetry" means memorizing model answers for each question'],
                  hint: 'If stuck on Explanation step: Revisit c12_hin_a_cbse_09_008 (Imagery/Metaphor) and 009.',
                  misconception: 'Students believe "writing skills for poetry" means memorizing model answers for each question.' }
          ],
            remediations: { 'writing-skills-for-poetry-means': { steps: ['Have the student pick ONE 3-mark question from the chapter\'s exercise (e.g., Q4 on poetic features).', 'Together, highlight the 3 key words in the question (e.g., "काव्यगत विशेषताएँ" = imagery, language, emotion).', 'For each key word, find ONE line from the dohas — write it verbatim.', 'For each line, complete this sentence starter: "This line uses [device] to show [effect] which connects to [theme].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_015', difficulty: 'standard',
          question: 'Speaking and Listening Discussion Points refer to structured oral activities.',
          hint: 'If stuck on textual evidence retrieval: Re-read node 008 (Imagery/Metaphor) and node 009.',
          misconception: 'Students treat "discussion points" as *topic sentences for essays* — e.g., writing "Guru is like a lamp" as a bullet.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening Discussion Points refer to structured oral activities where',
                  options: ['Speaking and Listening Discussion Points refer to structured oral activities where', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting and atmosphere in poetry refer to the time, place, physical environment, and the'],
                  hint: 'If stuck on textual evidence retrieval: Re-read node 008 (Imagery/Metaphor) and node 009.',
                  misconception: 'Students treat "discussion points" as *topic sentences for essays* — e.g., writing "Guru is like a lamp" as a bullet point.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student produces essay-style bullets: (1) Have them pick one bullet and convert it into a *contestable claim*.', '(3) Record 2-minute exchanges; replay and tag each move: "Evidence offered," "Counter-claim," "Clarification sought,".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
