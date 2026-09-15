import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p2',
    title: 'tSusanz dekj · Part 2/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'tSusanz dekj · Part 2/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_007', 'c11_hin_ar_cbse_10_008', 'c11_hin_ar_cbse_10_009', 'c11_hin_ar_cbse_10_010', 'c11_hin_ar_cbse_10_011', 'c11_hin_ar_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, social concerns, and philosophical dimensions that run parallel to the primary theme of devotion in a literary work, enriching the text by revealing the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to a bhajan at a temple and suddenly realize the singer isn\'t just praising God — she\'s also quietly questioning why women can\'t.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subsidiary idea that runs parallel to the primary theme, adding', outcome: 'A secondary theme is a subsidiary idea that runs parallel to the primary theme, adding depth and.' },
                { text: 'minor topics', outcome: 'Not quite — Students often believe secondary themes are "less important" than the primary theme and can.', reveals: 'secondary-themes-are-less-important' },
                { text: 'subplots', outcome: 'Not quite — Students often believe secondary themes are "less important" than the primary theme and can.', reveals: 'secondary-themes-are-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a poem and stumble on the word "dkfu" – you don\'t know it, but the line says "laru f<x cSfB&cSfB] yksd&ykt [kks;h".',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of a key word in a poem when a dictionary definition is insufficient?', options: [
                { text: 'The primary strategy is to analyze the immediate linguistic context (surrounding words,', outcome: 'The primary strategy is to analyze the immediate linguistic context (surrounding words, syntax) and.' },
                { text: 'look it up in a dictionary', outcome: 'Not quite — Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk").', reveals: 'the-glossary-meanings-provided-in' },
                { text: 'dkfu = e;kZnk', outcome: 'Not quite — Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk").', reveals: 'the-glossary-meanings-provided-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading Meerabai\'s poem and stumble on words like "fxjèkj", "lhafp&lhafp", or "dkf<+" that don\'t follow modern Hindi grammar rules.',
            decisions: [{ prompt: 'What is the name of the literary dialect used by Meerabai in her poetry, and which modern Hindi region does it historically belong to?', options: [
                { text: 'The dialect is Braj Bhasha, historically spoken in the Braj region (Mathura-Vrindavan', outcome: 'The dialect is Braj Bhasha, historically spoken in the Braj region (Mathura-Vrindavan area).' },
                { text: 'Awadhi', outcome: 'Not quite — Students treat Braj Bhasha forms as "incorrect" or "corrupted" modern Hindi rather than.', reveals: 'students-treat-braj-bhasha-forms' },
                { text: 'Khari Boli', outcome: 'Not quite — Students treat Braj Bhasha forms as "incorrect" or "corrupted" modern Hindi rather than.', reveals: 'students-treat-braj-bhasha-forms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see a question: "Why does Kabir say \'no one knows my address\'?" You panic because the poem doesn\'t directly say.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal comprehension question has its answer directly stated in the text, while an', outcome: 'A literal comprehension question has its answer directly stated in the text, while an inferential.' },
                { text: 'literal questions are easy, inferential are hard', outcome: 'Not quite — Students often think inferential questions are "opinion questions" where any answer is acceptable.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students often think inferential questions are "opinion questions" where any answer is acceptable.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'What comes next? tSusanz dekj · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — tSusanz dekj · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, social concerns, and philosophical.',
          hint: 'If stuck, review the primary theme of "prem-bhakti as total surrender to Krishna" (node.',
          misconception: 'Students often believe secondary themes are "less important" than the primary theme and can be listed as separate.',
          parts: [
                { id: 'a', prompt: 'In the biographical note (page 113), the text states Meera "ges\'kk fojksèk fd;k" (broke social customs) regarding intercaste dining and purdah.', answer: 'Meera\'s real-life defiance of caste and gender norms becomes a secondary theme',
                  options: ['Meera\'s real-life defiance of caste and gender norms becomes a secondary theme', 'background information', 'less important'],
                  hint: 'If stuck, review the primary theme of "prem-bhakti as total surrender to Krishna" (node 006) and.',
                  misconception: 'Students often believe secondary themes are "less important" than the primary theme and can be listed as separate bullet points (e.g.' },
                { id: 'b', prompt: 'Apply the concept of secondary themes to the first stanza of the poem.', answer: 'Step 1: Identify "fxjèkj" (line 1)',
                  options: ['Step 1: Identify "fxjèkj" (line 1)', 'less important'],
                  hint: 'If stuck, review the primary theme of "prem-bhakti as total surrender to Krishna" (node 006) and.',
                  misconception: 'Students often believe secondary themes are "less important" than the primary theme and can be listed as separate bullet points (e.g.' }
          ],
            remediations: { 'secondary-themes-are-less-important': { steps: ['If the student cannot integrate secondary themes with the primary theme: Step 1 — Have them re-read the biographical.', 'Step 2 — Ask: "If Meera had obeyed every social rule, would her Krishna-bhakti be the same?" Guide them to see that her.', 'Step 3 — Give a mini-writing task: "Rewrite the first stanza as if Meera were a compliant Rajput princess.', 'What disappears?" The comparison will reveal that the secondary themes are the poem\'s engine, not its decoration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe secondary themes are "less important" than the primary theme and can be listed as separate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Meera Bai\'s secondary themes of social reform are merely incidental to her primary theme of devotion; the poetry would remain unchanged.', answer: 'Refute',
                  options: ['Refute', 'less important'],
                  hint: 'If stuck, review the primary theme of "prem-bhakti as total surrender to Krishna" (node 006) and.',
                  misconception: 'Students often believe secondary themes are "less important" than the primary theme and can be listed as separate bullet points (e.g.' }
          ],
            remediations: { 'secondary-themes-are-less-important': { steps: ['If the student cannot integrate secondary themes with the primary theme: Step 1 — Have them re-read the biographical.', 'Step 2 — Ask: "If Meera had obeyed every social rule, would her Krishna-bhakti be the same?" Guide them to see that her.', 'Step 3 — Give a mini-writing task: "Rewrite the first stanza as if Meera were a compliant Rajput princess.', 'What disappears?" The comparison will reveal that the secondary themes are the poem\'s engine, not its decoration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
          hint: 'Review the definitions of imagery and metaphor with simple examples (e.g., "The classroom.',
          misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid and descriptive language that appeals to the senses (sight,',
                  options: ['Imagery is the use of vivid and descriptive language that appeals to the senses (sight,', 'Context and background refer to the historical, social, cultural, and biographical', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the spatial, temporal, and emotional backdrop against'],
                  hint: 'Review the definitions of imagery and metaphor with simple examples (e.g., "The classroom was.',
                  misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.' }
          ],
            remediations: { 'any-descriptive-word-in-the': { steps: ['Ask the student to list all weaving-related words in the poem (loom, shuttle, thread, cloth, weaver).', 'For each word, have them decide: is it used literally (describing the actual craft) or figuratively (representing.', 'Guide them to see that words like "शटल" (shuttle) are literal in the first stanza but become metaphorical for "breath".', 'Practice with a simpler poem where the metaphor is more explicit (e.g., "Time is a river") before returning to Kabir.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_009', difficulty: 'standard',
          question: 'Irony in Kabir\'s poetry is the deliberate contrast between surface meaning and.',
          hint: 'If stuck, review c11_hin_ar_cbse_10_006 (Theme: Primary Theme) — specifically the concept.',
          misconception: 'Students often confuse Kabir\'s *paradoxes* with *irony* — they label every contradictory statement as "irony" without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in Kabir\'s poetry is the deliberate contrast between surface meaning and deeper',
                  options: ['Irony in Kabir\'s poetry is the deliberate contrast between surface meaning and deeper', 'Context and background refer to the historical, social, cultural, and biographical', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the spatial, temporal, and emotional backdrop against'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_006 (Theme: Primary Theme) — specifically the concept.',
                  misconception: 'Students often confuse Kabir\'s *paradoxes* with *irony* — they label every contradictory statement as "irony" without checking if there\'s.' }
          ],
            remediations: { 'students-often-confuse-kabir-s': { steps: ['Give the student three short Kabir lines — one paradox, one irony, one plain statement — and ask them to sort them.', 'For the irony, ask: "Who is being mocked here? What did they expect vs what happened?"', 'For symbols, give the same symbol (e.g., "charkha" / spinning wheel) in two different Kabir verses and ask: "Does.', 'Have them rewrite a non-ironic line into an ironic one by adding a hypocritical speaker.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck, review the concept of "context clues" from Class 10 Hindi (or English) and.',
          misconception: 'Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk") are the only meanings.',
          parts: [
                { id: 'a', prompt: 'In the line "valqou ty lhafp&lhafp] izse&csfy cks;h", the word "csfy" is glossed as "izse dh csy".', answer: 'The compound "izse&csfy" (evening-shadow) evokes a specific visual and temporal',
                  options: ['The compound "izse&csfy" (evening-shadow) evokes a specific visual and temporal', 'they mean the same thing', 'dkfu = e;kZnk', 'the glossary meanings provided in the textbook (e'],
                  hint: 'If stuck, review the concept of "context clues" from Class 10 Hindi (or English) and practice with.',
                  misconception: 'Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk") are the only meanings needed, and that the.' }
          ],
            remediations: { 'the-glossary-meanings-provided-in': { steps: ['Have the student read the stanza aloud three times, emphasizing the key word each time.', 'Ask: "What images, sounds, or feelings come to mind when you hear this word in this line?" 3.', 'Together, list all words in the stanza that relate to the key word (e.g., for "dkfu": yksd, ykt, [kks;h).', 'Guide the student to write a "word portrait": a 3-sentence description of the word\'s personality in this poem (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review c11_hin_ar_cbse_10_010 (Vocabulary) for word meanings and.',
          misconception: 'Students treat Braj Bhasha forms as "incorrect" or "corrupted" modern Hindi rather than a rule-governed literary.',
          parts: [
                { id: 'a', prompt: 'Explain why Meerabai chose to compose in Braj Bhasha rather than Sanskrit, and how this choice relates to the Bhakti movement\'s core philosophy.', answer: 'Meerabai used Braj Bhasha',
                  options: ['Meerabai used Braj Bhasha', 'she didn\'t know Sanskrit', 'it was her mother tongue'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_010 (Vocabulary) for word meanings and c11_hin_ar_cbse_10_001.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect" or "corrupted" modern Hindi rather than a rule-governed literary dialect with its own.' },
                { id: 'b', prompt: 'In the line "vc r csfy iSQfy x;h] vk.kan&iQy gks;h", identify the verb forms "x;h" and "gks;h", state their modern Hindi equivalents, and name the grammatical.', answer: '"x;h" = "thī" (past habitual/feminine singular), "gks;h" = "huī" (past',
                  options: ['"x;h" = "thī" (past habitual/feminine singular), "gks;h" = "huī" (past', 'thā/thī'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_010 (Vocabulary) for word meanings and c11_hin_ar_cbse_10_001.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect" or "corrupted" modern Hindi rather than a rule-governed literary dialect with its own.' }
          ],
            remediations: { 'students-treat-braj-bhasha-forms': { steps: ['Create a three-column table: Column A = Braj form from poem (e.g., "x;h", "dkfu", "kau"), Column B = Modern Khari Boli.', 'Have the student fill it for 10 words from the poem.', 'Ask them to formulate one generalization per category (e.g., "Braj past habitual feminine ends in -ī like Khari Boli.', 'Finally, give a new Braj line and ask them to predict the Khari Boli translation using their generalizations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension questions ask for information explicitly stated in the.',
          hint: 'Review the vocabulary list (c11_hin_ar_cbse_10_010) and the plot summary.',
          misconception: 'Students often think inferential questions are "opinion questions" where any answer is acceptable.',
          parts: [
                { id: 'a', prompt: 'In the poem, Kabir says: "esjs rks fxjèkj xksiky] nwljks u dksbZ tk osQ flj eksj&eqoqQV] esjks ifr lksbZ".', answer: 'This is a literal question',
                  options: ['This is a literal question', 'opinion questions', 'inferential questions are "opinion questions" where any answer is acceptable'],
                  hint: 'Review the vocabulary list (c11_hin_ar_cbse_10_010) and the plot summary (c11_hin_ar_cbse_10_002).',
                  misconception: 'Students often think inferential questions are "opinion questions" where any answer is acceptable.' },
                { id: 'b', prompt: 'Compare the two questions: (a) "What does Kabir say about his birth?" (b) "Why does Kabir reject the label of a weaver (julaha)?" Analyze the cognitive demand.', answer: 'Question (a) is literal – the poem states "tUe % lu~ 1498] oqQM+dh xk¡o"',
                  options: ['Question (a) is literal – the poem states "tUe % lu~ 1498] oqQM+dh xk¡o"', 'opinion questions', 'inferential questions are "opinion questions" where any answer is acceptable'],
                  hint: 'Review the vocabulary list (c11_hin_ar_cbse_10_010) and the plot summary (c11_hin_ar_cbse_10_002).',
                  misconception: 'Students often think inferential questions are "opinion questions" where any answer is acceptable.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Give the student a short excerpt from the poem (2-3 lines) and ask them to write one literal and one inferential.', 'Have them swap with a partner and classify each other\'s questions.', 'For each inferential question, require the partner to underline the exact words in the excerpt that support the.', 'Debrief: highlight that if no words can be underlined, the inference is unsupported.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
