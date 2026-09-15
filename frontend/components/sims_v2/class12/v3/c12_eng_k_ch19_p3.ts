import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch19_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch19_p3: SimDef = {
    id: 'v3_c12_eng_k_ch19_p3',
    title: 'On Science Fiction (Non-fiction) · Part 3/3',
    subtitle: 'Cowboys herding dolphins — science fiction, says Asimov',
    classLevel: 12, subject: 'eng_k', topic: 'On Science Fiction (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch19'],
    nodeIds: ['c12_eng_k_cbse_19_013', 'c12_eng_k_cbse_19_014', 'c12_eng_k_cbse_19_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genre theorist', intro: 'A biochemist who wrote hundreds of SF books draws the genre\'s true border — and it\'s not where you think.', goal: 'Apply Asimov\'s background-over-content definition and trace science fiction\'s birth to the Industrial Revolution.' },
    discovery: {
        question: 'A Western where cowboys herd dolphins on a water planet — Asimov says it\'s still science fiction. A baseball thriller aboard a space station? Also SF. What makes a story SF?',
        options: ['The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to', 'Spaceships and lasers', 'Aliens must appear', 'It must predict the future correctly'],
        answer: 'The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to',
        hook: 'Sci-fi couldn\'t exist before ~1800: only when the Industrial Revolution made change visible within one lifetime did \'the future\' become imaginable. The scientist is the priest\'s heir — both hold \'the secret of controlling the Universe\'; one through formulas, the other through laws.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation involves systematically breaking down a non-fiction text to examine its argument structure, evaluate the author\'s claims and evidence, interpret.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_19_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draw Asimov\'s border yourself: separate prescientific wonder from scientific extrapolation, judge whether a fair-play mystery can survive alien rules, and reclassify the stories you thought you knew.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re reading a sci-fi novel where humans colonize Mars using technology that doesn\'t exist yet — you accept it because the story establishes.',
            decisions: [{ prompt: 'What is Asimov\'s fundamental criterion for distinguishing science fiction from myths and legends?', options: [
                { text: 'Asimov distinguishes them by the governing system of their fictional universes: myths', outcome: 'Asimov distinguishes them by the governing system of their fictional universes: myths operate.' },
                { text: 'science fiction is about the future, myths are about the past', outcome: 'Not quite — Students often think Asimov dismisses myths/legends as "inferior" to science fiction because.', reveals: 'asimov-dismisses-myths-legends-as' },
                { text: 'inferior', outcome: 'Not quite — Students often think Asimov dismisses myths/legends as "inferior" to science fiction because.', reveals: 'asimov-dismisses-myths-legends-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re asked: "How is science fiction different from fantasy?" — a common Class 12 board question.',
            decisions: [{ prompt: 'Define "discourse markers" and give three examples from Asimov\'s essay that signal contrast, addition, and conclusion respectively.', options: [
                { text: 'Discourse markers (or discourse signalers) are words/phrases that connect ideas across', outcome: 'Discourse markers (or discourse signalers) are words/phrases that connect ideas across paragraphs.' },
                { text: 'and, but, so', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a CUET group discussion round where the prompt is: "Science fiction predicts future technology — discuss with examples from Asimov\'s essay.".',
            decisions: [{ prompt: 'A student says: "Asimov thinks myths are just wrong science fiction because they used magic instead of physics." Does this accurately.', options: [
                { text: 'No', outcome: 'No. Asimov explicitly states myths are "the equivalent of science fiction set in another kind.' },
                { text: 'and argues we shouldn\'t', outcome: 'Not quite — Students treat "discussion" as "taking turns giving speeches." They prepare mini-essays, recite.', reveals: 'students-treat-discussion-as-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Marketing debates whether a quiet family drama aboard a generation ship \'counts\' as science fiction for the catalogue — \'there isn\'t a single ray gun in it.\'',
            decisions: [{ prompt: 'Is it science fiction?', options: [
                { text: 'Yes — Asimov\'s test is the background, not the props: a world running on different discovered rules makes it SF even if the plot is a domestic drama.', outcome: 'Spaceships and lasers are content; the genre marker is a society significantly transformed by science — which this has.' },
                { text: 'No — no gadgets, no aliens, no SF.', outcome: 'That\'s the marketing-trope definition Asimov dismantles; the background society is what does the classifying.', reveals: 'scifi-equals-gadgets' },
                { text: 'Yes — and anything set in the future or with magic like the Force is SF too.', outcome: 'Over-correcting breaks the other boundary: fantasy tropes in space costumes aren\'t SF because the laws of nature aren\'t the engine.', reveals: 'fantasy-equals-scifi' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_015', title: 'You made it',
          caseStudy: { intro: 'You can now define a genre by its world, not its wardrobe — and you\'ll never call Star Wars hard SF again without a caveat.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation involves systematically breaking.',
          hint: 'If stuck, return to c12_eng_k_cbse_19_009 (Irony and Symbolism) and analyze the Holmes.',
          misconception: 'Students often think Asimov dismisses myths/legends as "inferior" to science fiction because he calls them.',
          parts: [
                { id: 'a', prompt: 'Apply Asimov\'s definition of science fiction ("background, not content") to this scenario: A story about a detective solving a murder on a space station using.', answer: 'Yes, it is science fiction by Asimov\'s definition',
                  options: ['Yes, it is science fiction by Asimov\'s definition', 'No, because the science is real, not fictional', 'inferior', 'prescientific'],
                  hint: 'If stuck, return to c12_eng_k_cbse_19_009 (Irony and Symbolism) and analyze the Holmes parody.',
                  misconception: 'Students often think Asimov dismisses myths/legends as "inferior" to science fiction because he calls them "prescientific." In fact,.' },
                { id: 'b', prompt: 'Analyze Asimov\'s use of the Holmes/Watson "pocket-frannistan" parody.', answer: 'The parody illustrates the "deus ex machina" trap: inventing a new scientific',
                  options: ['The parody illustrates the "deus ex machina" trap: inventing a new scientific', 'It shows Holmes is smarter than sci-fi detectives', 'inferior', 'prescientific'],
                  hint: 'If stuck, return to c12_eng_k_cbse_19_009 (Irony and Symbolism) and analyze the Holmes parody.',
                  misconception: 'Students often think Asimov dismisses myths/legends as "inferior" to science fiction because he calls them "prescientific." In fact,.' }
          ],
            remediations: { 'asimov-dismisses-myths-legends-as': { steps: ['Re-read the "Stop and Think" questions in the NCERT text (p.195) — they directly target the myth vs.', 'Create a two-column table: Column A = Myth/legend example from text (flying carpet, crystal ball, seven-league boots).', 'For each pair, write the governing rule: e.g., "Magic formula \'Open sesame\'" vs.', '"Remote-control signal." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_014', difficulty: 'standard',
          question: 'Writing skills based on "On Science Fiction" involve crafting analytical.',
          hint: 'If stuck, re-read Section I paragraphs 5-8 (myths vs. SF comparison) and Section.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on "On Science Fiction" involve crafting analytical responses that',
                  options: ['Writing skills based on "On Science Fiction" involve crafting analytical responses that', 'The "Before You Read: Context and Background" stage prepares students to engage with', 'In non-fiction essays like Asimov\'s "On Science Fiction," narrative structure refers to', 'Setting in a non-fiction essay refers to the conceptual or intellectual framework the'],
                  hint: 'If stuck, re-read Section I paragraphs 5-8 (myths vs. SF comparison) and Section II paragraphs 1-4.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces summary instead of analysis: (1) Give them a sample weak summary and a strong analytical.', '(2) Have them convert three summary sentences into analytical ones by adding "This shows that..." + explanation.', '(3) Practice with a new genre pair (e.g., "Western vs.', 'Space Western") using the PEEL template.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Asimov dismisses myths as inferior to science fiction because they are unscientific." Support your evaluation with textual.', answer: 'The claim is false',
                  options: ['The claim is false', 'He calls myths', 'and asks only that they be', 'well-written'],
                  hint: 'If stuck, re-read Section I paragraphs 5-8 (myths vs. SF comparison) and Section II paragraphs 1-4.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.' },
                { id: 'b', prompt: 'Write a 100-word analytical paragraph comparing the "sports story" and "science fiction sports story" using Asimov\'s framework.', answer: 'A sports story is defined by its content',
                  options: ['A sports story is defined by its content', 'writing skills based on the chapter', '"writing skills based on the chapter" means summarizing Asimov\'s essay'],
                  hint: 'If stuck, re-read Section I paragraphs 5-8 (myths vs. SF comparison) and Section II paragraphs 1-4.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing Asimov\'s essay.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces summary instead of analysis: (1) Give them a sample weak summary and a strong analytical.', '(2) Have them convert three summary sentences into analytical ones by adding "This shows that..." + explanation.', '(3) Practice with a new genre pair (e.g., "Western vs.', 'Space Western") using the PEEL template.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck on evidence-finding: re-read Section I (myth-tech parallels) and Section.',
          misconception: 'Students treat "discussion" as "taking turns giving speeches." They prepare mini-essays, recite them without listening.',
          parts: [
                { id: 'a', prompt: 'In a group discussion on Prompt 2 ("science fiction visualized today\'s tech fifty years ago"), a student cites "Asimov\'s Foundation series predicted the.', answer: 'The second student is right for a text-based discussion',
                  options: ['The second student is right for a text-based discussion', 'reference to text'],
                  hint: 'If stuck on evidence-finding: re-read Section I (myth-tech parallels) and Section.',
                  misconception: 'Students treat "discussion" as "taking turns giving speeches." They prepare mini-essays, recite them without listening, and don\'t reference.' },
                { id: 'b', prompt: 'Analyze this discussion contribution: "I think Asimov is saying that science fiction is better than myths because science is real and magic isn\'t.', answer: 'Flaw 1: Asimov never ranks them as "better"',
                  options: ['Flaw 1: Asimov never ranks them as "better"', 'author\'s attitude'],
                  hint: 'If stuck on evidence-finding: re-read Section I (myth-tech parallels) and Section.',
                  misconception: 'Students treat "discussion" as "taking turns giving speeches." They prepare mini-essays, recite them without listening, and don\'t reference.' }
          ],
            remediations: { 'students-treat-discussion-as-taking': { steps: ['If a student defaults to monologue: (1) Stop the discussion.', '(2) Model a "build-on" stem: "What [Peer] said about X connects to Y in the text because..." (3) Assign roles: one.', '(4) Re-run the same prompt with roles rotated.', '(5) After 5 minutes, debrief: "Which role felt hardest?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
