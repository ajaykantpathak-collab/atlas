import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch06_p2: SimDef = {
    id: 'v3_c12_eng_k_ch06_p2',
    title: 'A Poem for Magic (Poem) · Part 2/3',
    subtitle: 'The lecture where shadows teach love\'s timetable',
    classLevel: 12, subject: 'eng_k', topic: 'A Poem for Magic (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch06'],
    nodeIds: ['c12_eng_k_cbse_06_007', 'c12_eng_k_cbse_06_008', 'c12_eng_k_cbse_06_009', 'c12_eng_k_cbse_06_010', 'c12_eng_k_cbse_06_011', 'c12_eng_k_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Metaphysical poetry reader', intro: 'A 17th-century poet grabs his beloved\'s hand and gives her a lecture — on shadows. It becomes a theory of love.', goal: 'Follow Donne\'s shadow conceit through love\'s stages and read metaphysical wit as argument.' },
    discovery: {
        question: 'Donne warns his lover that \'his first minute, after noone, is night.\' Every love song says noon is the peak — what does he see that they don\'t?',
        options: ['That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves', 'Nothing — noon is always safe', 'The sun sets, so love must end', 'He means literal nightfall'],
        answer: 'That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves',
        hook: 'Metaphysical poetry argues through conceits, not pretty comparisons: morning shadows are the disguises lovers \'ourselves produced\'; afternoon shadows fall inward, blinding the deceivers. It\'s called a Lecture — the shadow is the syllabus.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate but significant ideas that run alongside the primary theme in a literary work, enriching the central message by exploring related dimensions such as time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take Donne\'s three-hour walk: track the shadows from disguised morning through \'brave clearnesse\' to the afternoon when deceit turns inward — and decide if love can be \'full constant light.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a time-lapse video of a tree\'s shadow moving across a garden from dawn to dusk — the shadow changes length, direction, and clarity, but.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate but significant idea that supports, complicates, or', outcome: 'A secondary theme is a subordinate but significant idea that supports, complicates, or enriches the.' },
                { text: 'less important themes', outcome: 'Not quite — Students often treat secondary themes as a "list of other topics in the poem" (e.g., "time,".', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re standing outside at 7 AM, then at 12 PM, then at 4 PM — notice how your shadow stretches, shrinks, then stretches again in a different.',
            decisions: [{ prompt: 'What is the central extended metaphor in "A Lecture Upon the Shadow," and what two things are being compared?', options: [
                { text: 'The central extended metaphor compares the **changing shadows cast by the sun throughout', outcome: 'The central extended metaphor compares the **changing shadows cast by the sun throughout a day**.' },
                { text: 'love is a shadow', outcome: 'Not quite — **Misconception:** "Metaphor and imagery are just decorative language — the poet uses pretty words.', reveals: 'misconception-metaphor-and-imagery-are' },
                { text: 'shadows represent time', outcome: 'Not quite — **Misconception:** "Metaphor and imagery are just decorative language — the poet uses pretty words.', reveals: 'misconception-metaphor-and-imagery-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading the poem and notice the title promises a "Lecture Upon the Shadow" — but the speaker spends most of the time talking about love.',
            decisions: [{ prompt: 'What is the central symbol in "A Lecture Upon the Shadow" and what does it represent in the first stanza (morning)?', options: [
                { text: 'The central symbol is the **shadow**', outcome: 'The central symbol is the **shadow**. In the first stanza, the morning shadows — long, cast before.' },
                { text: 'shadows represent time', outcome: 'Not quite — Students frequently **conflate the shadow with love itself**, writing "the shadow symbolises love".', reveals: 'students-frequently-conflate-the-shadow' },
                { text: 'shadows represent death', outcome: 'Not quite — Students frequently **conflate the shadow with love itself**, writing "the shadow symbolises love".', reveals: 'students-frequently-conflate-the-shadow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you find a 400-year-old letter in your grandmother\'s attic — the spelling looks \'wrong\' (shoppe, olde, goode), there are no apostrophes in possessives.',
            decisions: [{ prompt: 'List the six words from Donne\'s poem that the NCERT Language Work box explicitly identifies as carrying a terminal \'-e\' no longer used.', options: [
                { text: 'The six words are: houres, shadowes, Sunne, noone, clearnesse, behinde', outcome: 'The six words are: houres, shadowes, Sunne, noone, clearnesse, behinde.' },
                { text: 'loves" or "doe', outcome: 'Not quite — Students treat archaic spellings (houres, shadowes) as \'typos\' or \'old-fashioned mistakes\' rather.', reveals: 'students-treat-archaic-spellings-houres' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re in the CBSE exam hall and the question reads: "What do the morning shadows represent in the poem?" The answer isn\'t directly written — you must.',
            decisions: [{ prompt: 'Define literal comprehension in your own words and give one example of a literal question from "A Lecture Upon the Shadow".', options: [
                { text: 'Literal comprehension involves extracting information directly stated in the text without', outcome: 'Literal comprehension involves extracting information directly stated in the text without.' },
                { text: 'It represents maturity', outcome: 'Not quite — Students believe inferential questions invite personal opinion ("I think the poet means...") and.', reveals: 'inferential-questions-invite-personal-opinion' },
                { text: 'I think the poet means', outcome: 'Not quite — Students believe inferential questions invite personal opinion ("I think the poet means...") and.', reveals: 'inferential-questions-invite-personal-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two co-founders courted each other with polished masks; now the startup struggles and each privately hides bad metrics \'to keep the other confident\'.',
            decisions: [{ prompt: 'What does Donne\'s shadow-lecture advise?', options: [
                { text: 'Drop the disguises — Donne\'s point is that love (or partnership) only stays at \'noon\' when shadows, the little deceits of courtship and decline, stop growing between the two.', outcome: 'Early \'infant\' disguises and late concealments are the same shadow at different hours; constancy needs daylight honesty.' },
                { text: 'Keep hiding — smooth confidence is what partnerships run on.', outcome: 'The poem argues exactly the reverse: managed appearances are shadows that lengthen until they blot out the thing itself.', reveals: 'disguise-maintains-love' },
                { text: 'Let it fade quietly — once the shadows start, decline is natural.', outcome: 'Donne\'s speaker fights decline with constancy; treating decay as destiny is surrender dressed as wisdom.', reveals: 'decline-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now follow a conceit as a logical machine, not decoration — the exact skill metaphysical poetry demands of a reader.',
            decisions: [{ prompt: 'What comes next? A Poem for Magic (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Poem for Magic (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate but significant ideas that run alongside.',
          hint: 'Revisit c12_eng_k_cbse_06_006 (Primary Theme) and map the poem\'s three stanzas to the.',
          misconception: 'Students often treat secondary themes as a "list of other topics in the poem" (e.g., "time," "shadows," "morning,".',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to this excerpt from a different poem: "The clock ticks loud in the empty room / Each second a nail in the coffin of noon.', answer: 'Secondary theme 1: **Time as an irreversible force**',
                  options: ['Secondary theme 1: **Time as an irreversible force**', 'clocks', 'shadows', 'identifies "clocks" and "shadows" as themes confuses *images* with *ideas*'],
                  hint: 'Revisit c12_eng_k_cbse_06_006 (Primary Theme) and map the poem\'s three stanzas to the three solar.',
                  misconception: 'Students often treat secondary themes as a "list of other topics in the poem" (e.g., "time," "shadows," "morning," "deception") rather than.' },
                { id: 'b', prompt: 'Compare how Donne uses the shadow metaphor in the first stanza ("Two shadowes went / Along with us, which we our selves produc\'d") versus the final couplet.', answer: 'In stanza 1, shadows are *produced by the lovers* ("we our selves produc\'d")',
                  options: ['In stanza 1, shadows are *produced by the lovers* ("we our selves produc\'d")', 'shadows become night', 'growing', 'ignores "growing" treats love as a fixed condition rather than a continuous act'],
                  hint: 'Revisit c12_eng_k_cbse_06_006 (Primary Theme) and map the poem\'s three stanzas to the three solar.',
                  misconception: 'Students often treat secondary themes as a "list of other topics in the poem" (e.g., "time," "shadows," "morning," "deception") rather than.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student cannot distinguish motif from theme: (1) Have them list 5 recurring images/words in the poem (shadow.', '(2) For each, ask: "What *idea* does this image make you think about?" — the answer is the *theme* (e.g., shadow → "the.', '(3) Have them complete this stem for three motifs: "Donne uses [motif] to explore the idea that [theme] because.', 'Remediation node: c11_eng_h_cbse_01_007 (Class 11 Theme: Secondary Themes) for foundational practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review Class 11 "The Voice of the Rain" (c11_eng_h_cbse_02_008) — trace how.',
          misconception: '**Misconception:** "Metaphor and imagery are just decorative language — the poet uses pretty words to describe love.".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet says "Stand still, and I will read to thee / A Lecture, Love, in love\'s philosophy" while observing shadows.', answer: 'The walking lovers *produce* the shadows that become the lecture\'s evidence',
                  options: ['The walking lovers *produce* the shadows that become the lecture\'s evidence', 'he\'s just setting the scene', 'it\'s a romantic walk', 'setting'],
                  hint: 'If stuck, review Class 11 "The Voice of the Rain" (c11_eng_h_cbse_02_008) — trace how rain\'s cycle.',
                  misconception: '**Misconception:** "Metaphor and imagery are just decorative language — the poet uses pretty words to describe love." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Analyze the shift at noon: "But, now the Sunne is just above our head, / We doe those shadowes tread; / And to brave clearnesse all things are reduc\'d." How.', answer: '**Imagery shift:** Morning = long shadows, disguise, horizontal extension',
                  options: ['**Imagery shift:** Morning = long shadows, disguise, horizontal extension', 'noon means love is perfect/happy'],
                  hint: 'If stuck, review Class 11 "The Voice of the Rain" (c11_eng_h_cbse_02_008) — trace how rain\'s cycle.',
                  misconception: '**Misconception:** "Metaphor and imagery are just decorative language — the poet uses pretty words to describe love." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-metaphor-and-imagery-are': { steps: ['**Revisit the metaphor\'s mechanics:** Draw a quick diagram — stick figure, sun at three positions (low, overhead, low.', 'Label: Morning = long shadow ahead; Noon = shadow under feet; Afternoon = long shadow behind.', '**Map each shadow to a love-stage** using the poem\'s exact phrases: "infant loves," "high\'st degree," "loves faint." 3.', '**Ask:** "What does the shadow *do* in each phase?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, return to the "vehicle vs. tenor" exercise in c12_eng_k_cbse_06_008 and.',
          misconception: 'Students frequently **conflate the shadow with love itself**, writing "the shadow symbolises love" or "the shadow.',
          parts: [
                { id: 'a', prompt: 'What is the central symbol in "A Lecture Upon the Shadow" and what does it represent in the first stanza (morning)?', answer: 'The central symbol is the **shadow**',
                  options: ['The central symbol is the **shadow**', 'shadows represent time', 'shadows represent death'],
                  hint: 'If stuck, return to the "vehicle vs. tenor" exercise in c12_eng_k_cbse_06_008 and practise on.',
                  misconception: 'Students frequently **conflate the shadow with love itself**, writing "the shadow symbolises love" or "the shadow is love." This.' },
                { id: 'b', prompt: 'In the second stanza, the sun is "just above our head" and "we doe those shadowes tread." Apply the symbol: what does this noon moment signify for the lovers\'.', answer: '**Noon signifies the peak of mutual transparency and "brave clearnesse"**',
                  options: ['**Noon signifies the peak of mutual transparency and "brave clearnesse"**', 'shadows disappear', '\'tis not so'],
                  hint: 'If stuck, return to the "vehicle vs. tenor" exercise in c12_eng_k_cbse_06_008 and practise on.',
                  misconception: 'Students frequently **conflate the shadow with love itself**, writing "the shadow symbolises love" or "the shadow is love." This.' }
          ],
            remediations: { 'students-frequently-conflate-the-shadow': { steps: ['**Re-read the poem physically**: stand up, use a lamp as the "sun," and walk toward/away from it at three "times.', 'Map each observation to a stanza.', '**Revisit node c12_eng_k_cbse_06_008 (Imagery and Metaphor)** — specifically the distinction between *vehicle* and.', 'The shadow is the vehicle; the tenor shifts across stanzas.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_010', difficulty: 'standard',
          question: 'Vocabulary in Context for "A Lecture Upon the Shadow" involves identifying and.',
          hint: 'If stuck, review the Language Work box on NCERT page 92 and practice with.',
          misconception: 'Students believe the extra *-e* in *houres, shadowes, Sunne* indicates a different pronunciation (e.g., two syllables.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context for "A Lecture Upon the Shadow" involves identifying and',
                  options: ['Vocabulary in Context for "A Lecture Upon the Shadow" involves identifying and', '"Before You Read: Context and Background" provides the essential historical,', 'In a metaphysical poem like Donne\'s "A Lecture Upon the Shadow", narrative structure', 'In poetry, **setting** refers to the temporal and spatial context established by the poet'],
                  hint: 'If stuck, review the Language Work box on NCERT page 92 and practice with c11_eng_h_cbse_06_010.',
                  misconception: 'Students believe the extra *-e* in *houres, shadowes, Sunne* indicates a different pronunciation (e.g., two syllables: *hour-es*).' }
          ],
            remediations: { 'the-extra-e-in-houres': { steps: ['Re-read the Language Work box in the NCERT (page 92) and underline the three explicit instructions: notice spellings.', 'Take a modern sentence (“The child’s toy”) and rewrite it in Donne’s style (*the childs toy*).', 'Pick any two adjectives from the poem (*diligent, false, westward*) and write their isolated meaning vs.', 'their meaning in the phrase.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_011', difficulty: 'standard',
          question: 'This node focuses on analysing archaic language features in John Donne\'s.',
          hint: 'If stuck on archaic semantics, review the concept of \'semantic shift\' using "brave" (OE.',
          misconception: 'Students treat archaic spellings (houres, shadowes) as \'typos\' or \'old-fashioned mistakes\' rather than systematic.',
          parts: [
                { id: 'a', prompt: 'List the six words from Donne\'s poem that the NCERT Language Work box explicitly identifies as carrying a terminal \'-e\' no longer used in modern spelling.', answer: 'The six words are: houres, shadowes, Sunne, noone, clearnesse, behinde',
                  options: ['The six words are: houres, shadowes, Sunne, noone, clearnesse, behinde', 'loves" or "doe'],
                  hint: 'If stuck on archaic semantics, review the concept of \'semantic shift\' using "brave" (OE *braf*.',
                  misconception: 'Students treat archaic spellings (houres, shadowes) as \'typos\' or \'old-fashioned mistakes\' rather than systematic conventions of Early.' }
          ],
            remediations: { 'students-treat-archaic-spellings-houres': { steps: ['Re-read the NCERT Language Work box (p. 92-93) and underline every word the textbook explicitly labels as archaic.', 'Create a three-column table: Archaic Form | Modern Equivalent | Reason for Change (e.g., houres → hours | terminal -e.', 'For possessives, find three more examples in the poem without apostrophes (e.g., "loves philosophy", "shadowes flow".', 'Re-attempt Diagnostic Questions 2 and 3. If still stuck, review c11_eng_h_cbse_01_011 (Class 11 Grammar: Language.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'Revisit c12_eng_k_cbse_06_002 (Plot and Narrative Structure) for the two-part timeline.',
          misconception: 'Students believe inferential questions invite personal opinion ("I think the poet means...") and don\'t require textual.',
          parts: [
                { id: 'a', prompt: 'Read these lines: "Stand still and I will read to thee / A Lecture, Love, in loves philosophy".', answer: 'The speaker addresses his beloved ("Love") and offers to read "A Lecture',
                  options: ['The speaker addresses his beloved ("Love") and offers to read "A Lecture', 'He is teaching a class about love', 'I think the poet means', 'inferential questions invite personal opinion ("I think the poet means'],
                  hint: 'Revisit c12_eng_k_cbse_06_002 (Plot and Narrative Structure) for the two-part timeline and.',
                  misconception: 'Students believe inferential questions invite personal opinion ("I think the poet means...") and don\'t require textual evidence.' },
                { id: 'b', prompt: 'Two students interpret the line "Love is a growing, or full constant light".', answer: 'Student B\'s interpretation is better supported',
                  options: ['Student B\'s interpretation is better supported', 'I think the poet means', 'inferential questions invite personal opinion ("I think the poet means'],
                  hint: 'Revisit c12_eng_k_cbse_06_002 (Plot and Narrative Structure) for the two-part timeline and.',
                  misconception: 'Students believe inferential questions invite personal opinion ("I think the poet means...") and don\'t require textual evidence.' }
          ],
            remediations: { 'inferential-questions-invite-personal-opinion': { steps: ['If a student cannot distinguish literal vs.', 'inferential or writes evidence-free inferences: 1) Take a familiar non-poem text (e.g., a news headline).', '2) Write one literal question (answer in text) and one inferential question (answer requires reasoning + text).', '3) Model PEEL for the inferential answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inferential questions invite personal opinion ("I think the poet means...") and don\'t require textual.',
          parts: [
                { id: 'a', prompt: 'A sample answer to "What is the poet\'s message to his beloved?" reads: "The poet tells his beloved that their love is like the sun and shadows.', answer: 'The answer is superficial (1/3 marks)',
                  options: ['The answer is superficial (1/3 marks)', 'I think the poet means', 'inferential questions invite personal opinion ("I think the poet means'],
                  hint: 'Revisit c12_eng_k_cbse_06_002 (Plot and Narrative Structure) for the two-part timeline and.',
                  misconception: 'Students believe inferential questions invite personal opinion ("I think the poet means...") and don\'t require textual evidence.' }
          ],
            remediations: { 'inferential-questions-invite-personal-opinion': { steps: ['If a student cannot distinguish literal vs.', 'inferential or writes evidence-free inferences: 1) Take a familiar non-poem text (e.g., a news headline).', '2) Write one literal question (answer in text) and one inferential question (answer requires reasoning + text).', '3) Model PEEL for the inferential answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
