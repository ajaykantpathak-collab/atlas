import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p2',
    title: 'gtkjh izlkn f}osnh · Part 2/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'gtkjh izlkn f}osnh · Part 2/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_007', 'c11_hin_ar_cbse_13_008', 'c11_hin_ar_cbse_13_009', 'c11_hin_ar_cbse_13_010', 'c11_hin_ar_cbse_13_011', 'c11_hin_ar_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement the primary theme by exploring specific social, psychological, or moral dimensions through recurring motifs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a news report about children working in a factory instead of going to school — you feel angry, but can you explain *why* it\'s wrong.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of function and scope?', options: [
                { text: 'A secondary theme is a supporting idea that explores a specific dimension of the primary', outcome: 'A secondary theme is a supporting idea that explores a specific dimension of the primary theme.' },
                { text: 'other topics mentioned in the poem', outcome: 'Not quite — Students believe secondary themes are simply "other topics mentioned in the poem" and list them.', reveals: 'secondary-themes-are-simply-other' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you see a signboard outside a government office saying "Public Service Centre" but the gates are locked and the peon demands a bribe to let you in.',
            decisions: [{ prompt: 'Define \'situational irony\' and \'symbol\' in your own words, giving one generic example for each (not from the poem).', options: [
                { text: '**Correct Answer:** Situational irony occurs when the actual outcome of a situation is', outcome: '**Correct Answer:** Situational irony occurs when the actual outcome of a situation is starkly.' },
                { text: 'something funny', outcome: 'Not quite — Students frequently conflate **irony** with **coincidence** or **misfortune**.', reveals: 'students-frequently-conflate-irony-with' },
                { text: 'sarcasm', outcome: 'Not quite — Students frequently conflate **irony** with **coincidence** or **misfortune**.', reveals: 'students-frequently-conflate-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Nagarjun\'s poem and stumble on the word "eqrebu" in the line "os eqrebu gSa fd iRFkj fi?ky ugha ldrk".',
            decisions: [{ prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a poem?', options: [
                { text: 'A dictionary definition provides a fixed, decontextualized meaning, while contextual', outcome: 'A dictionary definition provides a fixed, decontextualized meaning, while contextual meaning in.' },
                { text: 'they are the same', outcome: 'Not quite — Students often believe that \'vocabulary in context\' means simply replacing the poetic word with.', reveals: 'vocabulary-in-context-means-simply' },
                { text: 'e;Llj = miyC/', outcome: 'Not quite — Students often believe that \'vocabulary in context\' means simply replacing the poetic word with.', reveals: 'vocabulary-in-context-means-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'What comes next? gtkjh izlkn f}osnh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — gtkjh izlkn f}osnh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, review node 006 (Primary Theme) — specifically the worked example showing how.',
          misconception: 'Students believe secondary themes are simply "other topics mentioned in the poem" and list them like tags (poverty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, supporting ideas in a literary work that complement',
                  options: ['Secondary themes are the underlying, supporting ideas in a literary work that complement', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, review node 006 (Primary Theme) — specifically the worked example showing how the primary.',
                  misconception: 'Students believe secondary themes are simply "other topics mentioned in the poem" and list them like tags (poverty, hunger, law, childhood).' }
          ],
            remediations: { 'secondary-themes-are-simply-other': { steps: ['If a student cannot move beyond listing topics, do this 3-step remediation: (1) Give them the first stanza with "िे.', 'How does the *shift in agency* from victim to speaker to ruler build the theme of legal oppression?" This forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review Class 9-10 \'Figures of Speech\' chapter: practice converting 5 similes into.',
          misconception: 'Students often think imagery *only* means visual description (pictures in the mind) and overlook auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'Review Class 9-10 \'Figures of Speech\' chapter: practice converting 5 similes into metaphors and.',
                  misconception: 'Students often think imagery *only* means visual description (pictures in the mind) and overlook auditory, tactile, olfactory, and.' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Give the student a sensory inventory chart: list 5 senses across the top; have them find one phrase from the poem for.', 'Provide three pairs of sentences (one simile, one metaphor) and ask them to underline the comparative word (\'like/as\').', 'Ask: "If Lakshmi is a guest who *refuses* to enter, what does that metaphor say about wealth distribution?" Guide them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contradiction between appearance.',
          hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) and.',
          misconception: 'Students frequently conflate **irony** with **coincidence** or **misfortune**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contradiction between appearance and reality,',
                  options: ['Irony is a literary device where there is a contradiction between appearance and reality,', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (c11_hin_ar_cbse_13_002) and "Theme.',
                  misconception: 'Students frequently conflate **irony** with **coincidence** or **misfortune**.' }
          ],
            remediations: { 'students-frequently-conflate-irony-with': { steps: ['**Isolate the Literal Level:** Ask the student to draw the physical scene of Stanza 1: a building, a sign "Mortuary".', 'Confirm they see the *literal* reality.', '**Name the Expected Function:** Ask: "What is this building *supposed* to be for?" (Dead bodies).', '**Name the Actual Function:** Ask: "What is it *actually* used for in the poem?" (Living humans\' shelter/food).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008.',
          misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from.',
          parts: [
                { id: 'a', prompt: 'Apply the context-clue strategy to determine the meaning of "csdjkj" in the line "u gks deh”k rks ik¡oksa ls isV <¡d ysaxs] ;s yksx fdrus equkflc gSa bl lI+kQj.', answer: 'Steps: 1) Locate "csdjkj"',
                  options: ['Steps: 1) Locate "csdjkj"', 'e;Llj = miyC/'],
                  hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008 using the.',
                  misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from the textbook\'s.' }
          ],
            remediations: { 'vocabulary-in-context-means-simply': { steps: ['Return to the poem and read only the lines containing the target word, ignoring the vocabulary box entirely.', 'Write a paraphrase of that stanza in your own simple Hindi without using the target word.', 'Compare your paraphrase with the textbook gloss — note where your version captures the emotion and where it falls flat.', 'Re-read the preface (page 131) where Nagarjun explains his intent: "jktuhfr vkSj lekt esa tks oqQN py jgk gS, mls.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The vocabulary list in the textbook (e;Llj, nj[r, eqrebu, csdjkj, fu”kke, ,gfr;kr, cgj, vlj) is sufficient for a complete understanding.', answer: 'The claim is false',
                  options: ['The claim is false', 'e;Llj = miyC/'],
                  hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008 using the.',
                  misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from the textbook\'s.' }
          ],
            remediations: { 'vocabulary-in-context-means-simply': { steps: ['Return to the poem and read only the lines containing the target word, ignoring the vocabulary box entirely.', 'Write a paraphrase of that stanza in your own simple Hindi without using the target word.', 'Compare your paraphrase with the textbook gloss — note where your version captures the emotion and where it falls flat.', 'Re-read the preface (page 131) where Nagarjun explains his intent: "jktuhfr vkSj lekt esa tks oqQN py jgk gS, mls.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review **Class 10 Hindi Vyakaran: Karak evam Kriya** (Case and Verb) chapters.',
          misconception: 'Students often conflate **\'grammatical analysis\'** with **\'literary device spotting\'**.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet uses the oblique case form "nj[rksa" (isM+) in the first line of stanza one instead of the direct case "nj[k", and what.', answer: '"nj[rksa" is the **oblique plural** form required',
                  options: ['"nj[rksa" is the **oblique plural** form required', 'it\'s direct case or subject'],
                  hint: 'If stuck, review **Class 10 Hindi Vyakaran: Karak evam Kriya** (Case and Verb) chapters, focusing.',
                  misconception: 'Students often conflate **\'grammatical analysis\'** with **\'literary device spotting\'**.' }
          ],
            remediations: { 'students-often-conflate-grammatical-analysis': { steps: ['**Isolate the syntax**: Take one troubling line (e.g., "rsjk fu”kke gS fly ns \'kqcku \'kk;j dh").', 'Write its **standard Hindi prose paraphrase** ("uska shasan us sukhi twig ke phal jaisa hai").', '**Map deviations**: List every difference: word order (SOV vs OSV), compound fusion ("fly ns \'kqcku \'kk;j" vs "fly.', '**Question each deviation**: "What is lost/gained by fusing \'fly ns\'?" (Loss of explicit possession, gain of inherent.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review Stanza-wise summary (c11_hin_ar_cbse_13_002) and Vocabulary in Context.',
          misconception: '**Misconception:** "Inferential questions have no right answer — any personal opinion is correct if you explain it.".',
          parts: [
                { id: 'a', prompt: 'Answer this literal question using only Stanza 1: "What command does the poet give to the fog, and what reason does he imply for it?" Quote the exact phrase.', answer: '**Step 1:** Identify keywords: "command" (order), "fog" (/wi), "Stanza 1"',
                  options: ['**Step 1:** Identify keywords: "command" (order), "fog" (/wi), "Stanza 1"', 'to clear the sun'],
                  hint: 'If stuck, review Stanza-wise summary (c11_hin_ar_cbse_13_002) and Vocabulary in Context.',
                  misconception: '**Misconception:** "Inferential questions have no right answer — any personal opinion is correct if you explain it." **Why it happens:**.' }
          ],
            remediations: { 'misconception-inferential-questions-have-no': { steps: ['** Show a literal Q&A pair from the poem (e.g., Q: "Where is the fog?" A: "In the courtyard" — highlight "nk[rksa osQ.', '** Present an inferential Q: "Why \'sitting\' not \'floating\'?" Model the **Evidence → Reasoning → Inference** chain.', '** Give a new stanza (e.g., Stanza 3). Ask student to highlight 2 clues, write 1 inference sentence using "This.', '** Reinforce mantra: **"Text says → I think → Because text shows."** No "I feel" without "Text shows."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
