import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p3',
    title: 'gtkjh izlkn f}osnh · Part 3/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'gtkjh izlkn f}osnh · Part 3/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_013', 'c11_hin_ar_cbse_13_014', 'c11_hin_ar_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s components—such as imagery, tone, structure, and language—to interpret its deeper meanings, evaluate the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are sitting in a dimly lit room during a power cut—the darkness feels heavy, but you know it\'s temporary.',
            decisions: [{ prompt: 'What is the primary function of the repetition of the word "fpjkx" (curfew/section 144) in the first stanza of "lk;s esa /wi"?', options: [
                { text: 'The repetition of "fpjkx" first in a general sense ("for homes") and then in a specific,', outcome: 'The repetition of "fpjkx" first in a general sense ("for homes") and then in a specific, ironic.' },
                { text: 'it shows the poet likes the word', outcome: 'Not quite — Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the.', reveals: 'critical-analysis-means-finding-one' },
                { text: 'critical analysis', outcome: 'Not quite — Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the.', reveals: 'critical-analysis-means-finding-one' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall facing a 6-mark question: "How does Nagarjun use the metaphor of darkness and light to depict socio-political change?".',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for Hindi literature?', options: [
                { text: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation', outcome: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation (analysis.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe that "writing based on the chapter" means summarizing the poem stanza-by-stanza.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe that "writing based on the chapter" means summarizing the poem stanza-by-stanza.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, review the "Irony and Symbolism" node (c11_hin_ar_cbse_13_009) and re-read the.',
          misconception: 'Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the dark night.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s',
                  options: ['Critical thinking in literary analysis is the disciplined process of examining a text\'s', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, review the "Irony and Symbolism" node (c11_hin_ar_cbse_13_009) and re-read the poem.',
                  misconception: 'Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the dark night = Emergency") and then.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['**Re-anchor to the text**: Ask the student to physically mark *three* specific words/phrases that create a tension.', '**Name the tension**: For each pair, have them complete the sentence: "On the surface X suggests ___, but the context.', '**Map to structure**: Draw a 3-box flow: Stanza 1 (Irony of Law) → Stanza 2 (Anatomy of Power) → Stanza 3 (Act.', 'Ask: "What changes in the *speaker\'s position* across these boxes?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the dark night.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Nagarjun\'s poem is merely a historical document about the 1975 Emergency; it has no relevance today." Defend your position using textual.', answer: 'The claim is false',
                  options: ['The claim is false', 'historical fallacy', 'critical analysis', 'the dark night = Emergency'],
                  hint: 'If stuck, review the "Irony and Symbolism" node (c11_hin_ar_cbse_13_009) and re-read the poem.',
                  misconception: 'Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the dark night = Emergency") and then.' },
                { id: 'b', prompt: 'Write a four-line stanza in Hindi (or English) that uses *irony* and *repetition* to critique a modern form of "curfew" (e.g., digital shutdown, surveillance.', answer: 'Example: "dgk¡ rks r',
                  options: ['Example: "dgk¡ rks r', 'critical analysis', 'the dark night = Emergency', '"critical analysis" means finding *one* hidden symbolic meaning (e'],
                  hint: 'If stuck, review the "Irony and Symbolism" node (c11_hin_ar_cbse_13_009) and re-read the poem.',
                  misconception: 'Students often believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "the dark night = Emergency") and then.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['**Re-anchor to the text**: Ask the student to physically mark *three* specific words/phrases that create a tension.', '**Name the tension**: For each pair, have them complete the sentence: "On the surface X suggests ___, but the context.', '**Map to structure**: Draw a 3-box flow: Stanza 1 (Irony of Law) → Stanza 2 (Anatomy of Power) → Stanza 3 (Act.', 'Ask: "What changes in the *speaker\'s position* across these boxes?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "lk;s esa /wi" refers to the ability.',
          hint: 'Review c11_hin_ar_cbse_13_008 (Imagery and Metaphor) and c11_hin_ar_cbse_13_009 (Irony.',
          misconception: 'Students believe that "writing based on the chapter" means summarizing the poem stanza-by-stanza in their own words.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for Hindi literature?', answer: 'PEEL stands for Point (main argument), Evidence (textual reference), Explanation',
                  options: ['PEEL stands for Point (main argument), Evidence (textual reference), Explanation', 'Paragraph, Example, Explain, Line', 'writing based on the chapter'],
                  hint: 'Review c11_hin_ar_cbse_13_008 (Imagery and Metaphor) and c11_hin_ar_cbse_13_009 (Irony and.',
                  misconception: 'Students believe that "writing based on the chapter" means summarizing the poem stanza-by-stanza in their own words.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student submits a summary instead of analysis: (1) Return the answer with each sentence labeled "Retell".', '(2) Give them a 3-sentence template: "The poet uses [device] in [line/stanza] to show [theme].', 'This [device] works by [mechanism].', 'This connects to the central idea of [theme] because [reason]." (3) Have them rewrite ONE paragraph using only this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'यदि अटके: c11_hin_ar_cbse_13_008 (Literary Devices: Imagery and Metaphor) पर लौटकर.',
          misconception: '**विशिष्ट भ्रांति:** "चर्चा बिंदुओं (discussion points) का अर्थ है कविता के प्रश्नों के उत्तर याद करके बोल देना।" **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral competency where',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral competency where', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_13_008 (Literary Devices: Imagery and Metaphor) पर लौटकर \'फाटक\', \'मेज\'.',
                  misconception: '**विशिष्ट भ्रांति:** "चर्चा बिंदुओं (discussion points) का अर्थ है कविता के प्रश्नों के उत्तर याद करके बोल देना।" **गलत तर्क:** छात्र समझते.' }
          ],
            remediations: { 'discussion-points-speaking-skill-theme': { steps: ['**लक्षित उपचार (3 चरण):** 1.', '**मौन पाठ → मौखिक टिप्पणी:** छात्र को कविता का एक पद देकर कहें: "इसे पढ़ो और **एक वाक्य** में बोलो कि इस पद में \'रेखा\'.', '**सुनकर जवाब देना:** शिक्षक एक दावा बोले ("दूसरे पद में \'मेज\' सत्ता की मेज है"), छात्र **केवल** "सहमत/असहमत.', '**त्रिकोणीय चर्चा:** तीन छात्र — एक **दावा** करे, दूसरा **प्रतिदावा** करे, तीसरा **संश्लेषण** (synthesis) करे। हर चरण.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
