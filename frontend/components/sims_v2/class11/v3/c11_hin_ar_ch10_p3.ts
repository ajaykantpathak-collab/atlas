import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 10 · Part 3/3',
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
        { title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आरोह भाग-1 — पाठ 10\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — आलोचनात्मक', 'पाठ 10 — लेखन', 'पाठ 10 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_013', title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 10\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary difference between *literal comprehension* and *critical interpretation* of a literary text?', options: [
                { text: 'Literal comprehension retrieves facts explicitly stated in the text (who, what, where),', outcome: 'Literal comprehension retrieves facts explicitly stated in the text (who, what, where), while.' },
                { text: 'personal opinion', outcome: 'Not quite — Students often believe "critical interpretation" means expressing any personal feeling about the.', reveals: 'critical-interpretation-means-expressing-any' },
                { text: 'critical interpretation', outcome: 'Not quite — Students often believe "critical interpretation" means expressing any personal feeling about the.', reveals: 'critical-interpretation-means-expressing-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_015', title: 'पाठ 10 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 10\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
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
          question: '\'आरोह भाग-1 — पाठ 10\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
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
          question: '\'आरोह भाग-1 — पाठ 10\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_10_013 (आलोचनात्मक चिंतन)** और **c11_hin_ar_cbse_10_006.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ के **महत्वपूर्ण शब्द/वाक्य उद्धृत (Quote) कर देना ही पर्याप्त Evidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'आरोह भाग-1 — पाठ 10\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_10_013 (आलोचनात्मक चिंतन)** और **c11_hin_ar_cbse_10_006 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ के **महत्वपूर्ण शब्द/वाक्य उद्धृत (Quote) कर देना ही पर्याप्त Evidence है।**" **गलत तर्क:**.' }
          ],
            remediations: { 'quote-evidence': { steps: ['**चरण 1:** छात्र से कहें — "अपना लिखा उत्तर पढ़ो और हर वाक्य के आगे लिखो: यह Point है / Evidence है / Explanation है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_015', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
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
