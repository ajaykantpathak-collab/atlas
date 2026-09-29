import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch24_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch24_p3: SimDef = {
    id: 'v3_c11_eng_w_ch24_p3',
    title: 'Science and the Sense of Wonder (Essay) · Part 3/3',
    subtitle: 'See why explained light is more wonderful, not less.',
    classLevel: 11, subject: 'eng_w', topic: 'Science and the Sense of Wonder (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch24'],
    nodeIds: ['c11_eng_w_cbse_24_013', 'c11_eng_w_cbse_24_014', 'c11_eng_w_cbse_24_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader defending wonder against the \'science kills magic\' charge', intro: 'A star is \'just\' a nuclear furnace millions of kilometres away — Asimov asks how that could possibly make it less wondrous.', goal: 'Evaluate Asimov\'s argument that scientific understanding deepens rather than exhausts wonder.' },
    discovery: {
        question: 'A friend says learning the optics of a rainbow \'kills the magic.\' What is Asimov\'s actual position?',
        options: ['Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition', 'Agreed — explanation drains mystery permanently', 'Wonder and knowledge are enemies that must be kept apart', 'Science explains everything, so wonder is finished'],
        answer: 'Understanding multiplies wonder — now you see photons dancing in droplets and a spectrum that reveals the sun\'s composition',
        hook: 'Asimov\'s claim is the inverse of the cliché — each breakthrough opens vistas of wonder the uninformed can\'t even reach.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Tribal Verse\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_24_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Test Asimov\'s thesis against the star and rainbow examples, then evaluate the claim that scientific literacy is a prerequisite for deep wonder.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Tribal Verse\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'State the central thesis of \'Science and the Sense of Wonder\' in one sentence.', options: [
                { text: 'The central thesis is that scientific understanding does not diminish wonder but rather', outcome: 'The central thesis is that scientific understanding does not diminish wonder but rather deepens and.' },
                { text: '\'critical analysis\' means criticizing or finding faults in the essay', outcome: 'Not quite — Students often believe \'critical analysis\' means criticizing or finding faults in the essay.', reveals: 'critical-analysis-means-criticizing-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Tribal Verse\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure for writing an analytical paragraph, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (a direct quote or', outcome: 'PEEL stands for Point (topic sentence stating the main idea), Evidence (a direct quote or precise.' },
                { text: 'Point, Example, Explanation, Language', outcome: 'Not quite — Students believe writing about literature means paraphrasing the story or essay content.', reveals: 'writing-about-literature-means-paraphrasing' },
                { text: 'writing about literature means paraphrasing the story or essay content', outcome: 'Not quite — Students believe writing about literature means paraphrasing the story or essay content.', reveals: 'writing-about-literature-means-paraphrasing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Tribal Verse\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the four discussion topics listed under "Talking About the Text" in the chapter "Tribal Verse"?', options: [
                { text: 'The four topics are: (1) modifying the established notion of literature as something', outcome: 'The four topics are: (1) modifying the established notion of literature as something written, (2).' },
                { text: 'Understanding the Text', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions ("I feel tribal art is beautiful") rather.', reveals: 'students-treat-discussion-as-sharing' },
                { text: 'Talking About the Text', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions ("I feel tribal art is beautiful") rather.', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class must curate a \'Literature of India\' exhibition. A classmate vetoes the tribal songs section: \'The Munda and Kondh songs have no named poet and weren\'t even written down — they\'re folklore, not literature. The printed translations can\'t be the real thing.\'',
            decisions: [{ prompt: 'How do you argue for including them?', options: [
                { text: 'Make Devy\'s argument your own: orality isn\'t pre-literature, it\'s literature in its most resilient form — communities like the Munda, Kondh and Adi have carried songs for birth, death, healing and harvest for centuries without scripts. Tribal creativity works within strict conventions, \'adhering to the past while slightly subverting it.\' The veto itself is the print-culture bias the chapter exists to dismantle.', outcome: 'The section stays: the classmate\'s objection — no author, no fixed text — is precisely the assumption Devy exposes as bias.' },
                { text: 'Accept the veto — without a written original and a named poet, the songs are raw material, not literature.', outcome: 'That equates literature with print and authorship — the very bias that erased a massive share of Indian literature from syllabi.', reveals: 'oral-is-not-literature' },
                { text: 'Include them but label the display \'primitive folklore from India\'s tribal past\' to be accurate.', outcome: 'Framing them as a vanished past is doubly wrong: these are living cultures, and \'primitive\' repeats the hierarchy the essay argues against.', reveals: 'tribal-verse-is-primitive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_24_015', title: 'You made it',
          caseStudy: { intro: 'Wonder isn\'t built on ignorance — \'isn\'t it pretty?\' is the shallow end; \'isn\'t it astonishing that...?\' is where science swims.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_013', difficulty: 'standard',
          question: 'Critical thinking on \'Tribal Verse\' — analysing the text to reach.',
          hint: 'If stuck, review c11_eng_w_cbse_24_006 (Theme: Primary Theme) and c11_eng_w_cbse_24_012.',
          misconception: 'Students often believe \'critical analysis\' means criticizing or finding faults in the essay.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author argues that the \'sense of wonder\' is not the exclusive property of the unscientific mind.', answer: 'The author contends that wonder arises from confronting the unknown, and science',
                  options: ['The author contends that wonder arises from confronting the unknown, and science', '\'critical analysis\' means criticizing or finding faults in the essay'],
                  hint: 'If stuck, review c11_eng_w_cbse_24_006 (Theme: Primary Theme) and c11_eng_w_cbse_24_012.',
                  misconception: 'Students often believe \'critical analysis\' means criticizing or finding faults in the essay.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-or': { steps: ['Ask the student to underline every claim the author makes in the first three paragraphs.', 'For each claim, have them write \'Evidence from text:\' and quote the supporting sentence.', 'Ask: \'Does the author address counterarguments? Where?\'', 'Only after this evidence-mapping do they write their evaluation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe \'critical analysis\' means criticizing or finding faults in the essay.',
          parts: [
                { id: 'a', prompt: 'Evaluate the strength of the author\'s argument that \'pseudo-science and superstition offer cheap wonder, while science offers earned wonder.\' What evidence.', answer: 'The argument is strong',
                  options: ['The argument is strong', '\'critical analysis\' means criticizing or finding faults in the essay'],
                  hint: 'If stuck, review c11_eng_w_cbse_24_006 (Theme: Primary Theme) and c11_eng_w_cbse_24_012.',
                  misconception: 'Students often believe \'critical analysis\' means criticizing or finding faults in the essay.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-or': { steps: ['Ask the student to underline every claim the author makes in the first three paragraphs.', 'For each claim, have them write \'Evidence from text:\' and quote the supporting sentence.', 'Ask: \'Does the author address counterarguments? Where?\'', 'Only after this evidence-mapping do they write their evaluation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_014', difficulty: 'standard',
          question: 'Writing skills from \'Tribal Verse\' — using the text as a model or springboard.',
          hint: 'If stuck, review the "Understanding the Text" questions in the textbook and practice.',
          misconception: 'Students believe writing about literature means paraphrasing the story or essay content.',
          parts: [
                { id: 'a', prompt: 'Given the prompt "Analyze the symbolism of the cowshed in the Munda Song," write a PEEL paragraph using evidence from the text.', answer: 'Point: The cowshed symbolizes the Munda tribe\'s ecological worldview and gender',
                  options: ['Point: The cowshed symbolizes the Munda tribe\'s ecological worldview and gender', 'writing about literature means paraphrasing the story or essay content'],
                  hint: 'If stuck, review the "Understanding the Text" questions in the textbook and practice turning each.',
                  misconception: 'Students believe writing about literature means paraphrasing the story or essay content.' }
          ],
            remediations: { 'writing-about-literature-means-paraphrasing': { steps: ['If a student submits a summary instead of analysis: 1) Highlight every sentence in their answer and label it \'Fact\'.', '2) Show them that only \'Analysis\' sentences earn marks.', '3) Give them a template: "Devy uses [example] to prove that [argument]." 4) Practice with one song: "The Munda song.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_24_015', difficulty: 'standard',
          question: 'Discussion points on \'Tribal Verse\' — speaking and listening around the text.',
          hint: 'If stuck, review the "Introduction to Painted Words" section (pages 162-168) and the.',
          misconception: 'Students treat "discussion" as sharing personal opinions ("I feel tribal art is beautiful") rather than as textual.',
          parts: [
                { id: 'a', prompt: 'Using the Munda song and Devy\'s essay, prepare two talking points for the discussion: "Tribal arts are not specifically meant for sale.', answer: 'Help: The Munda song is performed at birth rituals, not for an audience',
                  options: ['Help: The Munda song is performed at birth rituals, not for an audience', 'art needs money', 'Talking About the Text', 'not for sale'],
                  hint: 'If stuck, review the "Introduction to Painted Words" section (pages 162-168) and the notes on the.',
                  misconception: 'Students treat "discussion" as sharing personal opinions ("I feel tribal art is beautiful") rather than as textual analysis ("Devy says.' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['If a student offers only opinions, interrupt gently: "That\'s an interesting view — now, where in the text does Devy.', 'Ask them to read it aloud, then ask: "What word shows the artist\'s relationship to the community?" (Answer: "patronage".', 'Guide them to convert the quote into a talking point: "Because there\'s no competition, the art stays relaxed — but does.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
