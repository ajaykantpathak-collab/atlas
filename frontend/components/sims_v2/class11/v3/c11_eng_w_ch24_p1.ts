import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch24_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch24_p1: SimDef = {
    id: 'v3_c11_eng_w_ch24_p1',
    title: 'Science and the Sense of Wonder (Essay) · Part 1/3',
    subtitle: 'See why explained light is more wonderful, not less.',
    classLevel: 11, subject: 'eng_w', topic: 'Science and the Sense of Wonder (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch24'],
    nodeIds: ['c11_eng_w_cbse_24_001', 'c11_eng_w_cbse_24_002', 'c11_eng_w_cbse_24_003', 'c11_eng_w_cbse_24_004', 'c11_eng_w_cbse_24_005', 'c11_eng_w_cbse_24_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader defending wonder against the \'science kills magic\' charge', intro: 'A star is \'just\' a nuclear furnace millions of kilometres away — Asimov asks how that could possibly make it less wondrous.', goal: 'Evaluate Asimov\'s argument that scientific understanding deepens rather than exhausts wonder.' },
    discovery: {
        question: 'A friend says learning the optics of a rainbow \'kills the magic.\' What is Asimov\'s actual position?',
        options: ['Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition', 'Agreed — explanation drains mystery permanently', 'Wonder and knowledge are enemies that must be kept apart', 'Science explains everything, so wonder is finished'],
        answer: 'Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition',
        hook: 'Asimov\'s claim is the inverse of the cliché — each breakthrough opens vistas of wonder the uninformed can\'t even reach.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'This node establishes the essential historical, cultural, and literary context required to approach the Tribal Verse chapter, introducing students to the concept of oral literature, the significance.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_24_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Test Asimov\'s thesis against the star and rainbow examples, then evaluate the claim that scientific literacy is a prerequisite for deep wonder.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine your grandmother telling you a story she heard from her grandmother—no book, no script, just voice and memory.',
            decisions: [{ prompt: 'Define "oral literature" in your own words and give one reason why G.N. Devy insists it must be included in the literary canon.', options: [
                { text: 'Oral literature refers to creative works—songs, epics, chants, stories—composed,', outcome: 'Oral literature refers to creative works—songs, epics, chants, stories—composed, transmitted, and.' },
                { text: 'folk tales', outcome: 'Not quite — Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial.', reveals: 'students-equate-tribal-literature-with' },
                { text: 'simple stories', outcome: 'Not quite — Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial.', reveals: 'students-equate-tribal-literature-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are reading a long article about a topic you care about—say, the importance of preserving endangered languages.',
            decisions: [{ prompt: 'What is the thesis statement of G.N. Devy\'s essay "Tribal Verse" as presented in the introduction?', options: [
                { text: 'The thesis is that tribal oral literature constitutes a vast, invaluable part of India\'s', outcome: 'The thesis is that tribal oral literature constitutes a vast, invaluable part of India\'s literary.' },
                { text: 'Tribal songs are beautiful', outcome: 'Not quite — Students often think "plot" only applies to fiction and that essays have no narrative structure.', reveals: 'plot-only-applies-to-fiction' },
                { text: '"plot" only applies to fiction and that essays have no narrative structure', outcome: 'Not quite — Students often think "plot" only applies to fiction and that essays have no narrative structure.', reveals: 'plot-only-applies-to-fiction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re standing at the edge of the Grand Canyon at sunset — the vastness makes you feel small yet deeply connected to something ancient.',
            decisions: [{ prompt: 'What is the primary difference between \'setting\' in a narrative story and \'setting\' in an expository essay like "Science and the Sense.', options: [
                { text: 'In a narrative, setting is the physical/time backdrop for events; in an expository essay,', outcome: 'In a narrative, setting is the physical/time backdrop for events; in an expository essay, setting.' },
                { text: 'setting is where the story happens', outcome: 'Not quite — Students believe setting in an essay is merely the author\'s biography or historical period, and.', reveals: 'setting-in-an-essay-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are asked: "Who is the main character in this essay, and what makes them unique?" Unlike a story, the \'protagonist\' here is not a single person but.',
            decisions: [{ prompt: 'What is the collective protagonist in G.N. Devy\'s essay "Tribal Verse"?', options: [
                { text: 'The collective protagonist is tribal communities (adivasis) as a whole, represented', outcome: 'The collective protagonist is tribal communities (adivasis) as a whole, represented through their.' },
                { text: 'there is no protagonist in an essay', outcome: 'Not quite — Students often think \'character analysis\' only applies to fictional characters in stories, so they.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial where the writer quotes a farmer, a scientist, and a grandmother to prove a point about climate change.',
            decisions: [{ prompt: 'What is the primary function of a supporting character in a non-fiction essay like "Tribal Verse"?', options: [
                { text: 'A supporting character in a non-fiction essay serves as living evidence that illustrates,', outcome: 'A supporting character in a non-fiction essay serves as living evidence that illustrates.' },
                { text: 'they make the essay interesting', outcome: 'Not quite — Students often believe "character analysis" only applies to fictional stories with named.', reveals: 'character-analysis-only-applies-to' },
                { text: 'they are the people the author interviewed', outcome: 'Not quite — Students often believe "character analysis" only applies to fictional stories with named.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re staring at a rainbow – beautiful, mysterious. A friend says, "Science explains it: just light refraction.',
            decisions: [{ prompt: 'What is the central claim Asimov makes about the relationship between science and wonder in the essay?', options: [
                { text: 'Asimov argues that scientific knowledge enhances and deepens the sense of wonder rather', outcome: 'Asimov argues that scientific knowledge enhances and deepens the sense of wonder rather than.' },
                { text: 'science kills wonder by explaining everything', outcome: 'Not quite — Students often believe Asimov argues that "science explains everything, so there\'s no mystery.', reveals: 'asimov-argues-that-science-explains' },
                { text: 'science explains everything, so there\'s no mystery left', outcome: 'Not quite — Students often believe Asimov argues that "science explains everything, so there\'s no mystery.', reveals: 'asimov-argues-that-science-explains' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class must curate a \'Literature of India\' exhibition. A classmate vetoes the tribal songs section: \'The Munda and Kondh songs have no named poet and weren\'t even written down — they\'re folklore, not literature. The printed translations can\'t be the real thing.\'',
            decisions: [{ prompt: 'How do you argue for including them?', options: [
                { text: 'Make Devy\'s argument your own: orality isn\'t pre-literature, it\'s literature in its most resilient form — communities like the Munda, Kondh and Adi have carried songs for birth, death, healing and harvest for centuries without scripts. Tribal creativity works within strict conventions, \'adhering to the past while slightly subverting it.\' The veto itself is the print-culture bias the chapter exists to dismantle.', outcome: 'The section stays: the classmate\'s objection — no author, no fixed text — is precisely the assumption Devy exposes as bias.' },
                { text: 'Accept the veto — without a written original and a named poet, the songs are raw material, not literature.', outcome: 'That equates literature with print and authorship — the very bias that erased a massive share of Indian literature from syllabi.', reveals: 'oral-is-not-literature' },
                { text: 'Include them but label the display \'primitive folklore from India\'s tribal past\' to be accurate.', outcome: 'Framing them as a vanished past is doubly wrong: these are living cultures, and \'primitive\' repeats the hierarchy the essay argues against.', reveals: 'tribal-verse-is-primitive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_006', title: 'The bigger picture',
          caseStudy: { intro: 'Wonder isn\'t built on ignorance — \'isn\'t it pretty?\' is the shallow end; \'isn\'t it astonishing that...?\' is where science swims.',
            decisions: [{ prompt: 'What comes next? Science and the Sense of Wonder (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Science and the Sense of Wonder (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_001', difficulty: 'standard',
          question: 'This node establishes the essential historical, cultural, and literary context.',
          hint: 'If stuck, review Class 9 node c9_engl_ch3_7 (Expository Structure) to see how non-fiction.',
          misconception: 'Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial intent, or aesthetic.',
          parts: [
                { id: 'a', prompt: 'Define "oral literature" in your own words and give one reason why G.N. Devy insists it must be included in the literary canon.', answer: 'Oral literature refers to creative works—songs, epics, chants, stories—composed,',
                  options: ['Oral literature refers to creative works—songs, epics, chants, stories—composed,', 'folk tales', 'simple stories'],
                  hint: 'If stuck, review Class 9 node c9_engl_ch3_7 (Expository Structure) to see how non-fiction texts.',
                  misconception: 'Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial intent, or aesthetic sophistication because.' }
          ],
            remediations: { 'students-equate-tribal-literature-with': { steps: ['If the student holds this misconception, do not lecture.', 'Instead: (1) Play a 2-minute audio clip of a tribal chant (available on IGNCA or YouTube) without translation; ask the.', '(2) Show the textbook\'s note on Miri Agom—a separate ritual language—and ask: "Would a \'simple folk song\' need.', '(4) Re-read Devy\'s line: "The creativity of the tribal artist lies in adhering to the past while, at the same time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial intent, or aesthetic.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Tribal arts are not specifically meant for sale—this helps their preservation." Use evidence from Devy\'s essay to support your.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'yes, it helps', 'no, it harms'],
                  hint: 'If stuck, review Class 9 node c9_engl_ch3_7 (Expository Structure) to see how non-fiction texts.',
                  misconception: 'Students equate "tribal literature" with "folklore" and assume it lacks fixed form, authorial intent, or aesthetic sophistication because.' }
          ],
            remediations: { 'students-equate-tribal-literature-with': { steps: ['If the student holds this misconception, do not lecture.', 'Instead: (1) Play a 2-minute audio clip of a tribal chant (available on IGNCA or YouTube) without translation; ask the.', '(2) Show the textbook\'s note on Miri Agom—a separate ritual language—and ask: "Would a \'simple folk song\' need.', '(4) Re-read Devy\'s line: "The creativity of the tribal artist lies in adhering to the past while, at the same time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a non-fiction essay refers to the.',
          hint: 'Review "thesis statement identification" and "evidence vs. analysis" from Class 10.',
          misconception: 'Students often think "plot" only applies to fiction and that essays have no narrative structure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in a non-fiction essay refers to the organizational',
                  options: ['Plot and narrative structure in a non-fiction essay refers to the organizational', 'This node establishes the essential historical, cultural, and literary context required', 'Setting in an essay refers to the temporal, spatial, and intellectual context that frames', 'Character analysis of the protagonist in a non-fiction essay involves examining the'],
                  hint: 'Review "thesis statement identification" and "evidence vs. analysis" from Class 10 non-fiction.',
                  misconception: 'Students often think "plot" only applies to fiction and that essays have no narrative structure.' }
          ],
            remediations: { 'plot-only-applies-to-fiction': { steps: ['If a student cannot see the essay\'s argumentative arc, guide them through a "reverse outline" activity: (1) Number each.', '(2) Write a one-sentence summary of each paragraph\'s function (e.g., "Paragraph 3: introduces Munda song as first.', '(3) Group paragraphs into sections (Introduction, Evidence 1, Evidence 2, Evidence 3, Theoretical Expansion.', '(4) Draw arrows showing how each section leads to the next.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_003', difficulty: 'standard',
          question: 'Setting in an essay refers to the temporal, spatial, and intellectual context.',
          hint: 'Review Class 10 descriptive writing (c10_engl_cbse_05_008) focusing on how landscape.',
          misconception: 'Students believe setting in an essay is merely the author\'s biography or historical period, and atmosphere is just the.',
          parts: [
                { id: 'a', prompt: 'The author writes: "The most beautiful experience we can have is the mysterious.', answer: 'The atmosphere is reverent awe',
                  options: ['The atmosphere is reverent awe', 'curious atmosphere'],
                  hint: 'Review Class 10 descriptive writing (c10_engl_cbse_05_008) focusing on how landscape descriptions.',
                  misconception: 'Students believe setting in an essay is merely the author\'s biography or historical period, and atmosphere is just the author\'s \'attitude\'.' },
                { id: 'b', prompt: 'In the paragraph describing the night sky, the author uses sentences of varying length: some long and flowing, others short and abrupt.', answer: 'Long sentences mimic the vastness/continuity of the cosmos',
                  options: ['Long sentences mimic the vastness/continuity of the cosmos', 'it makes it easier to read'],
                  hint: 'Review Class 10 descriptive writing (c10_engl_cbse_05_008) focusing on how landscape descriptions.',
                  misconception: 'Students believe setting in an essay is merely the author\'s biography or historical period, and atmosphere is just the author\'s \'attitude\'.' }
          ],
            remediations: { 'setting-in-an-essay-is': { steps: ['Have the student physically map the essay\'s \'locations\': draw a line for each paragraph labeling its conceptual setting.', 'Give them three coloured highlighters: one for sensory imagery, one for emotional vocabulary, one for sentence length.', 'Ask them to explain how the \'quantum realm\' paragraph uses short sentences to create tension, then long ones for.', 'Finally, have them rewrite one paragraph changing ONLY sentence lengths to invert the atmosphere (e.g., make wonder.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a non-fiction essay involves examining.',
          hint: 'Review "How to annotate an essay for character traits" — practice highlighting every.',
          misconception: 'Students often think \'character analysis\' only applies to fictional characters in stories, so they either say "there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in a non-fiction essay involves examining the',
                  options: ['Character analysis of the protagonist in a non-fiction essay involves examining the', 'This node establishes the essential historical, cultural, and literary context required', 'Plot and narrative structure in a non-fiction essay refers to the organizational', 'Setting in an essay refers to the temporal, spatial, and intellectual context that frames'],
                  hint: 'Review "How to annotate an essay for character traits" — practice highlighting every description.',
                  misconception: 'Students often think \'character analysis\' only applies to fictional characters in stories, so they either say "there is no protagonist.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If the student cannot identify the collective protagonist, guide them to the opening paragraph: "The roots of India\'s.', 'Who is the subject of the whole essay?" Then have them highlight every plural pronoun (they, their) in the.', 'Finally, model grouping those predicates into 4-5 thematic clusters (worldview, time, imagination, language, art).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in a non-fiction essay involves.',
          hint: 'If stuck, review c11_eng_w_cbse_24_004 (Character Analysis: Protagonist) and practice.',
          misconception: 'Students often believe "character analysis" only applies to fictional stories with named protagonists.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters in a non-fiction essay involves identifying',
                  options: ['Character analysis of supporting characters in a non-fiction essay involves identifying', 'This node establishes the essential historical, cultural, and literary context required', 'Plot and narrative structure in a non-fiction essay refers to the organizational', 'Setting in an essay refers to the temporal, spatial, and intellectual context that frames'],
                  hint: 'If stuck, review c11_eng_w_cbse_24_004 (Character Analysis: Protagonist) and practice identifying.',
                  misconception: 'Students often believe "character analysis" only applies to fictional stories with named protagonists.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['If a student cannot identify supporting characters in the essay, do these steps: (1) Give them a highlighter and ask.', '(2) For each highlighted name, ask: "What paragraph is this in?', 'What is Devy saying *right there*?" (3) Have them complete a two-column table: Column A = Name, Column B = What idea.', '(4) Model one row together: "Munda song → proves tribal worldview differs from mainstream (girl child valued)." This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_006', difficulty: 'standard',
          question: 'The primary theme of "Science and the Sense of Wonder" is the harmonious.',
          hint: 'Review "Identifying the Central Argument in Non-Fiction" from Class 10.',
          misconception: 'Students often believe Asimov argues that "science explains everything, so there\'s no mystery left." This is the *exact.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of "Science and the Sense of Wonder" is the harmonious relationship',
                  options: ['The primary theme of "Science and the Sense of Wonder" is the harmonious relationship', 'This node establishes the essential historical, cultural, and literary context required', 'Plot and narrative structure in a non-fiction essay refers to the organizational', 'Setting in an essay refers to the temporal, spatial, and intellectual context that frames'],
                  hint: 'Review "Identifying the Central Argument in Non-Fiction" from Class 10 (c10_engl_cbse_02_008.',
                  misconception: 'Students often believe Asimov argues that "science explains everything, so there\'s no mystery left." This is the *exact opposite* of his.' }
          ],
            remediations: { 'asimov-argues-that-science-explains': { steps: ['Ask the student to reread the paragraph where Asimov describes his childhood wonder at the stars vs.', 'Have them list: (a) what he wondered as a child, (b) what he knows now, (c) which wonder is "greater" according to the.', 'Guide them to see that (b) *includes* and *expands* (a) – the adult wonder encompasses the child\'s but adds cosmic.', 'Assign a 2-minute freewrite: "Describe something you understand scientifically that now seems *more* amazing, not less."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
