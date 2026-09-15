import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch10_p1: SimDef = {
    id: 'v3_c11_eng_w_ch10_p1',
    title: 'Let Me Not to the Marriage of True Minds (Poem) · Part 1/3',
    subtitle: 'Read a love poem that behaves like a courtroom brief.',
    classLevel: 11, subject: 'eng_w', topic: 'Let Me Not to the Marriage of True Minds (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch10'],
    nodeIds: ['c11_eng_w_cbse_10_001', 'c11_eng_w_cbse_10_002', 'c11_eng_w_cbse_10_003', 'c11_eng_w_cbse_10_004', 'c11_eng_w_cbse_10_005', 'c11_eng_w_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logician cross-examining a sonnet', intro: 'Love that \'bends with the remover to remove\' gets struck from the definition — then the poet dares you to disprove him.', goal: 'Identify the Shakespearean sonnet\'s argumentative structure, volta and closing wager.' },
    discovery: {
        question: '\'If this be error and upon me proved, / I never writ, nor no man ever loved.\' Logical proof of his definition — or a trap?',
        options: ['A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden', 'A watertight logical proof of true love\'s constancy', 'A confession that his definition is probably wrong', 'A legal loophole admitting exceptions'],
        answer: 'A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden',
        hook: 'The sonnet argues like a lawyer — define by negation, turn at \'O no, it is an ever-fixed mark,\' then stake everything on a verdict no one can overturn.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background for "Let Me Not to the Marriage of True Minds" involves understanding the poet William Shakespeare, the Shakespearean sonnet form (three quatrains and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the ABAB CDCD EFEF GG skeleton, find the volta at line 9, and try building your own quatrain that argues by negation.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to read a poem that claims real love never changes — even when circumstances do.',
            decisions: [{ prompt: 'What is the rhyme scheme and stanza structure of a Shakespearean sonnet?', options: [
                { text: 'A Shakespearean sonnet consists of three quatrains (four-line stanzas) followed by a', outcome: 'A Shakespearean sonnet consists of three quatrains (four-line stanzas) followed by a final couplet.' },
                { text: 'Fair Youth', outcome: 'Not quite — Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s.', reveals: 'sonnet-116-describes-a-specific' },
                { text: 'Dark Lady', outcome: 'Not quite — Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s.', reveals: 'sonnet-116-describes-a-specific' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you open the poem and see a block of 14 lines — you might wonder where to even begin. Start by reading it aloud once, just to hear the rhythm.',
            decisions: [{ prompt: 'What is the rhyme scheme of a Shakespearean sonnet, and how many lines does it contain?', options: [
                { text: 'A Shakespearean sonnet has 14 lines with the rhyme scheme abab cdcd efef gg', outcome: 'A Shakespearean sonnet has 14 lines with the rhyme scheme abab cdcd efef gg.' },
                { text: 'abba abba cde cde', outcome: 'Not quite — Students often treat the sonnet as a miniature story with a "plot" involving characters (the poet.', reveals: 'students-often-treat-the-sonnet' },
                { text: '12 lines', outcome: 'Not quite — Students often treat the sonnet as a miniature story with a "plot" involving characters (the poet.', reveals: 'students-often-treat-the-sonnet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are describing the "world" of this poem to a friend who has never read it.',
            decisions: [{ prompt: 'What is the primary metaphorical setting established in the second quatrain of Sonnet 116?', options: [
                { text: 'The primary metaphorical setting in the second quatrain is a maritime landscape: a stormy', outcome: 'The primary metaphorical setting in the second quatrain is a maritime landscape: a stormy sea with.' },
                { text: 'a castle', outcome: 'Not quite — Students often believe "setting" in poetry must be a named place (Verona, a garden, a room) with.', reveals: 'setting-in-poetry-must-be' },
                { text: 'a garden', outcome: 'Not quite — Students often believe "setting" in poetry must be a named place (Verona, a garden, a room) with.', reveals: 'setting-in-poetry-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re defending your best friend\'s reputation in court — you\'d gather specific incidents, words they spoke, and how they acted under pressure.',
            decisions: [{ prompt: 'Who is the protagonist of Sonnet 116, and what grammatical evidence in the first quatrain establishes this character as an active agent.', options: [
                { text: 'The protagonist is Love personified, established as an active agent through its role as', outcome: 'The protagonist is Love personified, established as an active agent through its role as grammatical.' },
                { text: 'A wrong answer identifying', outcome: 'Not quite — Students consistently confuse the poetic speaker ("I" in the couplet) with the protagonist, writing.', reveals: 'students-consistently-confuse-the-poetic' },
                { text: 'true minds', outcome: 'Not quite — Students consistently confuse the poetic speaker ("I" in the couplet) with the protagonist, writing.', reveals: 'students-consistently-confuse-the-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a courtroom drama where Love is the defendant on trial for being "constant." The prosecution calls witnesses: Time with his sickle,.',
            decisions: [{ prompt: 'Identify the four personified or symbolic supporting characters in Sonnet 116 and name the specific line or phrase where each appears.', options: [
                { text: 'The four supporting characters are: (1) Time', outcome: 'The four supporting characters are: (1) Time — "Time\'s fool" and "his bending sickle\'s compass".' },
                { text: 'character analysis', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in novels or plays, so they.', reveals: 'character-analysis-only-applies-to' },
                { text: 'protagonist', outcome: 'Not quite — Students believe "character analysis" only applies to human figures in novels or plays, so they.', reveals: 'character-analysis-only-applies-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine a friend says, "Love changes when life gets hard — that\'s just reality." Shakespeare\'s Sonnet 116 is his legal brief against that idea.',
            decisions: [{ prompt: 'What is the primary theme of Shakespeare\'s Sonnet 116, "Let Me Not to the Marriage of True Minds"?', options: [
                { text: 'The primary theme is the constancy and immutability of true love', outcome: 'The primary theme is the constancy and immutability of true love — love that does not change when.' },
                { text: 'edge of doom', outcome: 'Not quite — Students often believe **"marriage of true minds" refers to a wedding ceremony or romantic.', reveals: 'marriage-of-true-minds-refers' },
                { text: 'the theme is marriage', outcome: 'Not quite — Students often believe **"marriage of true minds" refers to a wedding ceremony or romantic.', reveals: 'marriage-of-true-minds-refers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the literature fest you must defend choosing Shakespeare\'s \'Let me not to the marriage of true minds\' for a wedding-reading segment. A judge objects: \'A love poem for a wedding should celebrate feelings changing and growing — this one claims real love never changes. Isn\'t that unrealistic and cold?\'',
            decisions: [{ prompt: 'Is \'love that doesn\'t change\' unrealistic or the poem\'s point?', options: [
                { text: 'It\'s the argument: the sonnet defines true love as the fixed pole — \'an ever-fixed mark\' that is \'not Time\'s fool\'; love that bends when the beloved changes was never love. The impersonal, almost legal register (\'admit impediments\', \'I never writ\') is the claim of a universal law, not coldness — the couplet stakes the poet\'s whole credibility on it.', outcome: 'The sonnet doesn\'t describe cosy feelings; it lays down a test: whatever alters with time or looks isn\'t love at all.' },
                { text: 'The judge is right — pick a warmer poem; unchanging love is a cold ideal nobody lives up to.', outcome: 'That swaps the poem\'s definitional claim for a mood; its power is precisely the extremity — love as the one thing time can\'t corrupt.', reveals: 'constancy-is-cold' },
                { text: 'It\'s actually about physical attraction lasting forever — love means never finding faults.', outcome: 'The poem explicitly excludes the changeable and the physical (\'rosy lips and cheeks\' yield to Time); it praises constancy of the bond, not frozen beauty.', reveals: 'love-means-never-aging' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Three quatrains to build the case, one couplet to slam the door — the sonnet\'s shape is the argument.',
            decisions: [{ prompt: 'What comes next? Let Me Not to the Marriage of True Minds (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Let Me Not to the Marriage of True Minds (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background for "Let Me Not to the Marriage of True.',
          hint: 'Review the sonnet structure lesson from Class 8 (c8_engl_ch1_14) and the metaphor lesson.',
          misconception: 'Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s love for the "Fair.',
          parts: [
                { id: 'a', prompt: 'Why might a poet choose to define something by stating what it is NOT (using negatives) rather than what it is?', answer: 'Using negatives (e.g., "Love is not love /',
                  options: ['Using negatives (e.g., "Love is not love /', 'for emphasis', 'Fair Youth', 'Dark Lady'],
                  hint: 'Review the sonnet structure lesson from Class 8 (c8_engl_ch1_14) and the metaphor lesson from Class.',
                  misconception: 'Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s love for the "Fair Youth" or "Dark Lady").' },
                { id: 'b', prompt: 'If you were to write a quatrain in Shakespearean sonnet form about friendship that mirrors the logical structure of the first quatrain of Sonnet 116, what.', answer: 'The quatrain would follow ABAB rhyme scheme',
                  options: ['The quatrain would follow ABAB rhyme scheme', 'Fair Youth', 'Dark Lady', 'Sonnet 116 describes a specific romantic relationship (e'],
                  hint: 'Review the sonnet structure lesson from Class 8 (c8_engl_ch1_14) and the metaphor lesson from Class.',
                  misconception: 'Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s love for the "Fair Youth" or "Dark Lady").' }
          ],
            remediations: { 'sonnet-116-describes-a-specific': { steps: ['Have the student read Sonnet 116 alongside Sonnet 18 ("Shall I compare thee...") and Sonnet 130 ("My mistress\'.', 'Use a graphic organizer: label each quatrain\'s function (Definition → Metaphor 1 → Metaphor 2 → Time\'s challenge →.', 'Assign a 5-minute writing: "Define \'friendship\' using only negatives in four lines (ABAB)." This forces the student.', 'Show a 2-minute video on Elizabethan sonnet vogue (e.g., from BBC or NPTEL) to anchor the historical context.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s love for the "Fair.',
          parts: [
                { id: 'a', prompt: 'Is the poet\'s claim in the final couplet — "If this be error, and upon me proved, / I never writ, nor no man ever loved" — a logically sound defense of his.', answer: 'It is a rhetorical trap, not a logical proof',
                  options: ['It is a rhetorical trap, not a logical proof', 'logical', 'Fair Youth', 'Dark Lady'],
                  hint: 'Review the sonnet structure lesson from Class 8 (c8_engl_ch1_14) and the metaphor lesson from Class.',
                  misconception: 'Students often believe Sonnet 116 describes a specific romantic relationship (e.g., Shakespeare\'s love for the "Fair Youth" or "Dark Lady").' }
          ],
            remediations: { 'sonnet-116-describes-a-specific': { steps: ['Have the student read Sonnet 116 alongside Sonnet 18 ("Shall I compare thee...") and Sonnet 130 ("My mistress\'.', 'Use a graphic organizer: label each quatrain\'s function (Definition → Metaphor 1 → Metaphor 2 → Time\'s challenge →.', 'Assign a 5-minute writing: "Define \'friendship\' using only negatives in four lines (ABAB)." This forces the student.', 'Show a 2-minute video on Elizabethan sonnet vogue (e.g., from BBC or NPTEL) to anchor the historical context.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_002', difficulty: 'standard',
          question: 'In a Shakespearean sonnet, "plot and narrative structure" refers to the logical.',
          hint: 'If stuck, review the definition of a Shakespearean sonnet (14 lines, iambic pentameter.',
          misconception: 'Students often treat the sonnet as a miniature story with a "plot" involving characters (the poet, a beloved, Time) and.',
          parts: [
                { id: 'a', prompt: 'What is the rhyme scheme of a Shakespearean sonnet, and how many lines does it contain?', answer: 'A Shakespearean sonnet has 14 lines with the rhyme scheme abab cdcd efef gg',
                  options: ['A Shakespearean sonnet has 14 lines with the rhyme scheme abab cdcd efef gg', 'abba abba cde cde', '12 lines'],
                  hint: 'If stuck, review the definition of a Shakespearean sonnet (14 lines, iambic pentameter, abab cdcd.',
                  misconception: 'Students often treat the sonnet as a miniature story with a "plot" involving characters (the poet, a beloved, Time) and events (meeting.' },
                { id: 'b', prompt: 'In the poem, the first quatrain defines love by saying what it is *not*. Why does the poet choose this negative definition strategy instead of a positive one?', answer: 'The negative definition ("Love is not love',
                  options: ['The negative definition ("Love is not love', 'to make the poem sound sad'],
                  hint: 'If stuck, review the definition of a Shakespearean sonnet (14 lines, iambic pentameter, abab cdcd.',
                  misconception: 'Students often treat the sonnet as a miniature story with a "plot" involving characters (the poet, a beloved, Time) and events (meeting.' }
          ],
            remediations: { 'students-often-treat-the-sonnet': { steps: ['Ask the student to number the lines 1–14 and draw brackets around lines 1–4, 5–8, 9–12, 13–14.', 'Have them label each bracket: "Q1: Negative definition", "Q2: Positive metaphors", "Q3: Love vs Time", "C: Logical.', 'Read each bracket aloud as a separate "speech" and ask: "What is this speech trying to prove?" 4.', 'Finally, have them write one sentence that states the *entire* argument in their own words, using the structure: "True.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_003', difficulty: 'standard',
          question: 'In poetry, setting refers to the metaphorical or imaginative landscape created.',
          hint: 'If stuck, review c7_engl_ch03_014 (Setting and Natural Imagery in the Poem) for practice.',
          misconception: 'Students often believe "setting" in poetry must be a named place (Verona, a garden, a room) with a clock-time (morning.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the "edge of doom" in the final couplet functions as a setting element rather than just a time reference.', answer: 'The "edge of doom" acts as a spatial boundary',
                  options: ['The "edge of doom" acts as a spatial boundary', 'Judgment Day', 'end of time', 'setting'],
                  hint: 'If stuck, review c7_engl_ch03_014 (Setting and Natural Imagery in the Poem) for practice.',
                  misconception: 'Students often believe "setting" in poetry must be a named place (Verona, a garden, a room) with a clock-time (morning, 16th century).' }
          ],
            remediations: { 'setting-in-poetry-must-be': { steps: ['Ask the student to close their eyes and describe what they "see" when hearing "ever-fixed mark / That looks.', 'Have them draw the two quatrains as two distinct landscapes (sea with star; field with reaper).', 'Guide them to label each drawing with the atmosphere words: "steadfastness," "immunity," "eternity." 4.', 'Finally, ask: "If this poem were a movie, what would the opening shot be?" This forces concretization of metaphorical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis in poetry examines how the poetic speaker constructs.',
          hint: 'Review subject-verb identification in inverted poetic syntax using.',
          misconception: 'Students consistently confuse the poetic speaker ("I" in the couplet) with the protagonist, writing answers like "The.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Shakespeare chooses to define Love primarily through negatives ("not love," "alters not," "never shaken," "not Time\'s fool").', answer: 'The negative definition establishes Love by what it refuses to do',
                  options: ['The negative definition establishes Love by what it refuses to do', 'Shakespeare didn\'t know positive words', 'it\'s just poetic style', 'in the couplet) with the protagonist, writing answers like'],
                  hint: 'Review subject-verb identification in inverted poetic syntax using c11_eng_w_cbse_10_002\'s.',
                  misconception: 'Students consistently confuse the poetic speaker ("I" in the couplet) with the protagonist, writing answers like "The poet says love.' }
          ],
            remediations: { 'students-consistently-confuse-the-poetic': { steps: ['Have the student circle every subject-verb pair in the poem (Love/is, Love/alters, Love/bends, it/looks, it/is.', 'Colour-code: one colour for Love as subject, another for the speaker ("I"), another for Time.', 'Ask "Who does the most verbs in this poem?"', 'Explain that the character who performs the most actions *is* the protagonist in poetry, regardless of who speaks the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are personified entities, abstract forces,.',
          hint: 'Review c11_eng_w_cbse_10_008 (Literary Devices: Imagery and Metaphor) focusing on the.',
          misconception: 'Students believe "character analysis" only applies to human figures in novels or plays, so they either skip this topic.',
          parts: [
                { id: 'a', prompt: 'Identify the four personified or symbolic supporting characters in Sonnet 116 and name the specific line or phrase where each appears.', answer: 'The four supporting characters are: (1) Time',
                  options: ['The four supporting characters are: (1) Time', 'character analysis', 'protagonist', 'I never writ'],
                  hint: 'Review c11_eng_w_cbse_10_008 (Literary Devices: Imagery and Metaphor) focusing on the.',
                  misconception: 'Students believe "character analysis" only applies to human figures in novels or plays, so they either skip this topic for poetry or force.' },
                { id: 'b', prompt: 'Analyze how the "rosy lips and cheeks" function as a supporting character despite having no agency or voice in the poem.', answer: '"Rosy lips and cheeks" serve as Time\'s victims',
                  options: ['"Rosy lips and cheeks" serve as Time\'s victims', 'imagery of beauty', 'character analysis', 'protagonist'],
                  hint: 'Review c11_eng_w_cbse_10_008 (Literary Devices: Imagery and Metaphor) focusing on the.',
                  misconception: 'Students believe "character analysis" only applies to human figures in novels or plays, so they either skip this topic for poetry or force.' }
          ],
            remediations: { 'character-analysis-only-applies-to': { steps: ['Ask the student to list every noun in the poem that performs an action (alters, bends, looks, shakes, comes, bears).', 'For each, ask "Is this Love itself, or something else?"', 'Group the "something else" into antagonists (Time, sickle, lips/cheeks) and analogs (star, bark).', 'Have them complete this sentence frame: "Time shows Love is _____ by _____; the Star shows Love is _____ by _____.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or message that the.',
          hint: 'Review the structure of a Shakespearean sonnet (three quatrains and a couplet) and the.',
          misconception: 'Students often believe **"marriage of true minds" refers to a wedding ceremony or romantic marriage**.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of Shakespeare\'s Sonnet 116, "Let Me Not to the Marriage of True Minds"?', answer: 'The primary theme is the constancy and immutability of true love',
                  options: ['The primary theme is the constancy and immutability of true love', 'edge of doom', 'the theme is marriage', 'love is beautiful'],
                  hint: 'Review the structure of a Shakespearean sonnet (three quatrains and a couplet) and the function.',
                  misconception: 'Students often believe **"marriage of true minds" refers to a wedding ceremony or romantic marriage**.' }
          ],
            remediations: { 'marriage-of-true-minds-refers': { steps: ['**Clarify "marriage of true minds":** Have the student replace "marriage" with "union" or "bond" and "true minds" with.', '**Map the negatives:** Give the student a two-column table.', 'Column A: Every negative phrase ("not," "never," "no," "nor").', 'Column B: The positive quality it asserts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
