import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch15_p2: SimDef = {
    id: 'v3_c11_eng_w_ch15_p2',
    title: 'Hawk Roosting (Poem) · Part 2/3',
    subtitle: 'Sit inside a predator\'s self-justifying logic and watch form become the cage.',
    classLevel: 11, subject: 'eng_w', topic: 'Hawk Roosting (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch15'],
    nodeIds: ['c11_eng_w_cbse_15_007', 'c11_eng_w_cbse_15_008', 'c11_eng_w_cbse_15_009', 'c11_eng_w_cbse_15_010', 'c11_eng_w_cbse_15_011', 'c11_eng_w_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader trapped in a tyrant\'s monologue', intro: 'A hawk roosts with eyes closed, rehearsing its absolute right over creation — and no poet interrupts to correct it.', goal: 'Read the dramatic monologue as ironic exposure and analyse its circular structure.' },
    discovery: {
        question: 'The hawk declares \'There is no sophistry in my body\' and \'I kill where all is mine.\' Is Hughes endorsing this voice?',
        options: ['No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear', 'Yes — the hawk speaks the poet\'s own creed', 'Yes — nature writing always celebrates the predator', 'No — but only because hawks can\'t actually talk'],
        answer: 'No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear',
        hook: 'No narrator mediates — you\'re locked inside a consciousness that feels no guilt, and that entrapment is the poem\'s point.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Hawk Roosting\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the stanza openings from \'I sit\' to \'Nothing has changed,\' and test whether the rigid quatrains are decoration or the cage the argument builds.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Hawk Roosting\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List two secondary themes present in "Hawk Roosting" other than the primary theme of the hawk\'s dominance.', options: [
                { text: 'Correct answer: (1) The illusion of absolute control/ownership over nature (e.g., "I hold', outcome: 'Correct answer: (1) The illusion of absolute control/ownership over nature (e.g., "I hold Creation.' },
                { text: 'imagery', outcome: 'Not quite — Students often treat "secondary themes" as just "less important themes" and list random topics like.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'metaphor', outcome: 'Not quite — Students often treat "secondary themes" as just "less important themes" and list random topics like.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Hawk Roosting\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "kinesthetic imagery" and give one example from *Hawk Roosting* (describe the line, do not quote the whole stanza).', options: [
                { text: 'Kinesthetic imagery evokes the sensation of movement, tension, or bodily position', outcome: 'Kinesthetic imagery evokes the sensation of movement, tension, or bodily position.' },
                { text: 'sun\'s ray', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "add-ons" — identifying them ("there is.', reveals: 'students-often-treat-imagery-and' },
                { text: 'physical sensation', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "add-ons" — identifying them ("there is.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Hawk Roosting\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism as literary devices. Give a one-sentence example of each from any text you have studied.', options: [
                { text: 'Irony is a contrast between expectation and reality, or between what is said and what is', outcome: 'Irony is a contrast between expectation and reality, or between what is said and what is meant.' },
                { text: 'the hawk is lying', outcome: 'Not quite — Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They.', reveals: 'irony-in-this-poem-is' },
                { text: 'the hawk is wrong', outcome: 'Not quite — Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They.', reveals: 'irony-in-this-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Hawk Roosting\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the dictionary definition of "sophistry," and why is it ironic that the hawk claims "There is no sophistry in my body"?', options: [
                { text: '**Answer:** Sophistry means the use of clever but false arguments, especially to deceive', outcome: '**Answer:** Sophistry means the use of clever but false arguments, especially to deceive.' },
                { text: 'complexity', outcome: 'Not quite — Students frequently confuse "sophistry" with "sophistication" because both derive from *sophos*.', reveals: 'students-frequently-confuse-sophistry-with' },
                { text: 'wisdom', outcome: 'Not quite — Students frequently confuse "sophistry" with "sophistication" because both derive from *sophos*.', reveals: 'students-frequently-confuse-sophistry-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Hawk Roosting\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "Where does', outcome: 'A literal question asks for information directly stated in the text (e.g., "Where does the hawk.' },
                { text: 'guessing', outcome: 'Not quite — Students often think inferential questions are "guessing" and have no right answer.', reveals: 'inferential-questions-are-guessing-and' },
                { text: 'inferential questions are "guessing" and have no right answer', outcome: 'Not quite — Students often think inferential questions are "guessing" and have no right answer.', reveals: 'inferential-questions-are-guessing-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a seminar on \'power and persuasion\', a classmate offers Hughes\'s \'Hawk Roosting\' as a poem that \'shows how nature is cruel and how Hughes admires the strong.\' You\'re asked whether that reading holds.',
            decisions: [{ prompt: 'How do you steer the reading of the hawk\'s speech?', options: [
                { text: 'Point out the form: it\'s a dramatic monologue — the hawk speaks with no poet-narrator, so we inhabit a mind that feels no guilt, only certainty of dominance. The \'plot\' is the self-justifying logic tightening: \'I sit\' → \'My feet\' → \'There is no sophistry in my body\' → the world unchanged by its will. Hughes exposes the seductive reasoning of tyranny; he doesn\'t endorse it.', outcome: 'Form does the work: the monologue lets the hawk condemn itself out of its own mouth — the poem studies power, not ornithology.' },
                { text: 'Accept the classmate\'s reading — the hawk\'s confidence is impressive, so Hughes must admire strength.', outcome: 'That confuses the persona with the poet: the monologue ironically exposes the hawk\'s logic as circular and self-serving.', reveals: 'hughes-endorses-the-hawk' },
                { text: 'Argue the poem has no structure at all — nothing happens, a bird just sits there.', outcome: 'No external action isn\'t no structure: the argument is the plot — premise, evidence, conclusion, reassertion of absolute power.', reveals: 'monologue-means-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'The poem ends where it began — \'My eye has permitted no change\' — the form itself enacting a will that permits nothing.',
            decisions: [{ prompt: 'What comes next? Hawk Roosting (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hawk Roosting (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_007', difficulty: 'standard',
          question: 'Secondary themes in \'Hawk Roosting\' — the supporting ideas and motifs that.',
          hint: 'Review the primary theme (node 006) and the hawk\'s characterization (node 004).',
          misconception: 'Students often treat "secondary themes" as just "less important themes" and list random topics like "trees," "flight,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Hawk Roosting\'',
                  options: ['Secondary themes in \'Hawk Roosting\'', '\'Hawk Roosting\' (Woven Words, ch', 'The plot/narrative arc of \'Hawk Roosting\'', 'The setting of \'Hawk Roosting\''],
                  hint: 'Review the primary theme (node 006) and the hawk\'s characterization (node 004) to re-ground the.',
                  misconception: 'Students often treat "secondary themes" as just "less important themes" and list random topics like "trees," "flight," or "feathers".' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student list all abstract nouns in the poem (Creation, sophistry, allotment, flight, arguments, change).', 'For each noun, ask: "What idea about the world does this word represent in the hawk\'s mind?" 3.', 'Group the resulting ideas into 3-4 clusters; each cluster is a candidate secondary theme.', 'Verify each cluster by finding at least two distinct stanzas where its language appears.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_008', difficulty: 'standard',
          question: 'Imagery in \'Hawk Roosting\' — the vivid, sensory language that creates.',
          hint: 'Review c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) and c7_engl_ch01_008.',
          misconception: 'Students often treat imagery and metaphor as decorative "add-ons" — identifying them ("there is a metaphor in line 8").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery in \'Hawk Roosting\'',
                  options: ['Imagery in \'Hawk Roosting\'', '\'Hawk Roosting\' (Woven Words, ch', 'The plot/narrative arc of \'Hawk Roosting\'', 'The setting of \'Hawk Roosting\''],
                  hint: 'Review c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) and c7_engl_ch01_008 (Literary.',
                  misconception: 'Students often treat imagery and metaphor as decorative "add-ons" — identifying them ("there is a metaphor in line 8") without explaining.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Re-anchor in the dramatic monologue form**: Remind the student: "This is not Ted Hughes speaking.', 'It is a *character* — a hawk.', 'Every \'I\' is a performance." 2.', '**Sensory inventory exercise**: Have the student draw a two-column table: "Sense" | "Line Reference".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Hawk Roosting\' — where opposite things are both true,.',
          hint: 'Review the Class 10 irony node (c10_engl_cbse_01_005) and Class 8 symbolism node.',
          misconception: 'Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They miss that the hawk.',
          parts: [
                { id: 'a', prompt: 'Compare the symbolism of the "sun" in "Hawk Roosting" ("The sun is behind me") with the symbolism of the "sun" in a different poem you know (e.g., "The Eagle".', answer: 'In "Hawk Roosting," the sun behind the hawk symbolises the hawk\'s self-perceived',
                  options: ['In "Hawk Roosting," the sun behind the hawk symbolises the hawk\'s self-perceived', 'both mean light', 'both mean God', 'the hawk is lying'],
                  hint: 'Review the Class 10 irony node (c10_engl_cbse_01_005) and Class 8 symbolism node (c8_engl_ch4_8).',
                  misconception: 'Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They miss that the hawk *believes* its own.' }
          ],
            remediations: { 'irony-in-this-poem-is': { steps: ['Re-read the poem aloud, marking every "I" statement.', 'For each, ask: "Is this objectively true?', 'What does the *reader* know that the hawk ignores?" 3.', 'List the concrete nouns (foot, feather, sun, bones, Creation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They miss that the hawk.',
          parts: [
                { id: 'a', prompt: 'Critique this interpretation: "The poem celebrates the hawk\'s power and honesty; there is no irony because the hawk truly is a perfect predator." Defend.', answer: 'Refute',
                  options: ['Refute', 'the hawk is lying', 'the hawk is wrong', 'irony in this poem is simply "the hawk is lying" or "the hawk is wrong'],
                  hint: 'Review the Class 10 irony node (c10_engl_cbse_01_005) and Class 8 symbolism node (c8_engl_ch4_8).',
                  misconception: 'Students often think irony in this poem is simply "the hawk is lying" or "the hawk is wrong." They miss that the hawk *believes* its own.' }
          ],
            remediations: { 'irony-in-this-poem-is': { steps: ['Re-read the poem aloud, marking every "I" statement.', 'For each, ask: "Is this objectively true?', 'What does the *reader* know that the hawk ignores?" 3.', 'List the concrete nouns (foot, feather, sun, bones, Creation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Hawk Roosting\' — the words and phrases you must know to read.',
          hint: 'If stuck, review the "Understanding the Poem" questions in the NCERT text (especially Q3.',
          misconception: 'Students frequently confuse "sophistry" with "sophistication" because both derive from *sophos* (wisdom) and sound.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'Hawk Roosting\'',
                  options: ['Key vocabulary of \'Hawk Roosting\'', '\'Hawk Roosting\' (Woven Words, ch', 'The plot/narrative arc of \'Hawk Roosting\'', 'The setting of \'Hawk Roosting\''],
                  hint: 'If stuck, review the "Understanding the Poem" questions in the NCERT text (especially Q3.',
                  misconception: 'Students frequently confuse "sophistry" with "sophistication" because both derive from *sophos* (wisdom) and sound similar.' }
          ],
            remediations: { 'students-frequently-confuse-sophistry-with': { steps: ['**Etymology Drill:** Have the student write: *Sophist* (paid teacher in ancient Greece) → *Sophistry* (their reputation.', 'Contrast with *Sophisticated* (worldly-wise, complex).', '**Context Re-read:** Direct them to stanza 4: "No arguments assert my right." Ask: "If the hawk uses *no arguments*.', 'What *is* the monologue we are reading?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_011', difficulty: 'standard',
          question: 'Language and style in \'Hawk Roosting\' — how the writer chose words, sentences.',
          hint: 'Review the tense identification exercises from Class 6 (c6_english_u2_018) and practice.',
          misconception: 'Students often treat grammar analysis as a labelling exercise—circling verbs and naming tenses—without explaining *why*.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet might choose the present simple tense for a poem about a predator, instead of using past tense or present continuous.', answer: 'The present simple tense conveys habitual, timeless, and unchanging actions',
                  options: ['The present simple tense conveys habitual, timeless, and unchanging actions', 'it sounds better'],
                  hint: 'Review the tense identification exercises from Class 6 (c6_english_u2_018) and practice on unseen.',
                  misconception: 'Students often treat grammar analysis as a labelling exercise—circling verbs and naming tenses—without explaining *why* that grammatical.' }
          ],
            remediations: { 'students-often-treat-grammar-analysis': { steps: ['Give the student a two-column table: Column A lists five lines from the poem; Column B is empty.', 'Ask them to write the grammatical feature (tense, voice, sentence type) in Column B.', 'For each line, ask: "If the poet changed this feature (e.g., made it past tense / passive / a question), how would the.', 'Have them answer orally first, then write one sentence per line connecting the feature to the hawk\'s character.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Hawk Roosting\' — questions answered straight from the.',
          hint: 'If stuck, review the stanza-by-stanza summary from c11_eng_w_cbse_15_002 and the.',
          misconception: 'Students often think inferential questions are "guessing" and have no right answer.',
          parts: [
                { id: 'a', prompt: 'Using the line "The sun is behind me," answer the following inferential question: What does this suggest about the hawk\'s perspective on its own power?', answer: 'The line literally means the sun is at the hawk\'s back when it flies',
                  options: ['The line literally means the sun is at the hawk\'s back when it flies', 'guessing', 'only gives the literal meaning fails to infer the symbolic significance', 'inferential questions are "guessing" and have no right answer'],
                  hint: 'If stuck, review the stanza-by-stanza summary from c11_eng_w_cbse_15_002 and the vocabulary list.',
                  misconception: 'Students often think inferential questions are "guessing" and have no right answer.' }
          ],
            remediations: { 'inferential-questions-are-guessing-and': { steps: ['If a student cannot distinguish literal from inferential, give them two highlighters: one for facts directly in the.', 'Practice with a simple text first (e.g., a news headline), then return to the poem.', 'Ask: "Which words in the poem made you think that?" to force evidence-based reasoning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
