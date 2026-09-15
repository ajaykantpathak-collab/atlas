import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch21_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch21_p1: SimDef = {
    id: 'v3_c11_eng_w_ch21_p1',
    title: 'Patterns of Creativity (Essay) · Part 1/3',
    subtitle: 'Watch an astrophysicist argue that a poet and a physicist create the same way.',
    classLevel: 11, subject: 'eng_w', topic: 'Patterns of Creativity (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch21'],
    nodeIds: ['c11_eng_w_cbse_21_001', 'c11_eng_w_cbse_21_002', 'c11_eng_w_cbse_21_003', 'c11_eng_w_cbse_21_004', 'c11_eng_w_cbse_21_005', 'c11_eng_w_cbse_21_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing one theory of creativity across two fields', intro: 'A Nobel astrophysicist places Keats next to Newton and claims the pattern is identical — interrogate the claim.', goal: 'Apply assimilation and accommodation across poetry and science and analyse the essay\'s circular structure.' },
    discovery: {
        question: 'A poet borrows wave-particle duality as imagery in a poem. Under Chandrasekhar\'s scheme, is that assimilation or accommodation?',
        options: ['Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes', 'Accommodation — borrowing science always rebuilds the form', 'Neither — science and poetry share no patterns', 'Accommodation — any new idea forces new patterns'],
        answer: 'Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes',
        hook: 'The essay\'s real claim isn\'t \'science vs. poetry\' — it\'s that Newton and Keats ran the same two moves: fit the world to patterns, then remake patterns for the world.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background is a preparatory section that provides essential information about the author, historical-intellectual context, key concepts, and central questions of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_21_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the essay\'s paragraphs as thesis, parallel anecdotes and synthesis, then weigh whether the returning \'child on the seashore\' closes the argument or just repeats it.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a documentary where a famous astrophysicist argues that the creative process of a poet like Keats and a scientist like Newton.',
            decisions: [{ prompt: 'Who is the author of "Patterns of Creativity" and what is his primary scientific achievement?', options: [
                { text: 'The author is S', outcome: 'The author is S. Chandrasekhar (Subrahmanyan Chandrasekhar), a Nobel Prize-winning astrophysicist.' },
                { text: 'a poet or a different scientist', outcome: 'Not quite — Students often believe this essay merely contrasts science and poetry (science = facts, poetry.', reveals: 'this-essay-merely-contrasts-science' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked to explain how a filmmaker structures a documentary about two different crafts — say, a potter and a physicist — to show their surprising.',
            decisions: [{ prompt: 'What is the thesis statement of "Patterns of Creativity" and in which paragraph does it first appear?', options: [
                { text: 'The thesis is that both poetry and science rely on imaginative leaps and pattern-making,', outcome: 'The thesis is that both poetry and science rely on imaginative leaps and pattern-making, and.' },
                { text: 'the creative process in science and in art is essentially the same', outcome: 'Not quite — Students often treat "plot" in an essay as a mere summary of content ("first he talks about Keats.', reveals: 'students-often-treat-plot-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re reading a scientist\'s reflection on why poets and scientists see creativity differently — you notice the essay doesn\'t have a "scene" like.',
            decisions: [{ prompt: 'What is the primary historical-intellectual setting of S. Chandrasekhar\'s "Patterns of Creativity," and which famous 1959 lecture does.', options: [
                { text: 'The essay is set in the mid-20th century scientific establishment, implicitly responding', outcome: 'The essay is set in the mid-20th century scientific establishment, implicitly responding to C.P.' },
                { text: 'it\'s set in a laboratory', outcome: 'Not quite — Students treat "setting" in essays as physical location (e.g., "Cambridge University") and.', reveals: 'students-treat-setting-in-essays' },
                { text: 'it\'s about ancient Greece', outcome: 'Not quite — Students treat "setting" in essays as physical location (e.g., "Cambridge University") and.', reveals: 'students-treat-setting-in-essays' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re asked: "The essayist in \'Patterns of Creativity\' isn\'t just reporting facts — they\'re *arguing* through a distinct personality.',
            decisions: [{ prompt: 'What is the primary distinction between analyzing a protagonist in a fictional narrative versus analyzing the essayist\'s persona in.', options: [
                { text: 'In fiction, the protagonist is a *constructed character* with traits, desires, and arc', outcome: 'In fiction, the protagonist is a *constructed character* with traits, desires, and arc revealed.' },
                { text: 'both have feelings and backstory', outcome: 'Not quite — Students treat the essayist as a *transparent window* on the topic ("the author explains.', reveals: 'students-treat-the-essayist-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are reading "Patterns of Creativity" and notice the narrator mentions a poet and a scientist in conversation—how do you know they are not just.',
            decisions: [{ prompt: 'Define "supporting character" in the context of a non-fiction essay like "Patterns of Creativity."', options: [
                { text: 'A supporting character in an essay is any named or distinctly portrayed individual (other', outcome: 'A supporting character in an essay is any named or distinctly portrayed individual (other than the.' },
                { text: 'any person mentioned', outcome: 'Not quite — Students treat supporting characters in essays as "minor characters" from fiction—hunting for.', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked: "Is scientific discovery more like solving a puzzle or writing a poem?" This question mirrors the core tension Chandrasekhar explores.',
            decisions: [{ prompt: 'What is the primary theme of S. Chandrasekhar\'s essay "Patterns of Creativity"? State it in one sentence using abstract nouns.', options: [
                { text: 'The primary theme is the fundamental unity of the creative impulse in science and poetry,', outcome: 'The primary theme is the fundamental unity of the creative impulse in science and poetry, both.' },
                { text: 'Science and poetry are different', outcome: 'Not quite — Students often confuse the *topic* ("creativity in science and poetry") with the *theme* ("the.', reveals: 'students-often-confuse-the-topic' },
                { text: 'Chandrasekhar likes poetry', outcome: 'Not quite — Students often confuse the *topic* ("creativity in science and poetry") with the *theme* ("the.', reveals: 'students-often-confuse-the-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school runs a \'Science vs Arts\' debate and the science captain claims: \'Scientists discover by logic; poets create by imagination — completely different brains at work.\' You remember Chandrasekhar\'s \'Patterns of Creativity\' argues almost the opposite.',
            decisions: [{ prompt: 'What\'s the essay\'s actual argument you should deploy?', options: [
                { text: 'Counter with the shared pattern: Chandrasekhar — a Nobel astrophysicist who loved literature — argues Keats and Newton use the same cognitive moves: assimilation (fitting new experience into existing patterns) and accommodation (changing the pattern to fit new experience). Newton\'s \'logic\' required imaginative leaps; Keats\'s \'imagination\' required structural discipline.', outcome: 'The debate flips: the essay dissolves the science-is-rigid / poetry-is-free stereotype instead of reinforcing it.' },
                { text: 'Use the essay to support the motion — it contrasts scientists\' facts with poets\' emotions.', outcome: 'That\'s the surface misreading: the essay\'s whole point is that both domains run on identical creative patterns, not that they diverge.', reveals: 'essay-contrasts-science-poetry' },
                { text: 'Summarise it as \'first he talks about Keats, then about Newton\' and let the examples speak for themselves.', outcome: 'That confuses content with argument: the examples are ordered by rhetorical logic to build a thesis, not just listed.', reveals: 'essay-plot-is-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_006', title: 'The bigger picture',
          caseStudy: { intro: 'Newton \'invented\' his framework as surely as Keats \'discovered\' truth in a myth — the essay\'s circle closes because the child on the shore now means something more.',
            decisions: [{ prompt: 'What comes next? Patterns of Creativity (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Patterns of Creativity (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background is a preparatory section that provides.',
          hint: 'Review the Class 10 chapter on Richard Ebright (c10_engl_cbse_15_001) for scientific.',
          misconception: 'Students often believe this essay merely contrasts science and poetry (science = facts, poetry = emotions).',
          parts: [
                { id: 'a', prompt: 'Who is the author of "Patterns of Creativity" and what is his primary scientific achievement?', answer: 'The author is S',
                  options: ['The author is S', 'a poet or a different scientist'],
                  hint: 'Review the Class 10 chapter on Richard Ebright (c10_engl_cbse_15_001) for scientific creativity and.',
                  misconception: 'Students often believe this essay merely contrasts science and poetry (science = facts, poetry = emotions).' }
          ],
            remediations: { 'this-essay-merely-contrasts-science': { steps: ['If the student holds this misconception: 1.', 'Have them re-read the author\'s note and first two paragraphs, highlighting every phrase indicating similarity ("common.', 'Create a two-column Venn diagram: left column "Keats\'s Process", right column "Newton\'s Process", middle "Shared.', 'Fill the middle with "Assimilation → Accommodation" using one concrete example from each (e.g., Keats: sonnet form →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_002', difficulty: 'standard',
          question: 'Plot in a non-fiction essay refers to the logical sequence of ideas, arguments.',
          hint: 'If stuck, review the "Before You Read" node for historical context, then practice.',
          misconception: 'Students often treat "plot" in an essay as a mere summary of content ("first he talks about Keats, then Newton") and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot in a non-fiction essay refers to the logical sequence of ideas, arguments, and',
                  options: ['Plot in a non-fiction essay refers to the logical sequence of ideas, arguments, and', 'Before You Read: Context and Background is a preparatory section that provides essential', 'Setting in a non-fiction essay refers to the historical, intellectual, and cultural', 'Character analysis of the protagonist in an essay involves examining the author\'s'],
                  hint: 'If stuck, review the "Before You Read" node for historical context, then practice labeling.',
                  misconception: 'Students often treat "plot" in an essay as a mere summary of content ("first he talks about Keats, then Newton") and ignore the.' }
          ],
            remediations: { 'students-often-treat-plot-in': { steps: ['Give the student a blank paragraph-function template (Thesis / Example A / Example B / Analogy / Synthesis.', 'Have them re-read the essay *only* to fill the template, ignoring content details.', 'Ask: "If you removed Paragraph 3, what would the argument lose?" — forcing them to articulate structural necessity.', 'Finally, have them re-order the template cards into a different structure (e.g., problem-solution) and defend why the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "plot" in an essay as a mere summary of content ("first he talks about Keats, then Newton") and.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the essay\'s conclusion — which returns to the opening image of the "child on the seashore" — provides effective structural closure or merely.', answer: 'It provides effective closure',
                  options: ['It provides effective closure', 'repetition'],
                  hint: 'If stuck, review the "Before You Read" node for historical context, then practice labeling.',
                  misconception: 'Students often treat "plot" in an essay as a mere summary of content ("first he talks about Keats, then Newton") and ignore the.' }
          ],
            remediations: { 'students-often-treat-plot-in': { steps: ['Give the student a blank paragraph-function template (Thesis / Example A / Example B / Analogy / Synthesis.', 'Have them re-read the essay *only* to fill the template, ignoring content details.', 'Ask: "If you removed Paragraph 3, what would the argument lose?" — forcing them to articulate structural necessity.', 'Finally, have them re-order the template cards into a different structure (e.g., problem-solution) and defend why the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_003', difficulty: 'standard',
          question: 'Setting in a non-fiction essay refers to the historical, intellectual, and.',
          hint: 'If stuck, review c11_eng_w_cbse_21_001 — specifically the "Two Cultures" lecture summary.',
          misconception: 'Students treat "setting" in essays as physical location (e.g., "Cambridge University") and "atmosphere" as general mood.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "rhetorical atmosphere" to this excerpt: "The scientist\'s world is one of rigorous logic; the poet\'s, of intuitive insight.', answer: 'The parallel structure ("The scientist\'s world',
                  options: ['The parallel structure ("The scientist\'s world', 'contrast'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_001 — specifically the "Two Cultures" lecture summary and.',
                  misconception: 'Students treat "setting" in essays as physical location (e.g., "Cambridge University") and "atmosphere" as general mood ("serious,".' }
          ],
            remediations: { 'students-treat-setting-in-essays': { steps: ['If a student gives physical-location answers: 1) Show them the opening paragraph — ask "Where is the author.', 'Ask: "What *weather* does each sentence create?" 3) Have them map three "atmosphere words" per section and connect each.', '4) Practice: rewrite a neutral sentence ("Science and poetry are different") into three atmospheres: melancholic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in an essay involves examining the.',
          hint: 'If stuck, review "argumentative moves annotation" from c11_eng_w_cbse_21_002.',
          misconception: 'Students treat the essayist as a *transparent window* on the topic ("the author explains creativity") rather than.',
          parts: [
                { id: 'a', prompt: 'Apply the "voice-selection-engagement" framework: The essayist writes, "Poets and scientists both begin with a leap of imagination, but the scientist must.', answer: 'The parallel structure ("both begin',
                  options: ['The parallel structure ("both begin', 'it shows scientists are more serious'],
                  hint: 'If stuck, review "argumentative moves annotation" from c11_eng_w_cbse_21_002 — specifically the.',
                  misconception: 'Students treat the essayist as a *transparent window* on the topic ("the author explains creativity") rather than a *constructed arguer*.' }
          ],
            remediations: { 'students-treat-the-essayist-as': { steps: ['Have the student reread *only the first and last paragraphs* and list every "I/we" statement, modal verb (must, should.', 'Ask: "If this essayist were a character in a play, what *role* are they playing?', '(e.g., the mediator, the revelator, the skeptic)" 3.', 'Map each body paragraph to a *rhetorical move*: concession, analogy, distinction, synthesis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_005', difficulty: 'standard',
          question: 'Supporting characters in an essay are individuals (real or referenced) who.',
          hint: 'Revisit node 004 and re-read the essay marking every "I think/feel" statement by the.',
          misconception: 'Students treat supporting characters in essays as "minor characters" from fiction—hunting for personality quirks.',
          parts: [
                { id: 'a', prompt: 'Explain why a supporting character in an essay might be described only through their ideas or speech rather than physical appearance or backstory.', answer: 'Essays prioritize argument over narrative',
                  options: ['Essays prioritize argument over narrative', 'essays don\'t have space for description'],
                  hint: 'Revisit node 004 and re-read the essay marking every "I think/feel" statement by the narrator—this.',
                  misconception: 'Students treat supporting characters in essays as "minor characters" from fiction—hunting for personality quirks, backstories, or emotional.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['Ask the student to list every person the narrator *quotes* or *describes in action* (ignore passing mentions).', 'For each, write: "This person stands for ______ kind of creativity because ______." 3.', 'Have them check: Does the narrator *use* this person to move the argument forward?', 'If yes, it\'s a supporting character; if no, it\'s a passing reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_006', difficulty: 'standard',
          question: 'The primary theme of an essay is its central, unifying idea that the author.',
          hint: 'Review "argument mapping" for non-fiction: identify the claim, the evidence for each.',
          misconception: 'Students often confuse the *topic* ("creativity in science and poetry") with the *theme* ("the structural unity.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Chandrasekhar argues that the "two cultures" (science and humanities) are not truly separate when it comes to creativity.', answer: 'Chandrasekhar argues both scientists and poets operate under strict constraints',
                  options: ['Chandrasekhar argues both scientists and poets operate under strict constraints', 'both use imagination', 'creativity in science and poetry', 'the structural unity of creative processes across disciplines'],
                  hint: 'Review "argument mapping" for non-fiction: identify the claim, the evidence for each claim, and the.',
                  misconception: 'Students often confuse the *topic* ("creativity in science and poetry") with the *theme* ("the structural unity of creative processes.' }
          ],
            remediations: { 'students-often-confuse-the-topic': { steps: ['If a student cannot distinguish topic from theme: 1) Have them list 5 topics in the essay (e.g., Kepler, beauty.', '2) Ask: "What does the author *say* about each?" 3) Guide them to see the repeated claim: "In each case, creativity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
