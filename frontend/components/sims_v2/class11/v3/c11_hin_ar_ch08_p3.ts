import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p3',
    title: 'fQjkd xksj[kiqjh · Part 3/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'fQjkd xksj[kiqjh · Part 3/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_013', 'c11_hin_ar_cbse_08_014', 'c11_hin_ar_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to examine a text deeply by breaking down its components (arguments, perspectives, evidence, literary techniques), evaluating their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist today traveling through rural India, asking people "What does India mean to you?" just as Nehru did in the 1930s.',
            decisions: [{ prompt: 'What is the fundamental difference between *literal comprehension* (understanding what the text says) and *critical interpretation*.', options: [
                { text: 'Literal comprehension identifies surface facts: Nehru travelled, asked peasants about', outcome: 'Literal comprehension identifies surface facts: Nehru travelled, asked peasants about Bharat Mata.' },
                { text: 'Bharat Mata', outcome: 'Not quite — Students often believe "Critical Thinking" means *criticizing* or *finding faults* with Nehru\'s.', reveals: 'critical-thinking-means-criticizing-or' },
                { text: 'Comprehension is easy, interpretation is hard', outcome: 'Not quite — Students often believe "Critical Thinking" means *criticizing* or *finding faults* with Nehru\'s.', reveals: 'critical-thinking-means-criticizing-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "How does Nehru redefine \'Bharat Mata\' in the chapter?',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (specific textual.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe that "writing skills" for literature means memorizing model answers or writing.', reveals: 'writing-skills-for-literature-means' },
                { text: 'writing skills', outcome: 'Not quite — Students believe that "writing skills" for literature means memorizing model answers or writing.', reveals: 'writing-skills-for-literature-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re sitting in a circle with classmates after reading Nehru\'s description of traveling through India and asking people "Who is Bharat Mata?" — you.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion in Class 11 Hindi as per CBSE guidelines?', options: [
                { text: 'The primary purpose is to demonstrate analytical engagement with the text by exchanging', outcome: 'The primary purpose is to demonstrate analytical engagement with the text by exchanging.' },
                { text: 'to retell the story', outcome: 'Not quite — Students believe "discussion" means taking turns giving speeches summarizing the chapter.', reveals: 'discussion-means-taking-turns-giving' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns giving speeches summarizing the chapter.', reveals: 'discussion-means-taking-turns-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to examine a text.',
          hint: 'If stuck, review "Theme: Primary Theme and Message" (node 006) to recall the central.',
          misconception: 'Students often believe "Critical Thinking" means *criticizing* or *finding faults* with Nehru\'s views (e.g., "He.',
          parts: [
                { id: 'a', prompt: 'Analyze the relationship between the *anecdote of the peasant asking "Which Bharat Mata?"* and Nehru\'s *historical argument* about India\'s ancient cultural.', answer: 'The anecdote is *evidence* for unity',
                  options: ['The anecdote is *evidence* for unity', 'The anecdote proves unity', 'Critical Thinking', 'He ignored caste oppression'],
                  hint: 'If stuck, review "Theme: Primary Theme and Message" (node 006) to recall the central argument, then.',
                  misconception: 'Students often believe "Critical Thinking" means *criticizing* or *finding faults* with Nehru\'s views (e.g., "He ignored caste oppression".' }
          ],
            remediations: { 'critical-thinking-means-criticizing-or': { steps: ['If a student falls into the "criticism = fault-finding" trap: (1) Give them a neutral text (e.g., a weather report) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_014', difficulty: 'standard',
          question: 'Writing Skills: Based on the Chapter refers to the ability to compose.',
          hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
          misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.',
          parts: [
                { id: 'a', prompt: 'Compare two approaches to answering "Discuss the role of irony in Nehru\'s portrayal of \'Bharat Mata\'." Approach A: Lists three ironic statements from the text.', answer: 'Approach B demonstrates analysis (Bloom\'s Level 4)',
                  options: ['Approach B demonstrates analysis (Bloom\'s Level 4)', 'writing skills'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
                  misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Diagnose:** Give the student a 3-mark question and ask them to highlight their Point, Evidence, Explanation, Link.', 'If they can\'t, they lack structural awareness.', '**Model:** Show a side-by-side comparison: a 40-word summary (1/3) vs.', 'a 60-word PEEL answer (3/3) for the same question.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For a 6-mark question on Chapter 8, writing a 300-word detailed summary of Nehru\'s travels guarantees full marks because it shows.', answer: 'The claim is false',
                  options: ['The claim is false', 'content knowledge', 'answer writing skill', 'writing skills'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_08_006 (Primary Theme) and c11_hin_ar_cbse_08_008.',
                  misconception: 'Students believe that "writing skills" for literature means memorizing model answers or writing long summaries.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Diagnose:** Give the student a 3-mark question and ask them to highlight their Point, Evidence, Explanation, Link.', 'If they can\'t, they lack structural awareness.', '**Model:** Show a side-by-side comparison: a 40-word summary (1/3) vs.', 'a 60-word PEEL answer (3/3) for the same question.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013).',
          misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.',
          parts: [
                { id: 'a', prompt: 'In "Hkkjr ekrk", Nehru writes that when he asked people "Who is Bharat Mata?", a peasant replied "The earth/land (dharti)".', answer: 'The peasant\'s answer is only one perspective Nehru presents',
                  options: ['The peasant\'s answer is only one perspective Nehru presents', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' },
                { id: 'b', prompt: 'During a discussion on "unity in diversity" in this chapter, a peer claims: "Nehru only describes diversity (different religions, regions) but never explains.', answer: '"Actually, in the passage where Nehru describes traveling from the Himalayas to',
                  options: ['"Actually, in the passage where Nehru describes traveling from the Himalayas to', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' },
                { id: 'c', prompt: 'Compare the discussion potential of these two questions about the chapter: (A) "Did you like Nehru\'s description of India?" (B) "How does Nehru use the.', answer: 'Question (B) enables deeper analysis',
                  options: ['Question (B) enables deeper analysis', 'discussion', '"discussion" means taking turns giving speeches summarizing the chapter'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_08_013) — specifically the.',
                  misconception: 'Students believe "discussion" means taking turns giving speeches summarizing the chapter.' }
          ],
            remediations: { 'discussion-means-taking-turns-giving': { steps: ['Stop the student mid-monologue and say: "That\'s a good summary.', 'Now, *respond* to what Rohan just said about the peasant\'s answer — do you agree or disagree, and *which line* supports.', 'Give a "Discussion Frame" card: "सहमत हूँ क्योंकि पाठ में...', '/ असहमत हूँ क्योंकि नेहरू लिखते हैं...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
