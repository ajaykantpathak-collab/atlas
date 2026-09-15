import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p3',
    title: 'tSusanz dekj · Part 3/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'tSusanz dekj · Part 3/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_013', 'c11_hin_ar_cbse_10_014', 'c11_hin_ar_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text beyond its surface meaning to uncover underlying themes, evaluate the author\'s stylistic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are reading Raidas\'s poem and feel the words are beautiful but you cannot explain *why* they move you or what they truly say about society.',
            decisions: [{ prompt: 'What is the primary difference between *literal comprehension* and *critical interpretation* of a literary text?', options: [
                { text: 'Literal comprehension retrieves facts explicitly stated in the text (who, what, where),', outcome: 'Literal comprehension retrieves facts explicitly stated in the text (who, what, where), while.' },
                { text: 'personal opinion', outcome: 'Not quite — Students often believe "critical interpretation" means expressing any personal feeling about the.', reveals: 'critical-interpretation-means-expressing-any' },
                { text: 'critical interpretation', outcome: 'Not quite — Students often believe "critical interpretation" means expressing any personal feeling about the.', reveals: 'critical-interpretation-means-expressing-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and see this question: "Meera\'s poetry blends personal devotion with social rebellion.',
            decisions: [{ prompt: 'What is the PEEL structure for writing analytical answers in CBSE Class 11 Hindi, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation', outcome: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation (analysis.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *summarizing the poem in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'Explanation', outcome: 'Not quite — Students believe "writing skills based on the chapter" means *summarizing the poem in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle where the teacher asks, "Kabir says \'nwèk dh eFkfu;k¡ cM+s izse ls foyks;h\' – what does this burning away of rituals.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a Class 11 Hindi literature class when analyzing a poem like "ehjk"?', options: [
                { text: 'A discussion point is an interpretive question or observation grounded in a specific', outcome: 'A discussion point is an interpretive question or observation grounded in a specific textual detail.' },
                { text: 'When was Kabir born?', outcome: 'Not quite — Students believe a "good discussion" in Hindi literature means agreeing with the teacher\'s.', reveals: 'a-good-discussion-in-hindi' },
                { text: 'To summarize the poem', outcome: 'Not quite — Students believe a "good discussion" in Hindi literature means agreeing with the teacher\'s.', reveals: 'a-good-discussion-in-hindi' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'Review the metaphor and symbolism nodes (c11_hin_ar_cbse_10_008, c11_hin_ar_cbse_10_009).',
          misconception: 'Students often believe "critical interpretation" means expressing any personal feeling about the poem, or they think.',
          parts: [
                { id: 'a', prompt: 'In Raidas\'s poem, the line "valqou ty lhafp&lhafp] izse&csfy cks;h" (lake of love, shade of devotion) appears.', answer: 'The metaphor portrays divine love as a sustaining, cooling, and immersive refuge',
                  options: ['The metaphor portrays divine love as a sustaining, cooling, and immersive refuge', 'metaphor', 'critical interpretation', 'lake = love'],
                  hint: 'Review the metaphor and symbolism nodes (c11_hin_ar_cbse_10_008, c11_hin_ar_cbse_10_009) with focus.',
                  misconception: 'Students often believe "critical interpretation" means expressing any personal feeling about the poem, or they think identifying a metaphor.' },
                { id: 'b', prompt: 'Compare the use of *water imagery* in the first stanza ("izse dh xr izse tk.kS") and the second stanza ("valqou ty").', answer: 'In stanza one, water (rain/river) dissolves the ego ("izse dh xr izse tk.kS"',
                  options: ['In stanza one, water (rain/river) dissolves the ego ("izse dh xr izse tk.kS"', 'water symbols', 'critical interpretation', 'lake = love'],
                  hint: 'Review the metaphor and symbolism nodes (c11_hin_ar_cbse_10_008, c11_hin_ar_cbse_10_009) with focus.',
                  misconception: 'Students often believe "critical interpretation" means expressing any personal feeling about the poem, or they think identifying a metaphor.' }
          ],
            remediations: { 'critical-interpretation-means-expressing-any': { steps: ['Give the student a scaffolded template: "Raidas uses [device] in line [X] to compare [A] to [B].', 'This is significant because Raidas was a [caste/occupation], so [A] represents [lived experience].', 'By linking it to [B], he argues that [theme]." 2.', 'Practice with one stanza: have them fill the template for the "boat" metaphor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "critical interpretation" means expressing any personal feeling about the poem, or they think.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Raidas\'s poetry is primarily devotional; its social critique is merely a by-product." Defend or refute using at least two specific textual.', answer: 'Refute',
                  options: ['Refute', 'critical interpretation', 'lake = love', 'identifying a metaphor (e'],
                  hint: 'Review the metaphor and symbolism nodes (c11_hin_ar_cbse_10_008, c11_hin_ar_cbse_10_009) with focus.',
                  misconception: 'Students often believe "critical interpretation" means expressing any personal feeling about the poem, or they think identifying a metaphor.' }
          ],
            remediations: { 'critical-interpretation-means-expressing-any': { steps: ['Give the student a scaffolded template: "Raidas uses [device] in line [X] to compare [A] to [B].', 'This is significant because Raidas was a [caste/occupation], so [A] represents [lived experience].', 'By linking it to [B], he argues that [theme]." 2.', 'Practice with one stanza: have them fill the template for the "boat" metaphor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Meera Ke Pad" refers to the ability.',
          hint: 'If stuck, review c11_hin_ar_cbse_10_008 (Imagery and Metaphor) and c11_hin_ar_cbse_10_009.',
          misconception: 'Students believe "writing skills based on the chapter" means *summarizing the poem in their own words* or *memorizing.',
          parts: [
                { id: 'a', prompt: 'What is the PEEL structure for writing analytical answers in CBSE Class 11 Hindi, and what does each letter stand for?', answer: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation',
                  options: ['PEEL stands for Point (main argument), Evidence (textual reference), Explanation', 'Paragraph, Example, Explain, Line', 'Explanation', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_008 (Imagery and Metaphor) and c11_hin_ar_cbse_10_009 (Irony.',
                  misconception: 'Students believe "writing skills based on the chapter" means *summarizing the poem in their own words* or *memorizing a model answer*.' },
                { id: 'b', prompt: 'A student writes: "Meera loves Krishna very much. She says he is her husband. She suffers a lot but still loves him.', answer: 'The answer is a narrative summary, not an analytical response',
                  options: ['The answer is a narrative summary, not an analytical response', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_008 (Imagery and Metaphor) and c11_hin_ar_cbse_10_009 (Irony.',
                  misconception: 'Students believe "writing skills based on the chapter" means *summarizing the poem in their own words* or *memorizing a model answer*.' },
                { id: 'c', prompt: 'Using the PEEL framework, write a 4-sentence analytical paragraph responding to: "How does Meera use the metaphor of marriage in the first pad to express her.', answer: '**Point:** Meera redefines marriage as an exclusive spiritual bond with Krishna,',
                  options: ['**Point:** Meera redefines marriage as an exclusive spiritual bond with Krishna,', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_008 (Imagery and Metaphor) and c11_hin_ar_cbse_10_009 (Irony.',
                  misconception: 'Students believe "writing skills based on the chapter" means *summarizing the poem in their own words* or *memorizing a model answer*.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of analysis: (1) Return the answer with three highlighters — yellow for.', 'Ask: "Where is the green?" (2) Model the conversion: take their summary sentence "Meera suffers pain" → rewrite as "The.', 'Repeat until they can generate analytical language automatically.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the metaphor of \'inkoyh\' (weaving) in node c11_hin_ar_cbse_10_008.',
          misconception: 'Students believe a "good discussion" in Hindi literature means agreeing with the teacher\'s interpretation or the.',
          parts: [
                { id: 'a', prompt: 'In the poem "ehjk", the line \'valqou ty lhafp&lhafp] izse&csfy cks;h\' uses juxtaposition.', answer: 'The juxtaposition of \'valqou ty\' (calm, cool bank/shore) with \'lhafp&lhafp\'',
                  options: ['The juxtaposition of \'valqou ty\' (calm, cool bank/shore) with \'lhafp&lhafp\'', 'It shows the weather is hot and cold', 'good discussion'],
                  hint: 'If stuck, review the metaphor of \'inkoyh\' (weaving) in node c11_hin_ar_cbse_10_008 (Literary.',
                  misconception: 'Students believe a "good discussion" in Hindi literature means agreeing with the teacher\'s interpretation or the textbook\'s \'vH;kl\'.' },
                { id: 'b', prompt: 'Analyze how the poet\'s self-identification as a \'julaha\' (weaver) in the introductory prose shapes the *ethos* (credibility/authority) of the speaker in the.', answer: 'The prose introduction establishes Kabir\'s \'julaha\' identity as a lived reality:',
                  options: ['The prose introduction establishes Kabir\'s \'julaha\' identity as a lived reality:', 'good discussion'],
                  hint: 'If stuck, review the metaphor of \'inkoyh\' (weaving) in node c11_hin_ar_cbse_10_008 (Literary.',
                  misconception: 'Students believe a "good discussion" in Hindi literature means agreeing with the teacher\'s interpretation or the textbook\'s \'vH;kl\'.' }
          ],
            remediations: { 'a-good-discussion-in-hindi': { steps: ['**Interrupt the memorization loop:** Ask the student to put the textbook/guide away.', 'Give them a single printed stanza (e.g., stanza 2: \'valqou ty...\') and a blank paper.', '**Force textual anchoring:** Set a 5-minute timer: "Write three *genuine* questions this stanza raises for *you*.', 'No \'what does X mean?\', only \'why does the poet...?\' or \'what if...?\'." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
