import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch01_p3: SimDef = {
    id: 'v3_c12_eng_f_ch01_p3',
    title: 'The Last Lesson · Part 3/3',
    subtitle: 'The day grammar became a nation\'s last stand',
    classLevel: 12, subject: 'eng_f', topic: 'The Last Lesson · Part 3/3',
    chapters: ['c12_eng_f_ch01'],
    nodeIds: ['c12_eng_f_cbse_01_013', 'c12_eng_f_cbse_01_014', 'c12_eng_f_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary analyst', intro: 'A language dies quietly — in a classroom, on a Tuesday. See the history hiding in one boy\'s unfinished homework.', goal: 'Connect the Franco-Prussian decree to every character\'s behaviour and read the story as cultural resistance.' },
    discovery: {
        question: 'Franz almost skips school to dodge a grammar test — on the very morning his language is outlawed forever. Why does that childish impulse make the tragedy sharper, not smaller?',
        options: ['A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation', 'It shows Franz was simply lazy', 'It proves the decree wasn\'t important', 'It tells us school was optional'],
        answer: 'A petty worry against an irreversible cultural loss — the child\'s scale of concern magnifies how little the community grasps its own amputation',
        hook: 'The Franco-Prussian War isn\'t background trivia — it IS the plot. Berlin\'s decree banning French drives every detail: the bulletin board, the villagers\' guilt, M. Hamel\'s Sunday clothes. Read the history as the conflict, not the décor.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Last Lesson\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk into that last classroom as a witness: decode how the language decree turns grammar into resistance, and trace what the pigeons, the primer and \'Vive la France!\' are really saying.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Last Lesson\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define dramatic irony and identify ONE specific moment in "The Last Lesson" where it operates.', options: [
                { text: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character', outcome: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character lacks, creating.' },
                { text: 'irony is when something unexpected happens', outcome: 'Not quite — Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses.', reveals: 'students-equate-critical-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Last Lesson\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What are the SIX mandatory components of a formal notice as per CBSE marking scheme?', options: [
                { text: 'The six components are: (1) Name of institution/organisation, (2) NOTICE in capitals, (3)', outcome: 'The six components are: (1) Name of institution/organisation, (2) NOTICE in capitals, (3) Date, (4).' },
                { text: 'greeting', outcome: 'Not quite — Students believe "writing skills based on the chapter" means writing ABOUT the chapter (summary.', reveals: 'writing-skills-based-on-the' },
                { text: 'salutation', outcome: 'Not quite — Students believe "writing skills based on the chapter" means writing ABOUT the chapter (summary.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Last Lesson\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Define "linguistic chauvinism" as referenced in the NCERT "Talking about the Text" section for this chapter, and give one historical.', options: [
                { text: 'Linguistic chauvinism is aggressive, excessive pride in one\'s own language that leads to', outcome: 'Linguistic chauvinism is aggressive, excessive pride in one\'s own language that leads to imposing.' },
                { text: 'loving your language too much', outcome: 'Not quite — Students treat "Speaking and Listening" as *performing memorized answers* rather than *thinking.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_013', title: 'A real-world call',
          caseStudy: { intro: 'A writer must choose between writing in English — reaching a global audience, earning more — or in their mother tongue — preserving a language, reaching a smaller home audience.',
            decisions: [{ prompt: 'Does reach justify abandoning your own language?', options: [
                { text: 'Write in English — ideas matter more than the vessel', outcome: 'The reach argument; every writer who chooses this makes the home language\'s literature a little thinner.' },
                { text: 'Write in the mother tongue — a language dies by desertion', outcome: 'The preservation argument; the smaller audience is real, and so is what only that language can say.' },
                { text: 'Write in both — translate yourself', outcome: 'The dual answer — doubles the work, keeps both doors open; the rarest choice because it\'s the hardest.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A district orders all schools to teach only in a new official language from tomorrow; elders crowd the notice board while a child shrugs, \'it\'s just a subject switch\'.',
            decisions: [{ prompt: 'Is it just a subject switch?', options: [
                { text: 'No — Daudet\'s point in \'The Last Lesson\' is that language carries identity and freedom; banning the mother tongue is cultural amputation, which is why the villagers treat the last class as a shared loss.', outcome: 'A decree about \'just a language\' lands as the loss of a community\'s voice — the story\'s whole weight comes from that difference.' },
                { text: 'Yes — grammar is grammar; swapping which language is taught changes nothing essential.', outcome: 'That reads the decree as administrative detail and misses how the war\'s terms reach into every villager\'s sense of self.', reveals: 'language-is-just-a-subject' },
                { text: 'Sad, but attachment to one\'s language is nostalgia — practicality says move on.', outcome: 'The villagers\' guilt and Hamel\'s ceremony show the attachment isn\'t sentimentality but belonging — dismissing it erases what was actually lost.', reveals: 'pragmatism-erases-identity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a quiet classroom scene and hear an empire fall. Daudet teaches you to find the enormous inside the ordinary — the skill every literature answer is secretly grading.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Last Lesson\' — analysing the text to reach.',
          hint: 'If stuck, review c12_eng_f_cbse_01_009 (Irony and Symbolism) for device identification.',
          misconception: 'Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses irony, symbolism, and.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "linguistic chauvinism" (referenced in the NCERT \'Talking About the Text\' section) to analyze M.', answer: 'No, it is not linguistic chauvinism',
                  options: ['No, it is not linguistic chauvinism', 'to teach only German'],
                  hint: 'If stuck, review c12_eng_f_cbse_01_009 (Irony and Symbolism) for device identification with textual.',
                  misconception: 'Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses irony, symbolism, and imagery" without.' },
                { id: 'b', prompt: 'Analyze the TWO "last lessons" in the story: (1) the explicit French grammar/writing lesson, and (2) the implicit lesson about identity and resistance.', answer: 'The explicit lesson (participles → writing "France, Alsace" → history → babies\'',
                  options: ['The explicit lesson (participles → writing "France, Alsace" → history → babies\'', 'structure and meaning'],
                  hint: 'If stuck, review c12_eng_f_cbse_01_009 (Irony and Symbolism) for device identification with textual.',
                  misconception: 'Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses irony, symbolism, and imagery" without.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Revisit c12_eng_f_cbse_01_009 (Irony and Symbolism) — re-identify each device with its TEXTUAL LOCATION and IMMEDIATE.', 'Practice the PEEL chain on ONE device: Point = "The bulletin board symbolizes state power over language"; Evidence.', 'Re-attempt Diagnostic Question 4 with this structure.', 'If still stuck, review c12_eng_f_cbse_01_001 (Context) to strengthen historical framing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses irony, symbolism, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate this critical claim: "The villagers\' presence in the classroom is mere sentimental nostalgia; they do nothing to actually resist the German order.".', answer: 'Challenge',
                  options: ['Challenge', 'resistance'],
                  hint: 'If stuck, review c12_eng_f_cbse_01_009 (Irony and Symbolism) for device identification with textual.',
                  misconception: 'Students equate "critical analysis" with "listing literary devices" — e.g., writing "Daudet uses irony, symbolism, and imagery" without.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Revisit c12_eng_f_cbse_01_009 (Irony and Symbolism) — re-identify each device with its TEXTUAL LOCATION and IMMEDIATE.', 'Practice the PEEL chain on ONE device: Point = "The bulletin board symbolizes state power over language"; Evidence.', 'Re-attempt Diagnostic Question 4 with this structure.', 'If still stuck, review c12_eng_f_cbse_01_001 (Context) to strengthen historical framing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills from \'The Last Lesson\' — using the text as a model.',
          hint: 'If unable to generate evidence for PEEL, return to c12_eng_f_cbse_01_008.',
          misconception: 'Students believe "writing skills based on the chapter" means writing ABOUT the chapter (summary, character sketch).',
          parts: [
                { id: 'a', prompt: 'Compare these two openings for the argumentative paragraph. Which is stronger and why?', answer: 'Opening B is stronger',
                  options: ['Opening B is stronger', 'writing skills based on the chapter'],
                  hint: 'If unable to generate evidence for PEEL, return to c12_eng_f_cbse_01_008 (Imagery/Metaphor) and.',
                  misconception: 'Students believe "writing skills based on the chapter" means writing ABOUT the chapter (summary, character sketch).' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Have the student re-read the NCERT "Writing" section (page 10-11) and highlight the THREE distinct tasks — notice.', 'For each task, identify the TRIGGER in the chapter: bulletin-board crowd → notice; "key to prison" quote → language.', 'Practice converting ONE trigger into its format using a template (provide notice template with 6 slots, PEEL table for.', 'Re-attempt Diagnostic Questions 3, 4, 6 with templates, then without.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_01_015', difficulty: 'standard',
          question: 'Discussion points on \'The Last Lesson\' — speaking and listening around the text.',
          hint: 'If stuck, return to c12_eng_f_cbse_01_013 and re-do the "Talking about the Text" Q1-3.',
          misconception: 'Students treat "Speaking and Listening" as *performing memorized answers* rather than *thinking aloud with evidence*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'The Last Lesson\'',
                  options: ['Discussion points on \'The Last Lesson\'', '\'The Last Lesson\' (Flamingo, ch', 'The plot/narrative arc of \'The Last Lesson\'', 'The setting of \'The Last Lesson\''],
                  hint: 'If stuck, return to c12_eng_f_cbse_01_013 and re-do the "Talking about the Text" Q1-3 — each answer.',
                  misconception: 'Students treat "Speaking and Listening" as *performing memorized answers* rather than *thinking aloud with evidence*.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['**Diagnose**: Record the student\'s 2-minute discussion attempt.', 'Check: (a) Does she cite text?', '(b) Does she reference a peer\'s point?', '(c) Is there a clear Claim-Evidence-Analysis structure?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
