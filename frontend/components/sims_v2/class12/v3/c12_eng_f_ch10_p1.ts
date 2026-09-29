import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch10_p1: SimDef = {
    id: 'v3_c12_eng_f_ch10_p1',
    title: 'An Elementary School Classroom in a Slum (Poem) · Part 1/3',
    subtitle: 'The map on the wall is the lie the classroom tells',
    classLevel: 12, subject: 'eng_f', topic: 'An Elementary School Classroom in a Slum (Poem) · Part 1/3',
    chapters: ['c12_eng_f_ch10'],
    nodeIds: ['c12_eng_f_cbse_10_001', 'c12_eng_f_cbse_10_002', 'c12_eng_f_cbse_10_003', 'c12_eng_f_cbse_10_004', 'c12_eng_f_cbse_10_005', 'c12_eng_f_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social critic', intro: 'A socialist poet who fought fascism walks into a slum school and sees the education system itself as the enemy.', goal: 'Read Spender\'s poem as a critique of systemic inequality, not a sentimental portrait of poverty.' },
    discovery: {
        question: 'Shakespeare\'s head and a world map hang on a slum classroom\'s wall — and Spender calls them \'wicked.\' Why would pictures of a bigger world be cruel?',
        options: ['They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education', 'They\'re just ugly pictures', 'Shakespeare is too hard for children', 'Maps are outdated'],
        answer: 'They advertise a civilisation that permanently excludes these children — teaching them a world they can never enter is taunt, not education',
        hook: 'This isn\'t a sad poem about poor kids — it\'s an indictment of a system that uses education to reinforce the class wall. \'History is theirs whose language is the sun\': control language and you control who gets written into history. Sentimental pity is the reading the poem rejects.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'An Elementary School Classroom in a Slum\' (Flamingo, ch. 10) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand inside that fog-dimmed classroom: weigh the rootless-weeds children against the civilised dome on the wall, then judge Spender\'s closing appeal to governor and inspector — real demand or rhetorical dare?',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'An Elementary School Classroom in a Slum\', then the period, then the literary context — background turns a text from a puzzle into.',
            decisions: [{ prompt: 'Who is the poet of "An Elementary School Classroom in a Slum," and what major historical event influenced his political views?', options: [
                { text: 'The poet is Stephen Spender, a 20th-century English poet', outcome: 'The poet is Stephen Spender, a 20th-century English poet. His political views were heavily.' },
                { text: 'poor children', outcome: 'Not quite — Students often think this poem is only about "poor children" and write sentimental descriptions.', reveals: 'this-poem-is-only-about' },
                { text: 'a different poet or citing World War I', outcome: 'Not quite — Students often think this poem is only about "poor children" and write sentimental descriptions.', reveals: 'this-poem-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'An Elementary School Classroom in a Slum\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the.',
            decisions: [{ prompt: 'How many stanzas are there in the poem "Keeping Quiet", and what is the general pattern of line lengths across them?', options: [
                { text: 'The poem has five stanzas of varying line lengths: the first stanza has 6 lines, the', outcome: 'The poem has five stanzas of varying line lengths: the first stanza has 6 lines, the second has 6.' },
                { text: 'plot and narrative structure', outcome: 'Not quite — Students often think "plot and narrative structure" only applies to stories with characters and.', reveals: 'plot-and-narrative-structure-only' },
                { text: 'all stanzas are equal', outcome: 'Not quite — Students often think "plot and narrative structure" only applies to stories with characters and.', reveals: 'plot-and-narrative-structure-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'An Elementary School Classroom in a Slum\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting described in the first stanza of the poem? List at least three concrete details.', options: [
                { text: 'The first stanza describes an elementary school classroom in a slum with details such as:', outcome: 'The first stanza describes an elementary school classroom in a slum with details such as: "slag.' },
                { text: 'a beautiful classroom with modern facilities', outcome: 'Not quite — Students often treat setting as a static list of physical objects ("there is a map, a picture,.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'An Elementary School Classroom in a Slum\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist of "An Elementary School Classroom in a Slum"? Give a one-sentence answer.', options: [
                { text: 'The protagonist is the collective group of slum children, represented through three', outcome: 'The protagonist is the collective group of slum children, represented through three individual.' },
                { text: 'the tall girl', outcome: 'Not quite — Students treat the three children in stanza 1 as separate supporting characters and pick one.', reveals: 'students-treat-the-three-children' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'An Elementary School Classroom in a Slum\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the four distinct supporting characters (children) described in the poem and the one key physical phrase associated with each.', options: [
                { text: 'The four supporting characters are: (1) the tall girl', outcome: 'The four supporting characters are: (1) the tall girl — "head weighed down"; (2) the paper-seeming.' },
                { text: 'rootless weeds', outcome: 'Not quite — Students treat the supporting characters as named individuals with backstories (e.g., "The tall.', reveals: 'students-treat-the-supporting-characters' },
                { text: 'pallor', outcome: 'Not quite — Students treat the supporting characters as named individuals with backstories (e.g., "The tall.', reveals: 'students-treat-the-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'An Elementary School Classroom in a Slum\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "An Elementary School Classroom in a Slum" in one complete sentence. Do not use the word "theme" in your answer.', options: [
                { text: 'Correct answer: The poem asserts that systemic social inequality condemns slum children', outcome: 'Correct answer: The poem asserts that systemic social inequality condemns slum children to.' },
                { text: 'The theme is poverty', outcome: 'Not quite — Students consistently confuse "topic" with "theme" and write "The theme.', reveals: 'students-consistently-confuse-topic-with' },
                { text: 'The poem shows slum children are sad', outcome: 'Not quite — Students consistently confuse "topic" with "theme" and write "The theme.', reveals: 'students-consistently-confuse-topic-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at a slum school, you propose bright wall maps and storybooks of green valleys \'to inspire them\'. Spender\'s poem would ask harder questions.',
            decisions: [{ prompt: 'Do the decorations fix anything?', options: [
                { text: 'Not by themselves — the poem calls the map \'wicked\' when it pictures a world the children can\'t reach; real help is systemic: nutrition, safe space, open pathways out of the slum.', outcome: 'Images of a world that excludes them only taunt; the poem demands changed conditions, not prettier walls.' },
                { text: 'Yes — showing them beautiful worlds is the first step out.', outcome: 'That\'s the poem\'s exact critique: windows that open onto unreachable worlds are cruelty, not education.', reveals: 'tokenism-as-reform' },
                { text: 'Neither — their fate is sealed by birth, so effort is wasted.', outcome: 'Spender writes against that determinism: the classroom fails them because society lets it, which is changeable.', reveals: 'poverty-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a classroom as a political argument — and hear the difference between sympathy and a demand to break the walls.',
            decisions: [{ prompt: 'What comes next? An Elementary School Classroom in a Slum (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — An Elementary School Classroom in a Slum (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_001', difficulty: 'standard',
          question: '\'An Elementary School Classroom in a Slum\' (Flamingo, ch. 10) — the context and.',
          hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill poem (e.g.',
          misconception: 'Students often think this poem is only about "poor children" and write sentimental descriptions of poverty.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "An Elementary School Classroom in a Slum," and what major historical event influenced his political views?', answer: 'The poet is Stephen Spender, a 20th-century English poet',
                  options: ['The poet is Stephen Spender, a 20th-century English poet', 'poor children', 'a different poet or citing World War I'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill poem (e.g.',
                  misconception: 'Students often think this poem is only about "poor children" and write sentimental descriptions of poverty.' },
                { id: 'b', prompt: 'Apply the concept of "juxtaposition" to the poem\'s opening stanza: identify two contrasting images and explain how the poet uses them to establish the central.', answer: 'Step 1: Identify the image of the children',
                  options: ['Step 1: Identify the image of the children', 'poor children', 'lists images without explaining the contrast fails to apply the literary concept'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill poem (e.g.',
                  misconception: 'Students often think this poem is only about "poor children" and write sentimental descriptions of poverty.' },
                { id: 'c', prompt: 'Analyze how the poet\'s use of the phrase "history is theirs whose language is the sun" connects to the theme of empowerment through education.', answer: 'The phrase suggests that those who control language (the "sun"',
                  options: ['The phrase suggests that those who control language (the "sun"', 'poor children'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Hornbill poem (e.g.',
                  misconception: 'Students often think this poem is only about "poor children" and write sentimental descriptions of poverty.' }
          ],
            remediations: { 'this-poem-is-only-about': { steps: ['If the student falls into the sentimental trap, do: 1) Re-read the final stanza and underline every verb that implies.', 'The children or the powerful?" 3) Connect to the Spanish Civil War context: Spender believed in collective action, not.', '4) Revisit the textbook\'s "Before you read" questions and answer them with a focus on *structural change*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'An Elementary School Classroom in a Slum\' — what.',
          hint: 'Review Class 11 poem structure analysis (c11_eng_h_cbse_10_002) and practice.',
          misconception: 'Students often think "plot and narrative structure" only applies to stories with characters and events, so they look.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'An Elementary School Classroom in a Slum\'',
                  options: ['The plot/narrative arc of \'An Elementary School Classroom in a Slum\'', '\'An Elementary School Classroom in a Slum\' (Flamingo, ch', 'The setting of \'An Elementary School Classroom in a Slum\'', 'Character analysis in \'An Elementary School Classroom in a Slum\''],
                  hint: 'Review Class 11 poem structure analysis (c11_eng_h_cbse_10_002) and practice stanza-by-stanza.',
                  misconception: 'Students often think "plot and narrative structure" only applies to stories with characters and events, so they look for a storyline in the.' }
          ],
            remediations: { 'plot-and-narrative-structure-only': { steps: ['If the student cannot identify the stanza-wise progression, have them physically mark the poem: draw a box around each.', 'Then re-read the poem aloud, pausing longer between stanzas to feel the shifts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_003', difficulty: 'standard',
          question: 'The setting of \'An Elementary School Classroom in a Slum\' — the place, time and.',
          hint: 'If stuck, review "Imagery and Sensory Language" from Class 11 Hornbill.',
          misconception: 'Students often treat setting as a static list of physical objects ("there is a map, a picture, a window") and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'An Elementary School Classroom in a Slum\'',
                  options: ['The setting of \'An Elementary School Classroom in a Slum\'', '\'An Elementary School Classroom in a Slum\' (Flamingo, ch', 'The plot/narrative arc of \'An Elementary School Classroom in a Slum\'', 'Character analysis in \'An Elementary School Classroom in a Slum\''],
                  hint: 'If stuck, review "Imagery and Sensory Language" from Class 11 Hornbill (c11_eng_h_cbse_01_008) and.',
                  misconception: 'Students often treat setting as a static list of physical objects ("there is a map, a picture, a window") and atmosphere as a single label.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read only stanza one and underline every noun/adjective describing the physical environment.', 'Ask: "If you stood in this room, what would you smell, hear, feel on your skin?" to ground setting in sensory.', 'Then re-read stanza two and three, marking every verb.', 'Compare the verb types: stanza one (passive/state verbs: "are," "sit," "weigh"), stanza three (imperative/action verbs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis in \'An Elementary School Classroom in a Slum\' — the central.',
          hint: 'If stuck, review "synecdoche" in c12_eng_f_cbse_10_008 (Literary Devices: Imagery and.',
          misconception: 'Students treat the three children in stanza 1 as separate supporting characters and pick one as "the protagonist".',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "composite protagonist" to analyse the line "The stunted, unlucky heir / Of twisted bones, reciting a father\'s gnarled disease." What does.', answer: 'This portrait adds the dimension of intergenerational inheritance',
                  options: ['This portrait adds the dimension of intergenerational inheritance', 'the boy is sick', 'he has twisted bones'],
                  hint: 'If stuck, review "synecdoche" in c12_eng_f_cbse_10_008 (Literary Devices: Imagery and Metaphor) and.',
                  misconception: 'Students treat the three children in stanza 1 as separate supporting characters and pick one as "the protagonist" (usually the tall girl.' }
          ],
            remediations: { 'students-treat-the-three-children': { steps: ['Re-read stanza 1 aloud, numbering the three portraits 1, 2, 3.', 'For each, write: "This child represents ______ aspect of slum childhood." 3.', 'Compare your three answers — if they are different facets of the *same* systemic issue (physical burden, mental.', 'Revisit c12_eng_f_cbse_10_003 (Setting and Atmosphere) to see how the classroom setting *creates* this collective.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the three children in stanza 1 as separate supporting characters and pick one as "the protagonist".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The tall girl with her weighed-down head is the true protagonist because she appears first and gets the most description." Defend.', answer: 'Refute',
                  options: ['Refute', 'first-mentioned = main character'],
                  hint: 'If stuck, review "synecdoche" in c12_eng_f_cbse_10_008 (Literary Devices: Imagery and Metaphor) and.',
                  misconception: 'Students treat the three children in stanza 1 as separate supporting characters and pick one as "the protagonist" (usually the tall girl.' }
          ],
            remediations: { 'students-treat-the-three-children': { steps: ['Re-read stanza 1 aloud, numbering the three portraits 1, 2, 3.', 'For each, write: "This child represents ______ aspect of slum childhood." 3.', 'Compare your three answers — if they are different facets of the *same* systemic issue (physical burden, mental.', 'Revisit c12_eng_f_cbse_10_003 (Setting and Atmosphere) to see how the classroom setting *creates* this collective.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_005', difficulty: 'standard',
          question: 'Supporting characters in \'An Elementary School Classroom in a Slum\' — the.',
          hint: 'If stuck on metaphor-to-meaning, revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor).',
          misconception: 'Students treat the supporting characters as named individuals with backstories (e.g., "The tall girl is named Meena and.',
          parts: [
                { id: 'a', prompt: 'List the four distinct supporting characters (children) described in the poem and the one key physical phrase associated with each.', answer: 'The four supporting characters are: (1) the tall girl',
                  options: ['The four supporting characters are: (1) the tall girl', 'rootless weeds', 'pallor', 'rootless weeds" or "pallor" as characters'],
                  hint: 'If stuck on metaphor-to-meaning, revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor) worked.',
                  misconception: 'Students treat the supporting characters as named individuals with backstories (e.g., "The tall girl is named Meena and her father is.' },
                { id: 'b', prompt: 'Explain in your own words why the poet describes the tall girl\'s head as "weighed down" rather than simply saying she is tired or sad.', answer: '"Weighed down" suggests a chronic, physical burden (malnutrition, premature',
                  options: ['"Weighed down" suggests a chronic, physical burden (malnutrition, premature', 'sadness', 'tiredness'],
                  hint: 'If stuck on metaphor-to-meaning, revisit c12_eng_f_cbse_10_008 (Imagery and Metaphor) worked.',
                  misconception: 'Students treat the supporting characters as named individuals with backstories (e.g., "The tall girl is named Meena and her father is.' }
          ],
            remediations: { 'students-treat-the-supporting-characters': { steps: ['Re-read Stanza 2 *only*, covering the rest of the poem.', 'Draw four stick figures in the margin, labeling each with the *exact phrase* from the text (e.g., "head weighed down".', 'For each, write one sentence: "This phrase shows ______ about poverty\'s effect on ______." 4.', 'Check node c12_eng_f_cbse_10_008 (Imagery and Metaphor) to rehearse metaphor analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of \'An Elementary School Classroom in a Slum\' — the central.',
          hint: 'If stuck, return to node 003 (Setting and Atmosphere) and re-analyze how the physical.',
          misconception: 'Students consistently confuse "topic" with "theme" and write "The theme is poverty/inequality/education" — single.',
          parts: [
                { id: 'a', prompt: 'The poem ends with: "Break O break open till they break the town / And show the children to green fields, and make their world / Run azure on gold sands, and.', answer: 'Correct answer: The primary theme',
                  options: ['Correct answer: The primary theme', 'The poet wants the children to go on a picnic', 'The poet wants better schools', 'and write'],
                  hint: 'If stuck, return to node 003 (Setting and Atmosphere) and re-analyze how the physical environment.',
                  misconception: 'Students consistently confuse "topic" with "theme" and write "The theme is poverty/inequality/education" — single nouns.' }
          ],
            remediations: { 'students-consistently-confuse-topic-with': { steps: ['If a student cannot distinguish topic from theme: (1) Give them three familiar stories (e.g., Cinderella, The Tortoise.', '(topic) What does it say about that?', '(theme)." (2) Have them re-read stanza 1 and 4 side-by-side: "What changes?', 'What does the change *argue*?" (3) Assign a 3-sentence theme statement template: "The poem argues that [systemic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
