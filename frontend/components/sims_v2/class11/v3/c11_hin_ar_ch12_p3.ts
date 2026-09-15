import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p3',
    title: 'Q.kh\'oj ukFk js.kq · Part 3/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'Q.kh\'oj ukFk js.kq · Part 3/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_013', 'c11_hin_ar_cbse_12_014', 'c11_hin_ar_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s explicit and implicit layers—its structure, language, perspective, and socio-cultural context—to form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you receive a letter from your village home but cannot read it yourself—you must wait for someone else to read it aloud, wondering if they might skip.',
            decisions: [{ prompt: 'Identify the central structural irony in the poem "पाइक दकस दकस" and state it in one sentence.', options: [
                { text: 'The central structural irony is that the Paik\'s profession revolves entirely around', outcome: 'The central structural irony is that the Paik\'s profession revolves entirely around transporting.' },
                { text: 'the Paik is poor', outcome: 'Not quite — Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g.', reveals: 'students-often-treat-critical-analysis' },
                { text: 'the poet is educated', outcome: 'Not quite — Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g.', reveals: 'students-often-treat-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you get a board exam question: "पाइक के चरित्र की विशेषताओं का वर्णन कीजिए।" You write a paragraph summarizing the poem but the teacher says it lacks.',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing analytical paragraphs for literature?', options: [
                { text: 'PEEL stands for Point (topic sentence), Evidence (textual support), Explanation (analysis', outcome: 'PEEL stands for Point (topic sentence), Evidence (textual support), Explanation (analysis.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a character sketch means listing adjectives (e.g., "पाइक जिद्दी.', reveals: 'writing-a-character-sketch-means' },
                { text: 'पाइक जिद्दी, अनपढ़, डरपोक है', outcome: 'Not quite — Students believe that writing a character sketch means listing adjectives (e.g., "पाइक जिद्दी.', reveals: 'writing-a-character-sketch-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, review c11_hin_ar_cbse_12_009 (Irony and Symbolism) to refresh how to track.',
          misconception: 'Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g., "education is important").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of actively examining a',
                  options: ['Critical thinking in literary analysis is the disciplined process of actively examining a', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'If stuck, review c11_hin_ar_cbse_12_009 (Irony and Symbolism) to refresh how to track an evolving.',
                  misconception: 'Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g., "education is important") and then quoting.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['Return to the poem\'s opening stanza: have the student read aloud the Paik\'s self-description ("पाइक लुंज की यादग.', 'Map the dialogue exchanges on a two-column table: Poet\'s argument vs.', 'Trace the single image "छाती पर चट फट" across three occurrences, noting what changes in the context each time.', 'Finally, ask: "If the poem ended with the Paik becoming a clerk, would it be stronger or weaker?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g., "education is important").',
          parts: [
                { id: 'a', prompt: 'Critique the interpretation that the poem presents a simplistic "literacy solves all problems" message.', answer: 'The poem complicates the literacy narrative by giving the Paik a valid economic',
                  options: ['The poem complicates the literacy narrative by giving the Paik a valid economic', 'the poem shows education changes everything immediately'],
                  hint: 'If stuck, review c11_hin_ar_cbse_12_009 (Irony and Symbolism) to refresh how to track an evolving.',
                  misconception: 'Students often treat "critical analysis" as hunting for a hidden "message" or "moral" (e.g., "education is important") and then quoting.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['Return to the poem\'s opening stanza: have the student read aloud the Paik\'s self-description ("पाइक लुंज की यादग.', 'Map the dialogue exchanges on a two-column table: Poet\'s argument vs.', 'Trace the single image "छाती पर चट फट" across three occurrences, noting what changes in the context each time.', 'Finally, ask: "If the poem ended with the Paik becoming a clerk, would it be stronger or weaker?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_12_012 (Comprehension) for evidence-finding practice.',
          misconception: 'Students believe that writing a character sketch means listing adjectives (e.g., "पाइक जिद्दी, अनपढ़, डरपोक है") with.',
          parts: [
                { id: 'a', prompt: 'Using the poem, write a PEEL paragraph (4-5 sentences) on the theme "Fear of change perpetuates illiteracy." Use evidence from the interaction between पाइक and.', answer: 'Point: The poem illustrates how fear of change traps generations in illiteracy',
                  options: ['Point: The poem illustrates how fear of change traps generations in illiteracy', 'पाइक जिद्दी, अनपढ़, डरपोक है', 'writing a character sketch means listing adjectives (e'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_12_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students believe that writing a character sketch means listing adjectives (e.g., "पाइक जिद्दी, अनपढ़, डरपोक है") with a few lines quoted.' },
                { id: 'b', prompt: 'Compare the effectiveness of two openings for a critical appreciation: (A) "यह कविता पाइक नामक एक स्त्री के बारे में है।" (B) "फकीर मोहन सेनापति की कविता \'पाइक.', answer: 'Opening B is better',
                  options: ['Opening B is better', 'पाइक जिद्दी, अनपढ़, डरपोक है', 'writing a character sketch means listing adjectives (e'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_12_012 (Comprehension) for evidence-finding practice and.',
                  misconception: 'Students believe that writing a character sketch means listing adjectives (e.g., "पाइक जिद्दी, अनपढ़, डरपोक है") with a few lines quoted.' }
          ],
            remediations: { 'writing-a-character-sketch-means': { steps: ['Have the student highlight every adjective they used in their character sketch.', 'For each adjective, demand: "Which stanza/line shows this?', 'Ask: "What does this line *do* — reveal stubbornness?', 'Rewrite each point as: "The poet shows पाइक\'s stubbornness in Stanza 3 when she says \'नहीं, मुझे नहीं पढ़ना\' — the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for this chapter refers to the.',
          hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Vocabulary in Context) and rebuild the.',
          misconception: 'Students often treat the father\'s illiteracy as a deficit to be fixed, mirroring the son\'s initial view.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points for this chapter refers to the structured oral',
                  options: ['Speaking and Listening: Discussion Points for this chapter refers to the structured oral', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Vocabulary in Context) and rebuild the Bundelkhandi.',
                  misconception: 'Students often treat the father\'s illiteracy as a deficit to be fixed, mirroring the son\'s initial view.' }
          ],
            remediations: { 'students-often-treat-the-father': { steps: ['If a student insists the father is \'backward\', do not lecture.', 'Instead: (1) Ask them to list five things the father knows without reading (farming cycles, folk medicine, oral.', '(2) Have them re-read stanza 3 where the father predicts the son\'s future betrayal (\'त्क ड्यडक्क्स से कह द्गा...', 'त्क ड्यडक्क्स इज क्त्ज फ्क्जस\').'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
