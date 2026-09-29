import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch10_p2: SimDef = {
    id: 'v3_c11_eng_h_ch10_p2',
    title: 'The Voice of the Rain (Poem) · Part 2/3',
    subtitle: 'Hear a water cycle talk — and notice it is describing poetry itself.',
    classLevel: 11, subject: 'eng_h', topic: 'The Voice of the Rain (Poem) · Part 2/3',
    chapters: ['c11_eng_h_ch10'],
    nodeIds: ['c11_eng_h_cbse_10_007', 'c11_eng_h_cbse_10_008', 'c11_eng_h_cbse_10_009', 'c11_eng_h_cbse_10_010', 'c11_eng_h_cbse_10_011', 'c11_eng_h_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an interviewer granted one question to a shower', intro: 'The poet asks the rain who it is; the rain answers in a perfect circle — rise, transform, descend, begin again.', goal: 'Interpret the rain\'s speech as a metaphor for poetic creation and analyse the dialogue structure.' },
    discovery: {
        question: 'Is \'The Voice of the Rain\' basically a science lesson about the water cycle dressed in personification?',
        options: ['No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed', 'Yes — Whitman wrote it to teach evaporation and condensation', 'No — the rain is merely describing weather, nothing more', 'Yes — the personification is decoration on meteorology'],
        answer: 'No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed',
        hook: '\'I am the Poem of Earth\' — the rain narrates the water cycle so the poet can describe himself: experience rising, changing, returning.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Voice of the Rain\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map each stanza to its water-cycle stage and speaker, then argue why the poem needs a dialogue, not a monologue.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Voice of the Rain\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in poetry, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is an underlying idea that supports and enriches the primary theme,', outcome: 'A secondary theme is an underlying idea that supports and enriches the primary theme, often.' },
                { text: 'secondary themes are less important', outcome: 'Not quite — Students conflate "secondary theme" with "minor theme" and therefore treat them as optional or less.', reveals: 'students-conflate-secondary-theme-with' },
                { text: 'they are stated directly', outcome: 'Not quite — Students conflate "secondary theme" with "minor theme" and therefore treat them as optional or less.', reveals: 'students-conflate-secondary-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Voice of the Rain\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" precisely as literary devices. Give one example of each from general literature (not from this poem).', options: [
                { text: 'Imagery: Language appealing to the five senses to create sensory experiences (e.g., "The', outcome: 'Imagery: Language appealing to the five senses to create sensory experiences (e.g., "The yellow fog.' },
                { text: 'simile', outcome: 'Not quite — Students often think "imagery" means only visual description (pictures in the mind) and miss.', reveals: 'imagery-means-only-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students often think "imagery" means only visual description (pictures in the mind) and miss.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Voice of the Rain\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'What is the basic definition of irony as a literary device? Give a one-sentence answer.', options: [
                { text: 'Irony is a contrast between what is said or expected and what actually happens or is meant', outcome: 'Irony is a contrast between what is said or expected and what actually happens or is meant.' },
                { text: 'irony is a funny coincidence', outcome: 'Not quite — Students often think any unexpected outcome in a poem is irony, and any concrete noun is a symbol.', reveals: 'any-unexpected-outcome-in-a' },
                { text: 'any unexpected outcome in a poem is irony, and any concrete noun is a symbol', outcome: 'Not quite — Students often think any unexpected outcome in a poem is irony, and any concrete noun is a symbol.', reveals: 'any-unexpected-outcome-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Voice of the Rain\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "Vocabulary in Context" as applied to poetry analysis. How does it differ from looking up a word in a dictionary?', options: [
                { text: 'Vocabulary in Context means analyzing how a word\'s meaning is shaped by its specific', outcome: 'Vocabulary in Context means analyzing how a word\'s meaning is shaped by its specific placement.' },
                { text: 'it means checking the dictionary', outcome: 'Not quite — Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'Vocabulary in Context', outcome: 'Not quite — Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Voice of the Rain\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the explicit name the rain gives itself in the poem "The Voice of the Rain"?', options: [
                { text: 'The rain explicitly calls itself "the Poem of Earth"', outcome: 'The rain explicitly calls itself "the Poem of Earth". A wrong answer (e.g., "the song of the sea".' },
                { text: 'the song of the sea', outcome: 'Not quite — Students treat inferential questions as \'opinion\' questions and write personal feelings ("I think.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'the voice of nature', outcome: 'Not quite — Students treat inferential questions as \'opinion\' questions and write personal feelings ("I think.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-literature exhibition a student labels \'The Voice of the Rain\': \'A cute personification trick — Whitman makes the water cycle talk so kids can learn evaporation and condensation. Basically a science lesson in verse.\'',
            decisions: [{ prompt: 'What does the label get wrong about the poem\'s aim?', options: [
                { text: 'It inverts vehicle and tenor: the water cycle is the vehicle — rising impalpable from earth, transforming, returning to nourish its origin — for the poem\'s real subject: poetry itself. The rain\'s \'song\' is Whitman\'s own creative cycle, making the poem an ars poetica disguised as a nature dialogue.', outcome: 'Personification here isn\'t decoration on a science lesson; the science is the metaphor for how poems are born from life and return to it.' },
                { text: 'The label is fair — its purpose is teaching the water cycle through a talking-rain gimmick.', outcome: 'Whitman isn\'t instructing in meteorology; the poem\'s claim (\'I give back life to my own origin\') is about song nourishing its maker\'s world — art, not water.', reveals: 'poem-is-science-lesson' },
                { text: 'It\'s mainly about the poet\'s ego — rain bragging about itself.', outcome: 'The voice is dignified and cyclic, not boastful: rising, changing, returning — a model of creation completing its circle, not self-praise.', reveals: 'rain-is-just-boasting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'The question \'who art thou?\' makes the rain a mystery to be unveiled — cut it, and the eternal voice has no one to answer.',
            decisions: [{ prompt: 'What comes next? The Voice of the Rain (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Voice of the Rain (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Voice of the Rain\' — the supporting ideas and motifs.',
          hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the.',
          misconception: 'Students conflate "secondary theme" with "minor theme" and therefore treat them as optional or less examinable.',
          parts: [
                { id: 'a', prompt: 'The poem uses a circular structure: it opens with the poet asking "Who art thou?" and closes with the poet listening to the rain\'s "song" returning "with.', answer: 'Step 1: Identify the frame',
                  options: ['Step 1: Identify the frame', 'it starts and ends with the poet'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the frame.',
                  misconception: 'Students conflate "secondary theme" with "minor theme" and therefore treat them as optional or less examinable.' },
                { id: 'b', prompt: 'Analyze how the personification of rain as a speaking subject ("I am the Poem of Earth," "I descend," "I give life") functions differently from simple.', answer: 'Simple anthropomorphism gives human traits for charm',
                  options: ['Simple anthropomorphism gives human traits for charm', 'it says, it descends'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Narrative Structure) — specifically the frame.',
                  misconception: 'Students conflate "secondary theme" with "minor theme" and therefore treat them as optional or less examinable.' }
          ],
            remediations: { 'students-conflate-secondary-theme-with': { steps: ['If a student lists surface-level ideas as secondary themes: Step 1 — Have them re-read the final three lines ("For.', 'Step 3 — Ask: "Which themes are *built into the architecture* rather than just *mentioned in the speech*?" Step 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_008', difficulty: 'standard',
          question: 'Imagery in \'The Voice of the Rain\' — the vivid, sensory language that creates.',
          hint: 'Review c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and.',
          misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'In "The Voice of the Rain", the rain says: "I am the Poem of Earth." Explain why this is a metaphor and not a simile.', answer: 'It is a metaphor',
                  options: ['It is a metaphor', 'like/as', 'imagery', 'the rain is personified as a poet'],
                  hint: 'Review c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c8_engl_ch4_7.',
                  misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory, and.' },
                { id: 'b', prompt: 'Scan the poem and list one word/phrase for each: visual imagery, auditory imagery, tactile imagery, kinesthetic (movement) imagery.', answer: 'Visual: "soft-falling shower", "clouds", "rain-drops"',
                  options: ['Visual: "soft-falling shower", "clouds", "rain-drops"', 'imagery', 'the rain is personified as a poet'],
                  hint: 'Review c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c8_engl_ch4_7.',
                  misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory, and.' },
                { id: 'c', prompt: 'Analyze how the imagery in the lines describing the rain\'s upward journey ("eternal I rise impalpable...") differs from the imagery of its downward journey ("I.', answer: 'Upward: abstract, invisible ("impalpable", "vaguely form\'d", "forever changing")',
                  options: ['Upward: abstract, invisible ("impalpable", "vaguely form\'d", "forever changing")', 'imagery', 'the rain is personified as a poet'],
                  hint: 'Review c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c8_engl_ch4_7.',
                  misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory, and.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Give the student a sensory inventory chart: 5 columns (See/Hear/Feel/Taste/Smell + Move).', 'Have them re-read the poem placing *every* sensory word in columns.', 'Use a two-column "Metaphor Mapping" table: Column A = Rain Cycle Stage (quote), Column B = Poetic Process Stage (infer).', 'Fill row by row: "rise impalpable" → "drafting invisible ideas".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The extended metaphor of rain-as-poem works because both follow a cycle: origin → transformation → expression → return → renewal." Defend.', answer: 'Defend',
                  options: ['Defend', 'imagery', 'the rain is personified as a poet'],
                  hint: 'Review c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c8_engl_ch4_7.',
                  misconception: 'Students often think "imagery" means only visual description (pictures in the mind) and miss auditory, tactile, olfactory, gustatory, and.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Give the student a sensory inventory chart: 5 columns (See/Hear/Feel/Taste/Smell + Move).', 'Have them re-read the poem placing *every* sensory word in columns.', 'Use a two-column "Metaphor Mapping" table: Column A = Rain Cycle Stage (quote), Column B = Poetic Process Stage (infer).', 'Fill row by row: "rise impalpable" → "drafting invisible ideas".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Voice of the Rain\' — where opposite things are both.',
          hint: 'Review the difference between metaphor and symbolism using the "Paper Boats" example.',
          misconception: 'Students often think any unexpected outcome in a poem is irony, and any concrete noun is a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'The Voice of the Rain\'',
                  options: ['Irony and paradox in \'The Voice of the Rain\'', '\'The Voice of the Rain\' (Hornbill, ch', 'The plot/narrative arc of \'The Voice of the Rain\'', 'The setting of \'The Voice of the Rain\''],
                  hint: 'Review the difference between metaphor and symbolism using the "Paper Boats" example.',
                  misconception: 'Students often think any unexpected outcome in a poem is irony, and any concrete noun is a symbol.' }
          ],
            remediations: { 'any-unexpected-outcome-in-a': { steps: ['Re-read the poem and highlight every direct speech by the rain.', 'For each highlighted line, ask: "Is the rain saying something that contradicts common knowledge or its own nature?".', 'List all nouns the rain uses for itself (poem, song, showers, etc.).', 'For each noun, write the abstract idea it represents *in this poem only* (use the rain\'s actions as evidence).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Voice of the Rain\' — the words and phrases you must know.',
          hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_10_008) to refresh how.',
          misconception: 'Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.',
          parts: [
                { id: 'a', prompt: 'In the line "I am the Poem of Earth," why does the rain call itself a "Poem" rather than a "Song" or "Story"? Explain using the word\'s connotations.', answer: '"Poem" implies structured, crafted, eternal art',
                  options: ['"Poem" implies structured, crafted, eternal art', 'beauty', 'Vocabulary in Context', '"Vocabulary in Context" means **finding synonyms** for difficult words'],
                  hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_10_008) to refresh how words create.',
                  misconception: 'Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.' },
                { id: 'b', prompt: 'Analyze the word **"lave"** in the line: "To lave the droughts, atomies, dust-layers of the globe." Provide the contextual meaning and explain why "wash".', answer: '*Lave* means \'to wash or bathe gently/ritually,\' often with religious or tender',
                  options: ['*Lave* means \'to wash or bathe gently/ritually,\' often with religious or tender', 'Vocabulary in Context', '"Vocabulary in Context" means **finding synonyms** for difficult words'],
                  hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_10_008) to refresh how words create.',
                  misconception: 'Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.' },
                { id: 'c', prompt: 'The rain says: "For song, issuing from its birth-place, after fulfilment, wandering / Reck\'d or unreck\'d, duly with love returns." Compare the effect.', answer: 'The archaic pair *reck\'d/unreck\'d* (from Old English *reccan*',
                  options: ['The archaic pair *reck\'d/unreck\'d* (from Old English *reccan*', 'noticed/unnoticed', 'Vocabulary in Context', '"Vocabulary in Context" means **finding synonyms** for difficult words'],
                  hint: 'Review "Literary Devices: Imagery and Metaphor" (c11_eng_h_cbse_10_008) to refresh how words create.',
                  misconception: 'Students believe "Vocabulary in Context" means **finding synonyms** for difficult words.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['**Ban synonyms:** Have the student write the *dictionary definition*, then the *contextual meaning*, then *why the poet.', '**Sound it out:** Read the line aloud replacing the key word with the synonym.', 'Ask: "What is lost in music?', '**Etymology dive:** Look up the root of *lave* (Latin *lavare* — to wash, bathe) and *reck* (Old English *reccan* —.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_011', difficulty: 'standard',
          question: 'Language and style in \'The Voice of the Rain\' — how the writer chose words.',
          hint: 'Review the definition and examples of personification in c11_eng_h_cbse_10_008 and.',
          misconception: 'Students often treat the poem\'s grammar as "incorrect" or "just poetic license" rather than deliberate craft.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'The Voice of the Rain\'',
                  options: ['Language and style in \'The Voice of the Rain\'', '\'The Voice of the Rain\' (Hornbill, ch', 'The plot/narrative arc of \'The Voice of the Rain\'', 'The setting of \'The Voice of the Rain\''],
                  hint: 'Review the definition and examples of personification in c11_eng_h_cbse_10_008 and c8_engl_ch4_15.',
                  misconception: 'Students often treat the poem\'s grammar as "incorrect" or "just poetic license" rather than deliberate craft.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Give the student three short sentences from the poem (one question, two rain statements).', 'Ask them to label each verb\'s tense and person.', 'Have them rewrite the rain\'s lines in past tense and discuss how the meaning shifts.', 'Finally, guide them to articulate a rule: "In poems where nature speaks, present simple + first person = living voice.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Voice of the Rain\' — questions answered straight.',
          hint: 'Review c11_eng_h_cbse_10_010 (Vocabulary) for word meanings and c11_eng_h_cbse_10_008.',
          misconception: 'Students treat inferential questions as \'opinion\' questions and write personal feelings ("I think the rain.',
          parts: [
                { id: 'a', prompt: 'What is the explicit name the rain gives itself in the poem "The Voice of the Rain"?', answer: 'The rain explicitly calls itself "the Poem of Earth"',
                  options: ['The rain explicitly calls itself "the Poem of Earth"', 'the song of the sea', 'the voice of nature'],
                  hint: 'Review c11_eng_h_cbse_10_010 (Vocabulary) for word meanings and c11_eng_h_cbse_10_008.',
                  misconception: 'Students treat inferential questions as \'opinion\' questions and write personal feelings ("I think the rain is beautiful") instead.' },
                { id: 'b', prompt: 'Answer this inferential question using textual evidence: "Why does the rain describe its cycle as \'eternal\'?" Provide two pieces of evidence from the poem.', answer: 'Evidence 1: "I rise',
                  options: ['Evidence 1: "I rise', 'eternal'],
                  hint: 'Review c11_eng_h_cbse_10_010 (Vocabulary) for word meanings and c11_eng_h_cbse_10_008.',
                  misconception: 'Students treat inferential questions as \'opinion\' questions and write personal feelings ("I think the rain is beautiful") instead.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give the student a 2-column table: Column A = Literal Qs from poem (5), Column B = Inferential Qs (5).', 'For each inferential Q, demand: "Quote the exact words that made you think this."', 'Practice the \'Because → Therefore\' chain: "Text says X → Therefore Y → Because Z (context)".', 'Use a think-aloud: Teacher models inferring "eternal" from "forever" + "returns" + cyclical structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
