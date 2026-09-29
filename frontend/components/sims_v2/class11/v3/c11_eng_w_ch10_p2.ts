import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch10_p2: SimDef = {
    id: 'v3_c11_eng_w_ch10_p2',
    title: 'Let Me Not to the Marriage of True Minds (Poem) · Part 2/3',
    subtitle: 'Read a love poem that behaves like a courtroom brief.',
    classLevel: 11, subject: 'eng_w', topic: 'Let Me Not to the Marriage of True Minds (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch10'],
    nodeIds: ['c11_eng_w_cbse_10_007', 'c11_eng_w_cbse_10_008', 'c11_eng_w_cbse_10_009', 'c11_eng_w_cbse_10_010', 'c11_eng_w_cbse_10_011', 'c11_eng_w_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a logician cross-examining a sonnet', intro: 'Love that \'bends with the remover to remove\' gets struck from the definition — then the poet dares you to disprove him.', goal: 'Identify the Shakespearean sonnet\'s argumentative structure, volta and closing wager.' },
    discovery: {
        question: '\'If this be error and upon me proved, / I never writ, nor no man ever loved.\' Logical proof of his definition — or a trap?',
        options: ['A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden', 'A watertight logical proof of true love\'s constancy', 'A confession that his definition is probably wrong', 'A legal loophole admitting exceptions'],
        answer: 'A rhetorical trap — to refute him you\'d have to prove he never wrote or that nobody ever loved, an impossible burden',
        hook: 'The sonnet argues like a lawyer — define by negation, turn at \'O no, it is an ever-fixed mark,\' then stake everything on a verdict no one can overturn.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'ever-fixed mark\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the ABAB CDCD EFEF GG skeleton, find the volta at line 9, and try building your own quatrain that argues by negation.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'ever-fixed mark\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List two secondary themes present in Sonnet 116 besides the primary theme of constancy.', options: [
                { text: 'Correct answer: Love\'s endurance against time (love vs', outcome: 'Correct answer: Love\'s endurance against time (love vs. Time) and love as a guiding.' },
                { text: 'love is beautiful', outcome: 'Not quite — Students often think secondary themes are just "smaller themes" unrelated to the primary theme.', reveals: 'secondary-themes-are-just-smaller' },
                { text: 'love hurts', outcome: 'Not quite — Students often think secondary themes are just "smaller themes" unrelated to the primary theme.', reveals: 'secondary-themes-are-just-smaller' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'ever-fixed mark\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday language (not from the poem).', options: [
                { text: 'Imagery: Language that creates sensory impressions (e.g., "The cinnamon scent of fresh', outcome: 'Imagery: Language that creates sensory impressions (e.g., "The cinnamon scent of fresh chai warmed.' },
                { text: 'Time is like a thief', outcome: 'Not quite — Students consistently confuse the Early Modern English meanings of "bark" (ship) and "compass".', reveals: 'students-consistently-confuse-the-early' },
                { text: 'Imagery is when the author describes how something looks', outcome: 'Not quite — Students consistently confuse the Early Modern English meanings of "bark" (ship) and "compass".', reveals: 'students-consistently-confuse-the-early' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'ever-fixed mark\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "vocabulary in context" as a literary analysis skill and explain why it is particularly important when reading Shakespearean sonnets.', options: [
                { text: 'Vocabulary in context is the skill of determining a word\'s meaning from its specific', outcome: 'Vocabulary in context is the skill of determining a word\'s meaning from its specific textual.' },
                { text: 'it means looking up words in a dictionary', outcome: 'Not quite — Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'ever-fixed mark\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical mood of the opening line "Let me not to the marriage of true minds / Admit impediments" and state its function.', options: [
                { text: 'The opening line uses the imperative mood ("Let me not") to frame the poem as a formal', outcome: 'The opening line uses the imperative mood ("Let me not") to frame the poem as a formal declaration.' },
                { text: 'indicative mood', outcome: 'Not quite — Students often think "bark" means the sound a dog makes or tree covering, and "compass" means.', reveals: 'bark-means-the-sound-a' },
                { text: 'subjunctive', outcome: 'Not quite — Students often think "bark" means the sound a dog makes or tree covering, and "compass" means.', reveals: 'bark-means-the-sound-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'ever-fixed mark\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify three explicit negative words or phrases Shakespeare uses in Sonnet 116 to define true love.', options: [
                { text: 'Correct answer: "not" (line 1: "Let me not"), "not" (line 2: "Love is not love"), "never"', outcome: 'Correct answer: "not" (line 1: "Let me not"), "not" (line 2: "Love is not love"), "never" (line 6.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving an opinion," leading to answers like "I.', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'guessing', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving an opinion," leading to answers like "I.', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the literature fest you must defend choosing Shakespeare\'s \'Let me not to the marriage of true minds\' for a wedding-reading segment. A judge objects: \'A love poem for a wedding should celebrate feelings changing and growing — this one claims real love never changes. Isn\'t that unrealistic and cold?\'',
            decisions: [{ prompt: 'Is \'love that doesn\'t change\' unrealistic or the poem\'s point?', options: [
                { text: 'It\'s the argument: the sonnet defines true love as the fixed pole — \'an ever-fixed mark\' that is \'not Time\'s fool\'; love that bends when the beloved changes was never love. The impersonal, almost legal register (\'admit impediments\', \'I never writ\') is the claim of a universal law, not coldness — the couplet stakes the poet\'s whole credibility on it.', outcome: 'The sonnet doesn\'t describe cosy feelings; it lays down a test: whatever alters with time or looks isn\'t love at all.' },
                { text: 'The judge is right — pick a warmer poem; unchanging love is a cold ideal nobody lives up to.', outcome: 'That swaps the poem\'s definitional claim for a mood; its power is precisely the extremity — love as the one thing time can\'t corrupt.', reveals: 'constancy-is-cold' },
                { text: 'It\'s actually about physical attraction lasting forever — love means never finding faults.', outcome: 'The poem explicitly excludes the changeable and the physical (\'rosy lips and cheeks\' yield to Time); it praises constancy of the bond, not frozen beauty.', reveals: 'love-means-never-aging' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'Three quatrains to build the case, one couplet to slam the door — the sonnet\'s shape is the argument.',
            decisions: [{ prompt: 'What comes next? Let Me Not to the Marriage of True Minds (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Let Me Not to the Marriage of True Minds (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes in \'ever-fixed mark\' — the supporting ideas and motifs that.',
          hint: 'Review the primary theme analysis (node 10_006) and the sonnet\'s structure (node 10_001).',
          misconception: 'Students often think secondary themes are just "smaller themes" unrelated to the primary theme.',
          parts: [
                { id: 'a', prompt: 'List two secondary themes present in Sonnet 116 besides the primary theme of constancy.', answer: 'Correct answer: Love\'s endurance against time (love vs',
                  options: ['Correct answer: Love\'s endurance against time (love vs', 'love is beautiful', 'love hurts', 'smaller themes'],
                  hint: 'Review the primary theme analysis (node 10_006) and the sonnet\'s structure (node 10_001).',
                  misconception: 'Students often think secondary themes are just "smaller themes" unrelated to the primary theme.' },
                { id: 'b', prompt: 'Explain in your own words how the poet uses negatives (\'not\', \'never\', \'no\') to define true love.', answer: 'Correct answer: The negatives define love by exclusion',
                  options: ['Correct answer: The negatives define love by exclusion', 'negatives make it sound sad', 'smaller themes', 'secondary themes are just "smaller themes" unrelated to the primary theme'],
                  hint: 'Review the primary theme analysis (node 10_006) and the sonnet\'s structure (node 10_001).',
                  misconception: 'Students often think secondary themes are just "smaller themes" unrelated to the primary theme.' },
                { id: 'c', prompt: 'In the line "Love\'s not Time\'s fool", identify the literary device and explain how it supports a secondary theme.', answer: 'Correct answer: Personification of Time as a fool-maker',
                  options: ['Correct answer: Personification of Time as a fool-maker', 'metaphor', 'smaller themes', 'secondary themes are just "smaller themes" unrelated to the primary theme'],
                  hint: 'Review the primary theme analysis (node 10_006) and the sonnet\'s structure (node 10_001).',
                  misconception: 'Students often think secondary themes are just "smaller themes" unrelated to the primary theme.' },
                { id: 'd', prompt: 'Compare the metaphor of the "ever-fixed mark" and the "star" in the poem. How do both images contribute to the secondary theme of love as a guide?', answer: 'Correct answer: Both are navigational aids',
                  options: ['Correct answer: Both are navigational aids', 'smaller themes', 'secondary themes are just "smaller themes" unrelated to the primary theme'],
                  hint: 'Review the primary theme analysis (node 10_006) and the sonnet\'s structure (node 10_001).',
                  misconception: 'Students often think secondary themes are just "smaller themes" unrelated to the primary theme.' }
          ],
            remediations: { 'secondary-themes-are-just-smaller': { steps: ['If a student lists unrelated themes, have them: (1) list all metaphors and negatives in the poem; (2) group them into.', 'This forces structural thinking over thematic free-association.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_008', difficulty: 'standard',
          question: 'Imagery in \'ever-fixed mark\' — the vivid, sensory language that creates.',
          hint: 'If stuck, review the "Poetic Devices: Metaphor and Imagery" nodes from Class 6.',
          misconception: 'Students consistently confuse the Early Modern English meanings of "bark" (ship) and "compass" (range/circle) with.',
          parts: [
                { id: 'a', prompt: 'Read this new line: "The monsoon wind slapped the mango leaves, scattering green coins onto the mud." Identify two types of imagery used and the senses they.', answer: 'Visual imagery: "green coins" (sight',
                  options: ['Visual imagery: "green coins" (sight', 'visual imagery', 'simile'],
                  hint: 'If stuck, review the "Poetic Devices: Metaphor and Imagery" nodes from Class 6 (c6_english_u1_005).',
                  misconception: 'Students consistently confuse the Early Modern English meanings of "bark" (ship) and "compass" (range/circle) with their modern everyday.' }
          ],
            remediations: { 'students-consistently-confuse-the-early': { steps: ['Give the student a two-column table: Column A lists the words "bark", "compass", "mark", "sickle"; Column B asks for.', 'Have them fill it using a glossary or the NCERT footnote.', 'Provide a sensory checklist (Visual, Auditory, Tactile, Olfactory, Gustatory, Kinetic, Organic) and ask them to tag.', 'Model a think-aloud: "When I read \'bending sickle\'s compass\', I see the curved blade (visual), feel the arc of the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_009', difficulty: 'standard',
          question: 'Irony and paradox in \'ever-fixed mark\' — where opposite things are both true.',
          hint: 'Review the irony examples from "The Necklace" (c10_engl_cbse_16_008) and symbolism from.',
          misconception: 'Students often think the final couplet is a literal statement (the poet really means he never wrote) rather than ironic.',
          parts: [
                { id: 'a', prompt: 'Identify the symbol in the line "It is the star to every wandering bark." Explain what the star and the bark represent, and how this symbolism supports the.', answer: 'The star symbolizes true love as a fixed guide',
                  options: ['The star symbolizes true love as a fixed guide', 'star means hope'],
                  hint: 'Review the irony examples from "The Necklace" (c10_engl_cbse_16_008) and symbolism from "The Cherry.',
                  misconception: 'Students often think the final couplet is a literal statement (the poet really means he never wrote) rather than ironic hyperbole.' }
          ],
            remediations: { 'the-final-couplet-is-a': { steps: ['Re-read the couplet aloud with exaggerated tone to hear the irony.', 'Draw the symbols: a star, a ship, a sickle, a fixed mark.', 'Label what each represents.', 'Write one sentence explaining why the poet says "I never writ" when he obviously did.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_010', difficulty: 'standard',
          question: 'Key vocabulary of \'ever-fixed mark\' — the words and phrases you must know.',
          hint: 'Review the "star to every wandering bark" metaphor analysis in c11_eng_w_cbse_10_008 and.',
          misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply the same generic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'ever-fixed mark\'',
                  options: ['Key vocabulary of \'ever-fixed mark\'', '\'ever-fixed mark\' (Woven Words, ch', 'The plot/narrative arc of \'ever-fixed mark\'', 'The setting of \'ever-fixed mark\''],
                  hint: 'Review the "star to every wandering bark" metaphor analysis in c11_eng_w_cbse_10_008 and the.',
                  misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply the same generic definition to every.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['Have the student list all words in the sonnet that belong to the "navigation" semantic field (star, bark, compass.', 'Separately list "legal" words (impediments, admit, proved, error).', 'Separately list "time/harvest" words (sickle, compass, hours, weeks, fool).', 'Ask: "Which words appear in two lists?" (compass appears in navigation and time).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply the same generic.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Shakespeare\'s use of \'fool\' in \'Love\'s not Time\'s fool\' is merely a personification of Time as a jester." Defend or refute using.', answer: 'Refute',
                  options: ['Refute', 'vocabulary in context', 'guess the meaning from surrounding words'],
                  hint: 'Review the "star to every wandering bark" metaphor analysis in c11_eng_w_cbse_10_008 and the.',
                  misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and apply the same generic definition to every.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['Have the student list all words in the sonnet that belong to the "navigation" semantic field (star, bark, compass.', 'Separately list "legal" words (impediments, admit, proved, error).', 'Separately list "time/harvest" words (sickle, compass, hours, weeks, fool).', 'Ask: "Which words appear in two lists?" (compass appears in navigation and time).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_011', difficulty: 'standard',
          question: 'Language and style in \'ever-fixed mark\' — how the writer chose words, sentences.',
          hint: 'Review metaphor and personification analysis in c11_eng_w_cbse_10_008 and.',
          misconception: 'Students often think "bark" means the sound a dog makes or tree covering, and "compass" means a magnetic.',
          parts: [
                { id: 'a', prompt: 'In the line "Love\'s not Time\'s fool," identify the grammatical subject, the complement, and the figure of speech.', answer: 'Subject: "Love" (personified abstract noun)',
                  options: ['Subject: "Love" (personified abstract noun)', 'Love is not the plaything of Time'],
                  hint: 'Review metaphor and personification analysis in c11_eng_w_cbse_10_008 and c11_eng_w_cbse_10_009.',
                  misconception: 'Students often think "bark" means the sound a dog makes or tree covering, and "compass" means a magnetic direction-finder.' }
          ],
            remediations: { 'bark-means-the-sound-a': { steps: ['Give the student a mini-glossary of the 10 most archaic words/forms in the poem with modern equivalents.', 'Have them rewrite each line in modern English side-by-side.', 'Ask them to circle every negative word and draw an arrow to what it negates.', 'Finally, have them explain in one sentence why Shakespeare chose each archaic form — this forces attention.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension of \'ever-fixed mark\' — questions answered straight from.',
          hint: 'Review "tenor/vehicle" terminology (c11_eng_w_cbse_10_008) and practice PEEL with one.',
          misconception: 'Students believe "inferential" means "guessing" or "giving an opinion," leading to answers like "I think love.',
          parts: [
                { id: 'a', prompt: 'Analyze how the final couplet ("If this be error...") transforms the poem from a definition of love into a logical proof.', answer: 'Correct answer: The couplet employs a *reductio ad absurdum* structure: "If [my',
                  options: ['Correct answer: The couplet employs a *reductio ad absurdum* structure: "If [my', 'a strong ending', 'the poet\'s confidence', 'inferential'],
                  hint: 'Review "tenor/vehicle" terminology (c11_eng_w_cbse_10_008) and practice PEEL with one metaphor from.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving an opinion," leading to answers like "I think love is eternal because the poet.' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['Give the student a 4-line excerpt (quatrain 1) and ask: "Underline every verb. What tense are they?', 'Have them convert each line into a "The poet says X, which means Y because [quote]" table.', 'Practice with a new poem (e.g., NCERT "The Voice of the Rain") using the same verb-tense-subject grid.', 'Only then return to Sonnet 116 inferential questions. This isolates the skill: inference = grammatical pattern →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
