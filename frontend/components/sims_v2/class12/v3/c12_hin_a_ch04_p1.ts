import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p1: SimDef = {
    id: 'v3_c12_hin_a_ch04_p1',
    title: 'j?kqohj lgk; · Part 1/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'j?kqohj lgk; · Part 1/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_001', 'c12_hin_a_cbse_04_002', 'c12_hin_a_cbse_04_003', 'c12_hin_a_cbse_04_004', 'c12_hin_a_cbse_04_005', 'c12_hin_a_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is the preparatory step where students systematically gather information about the poet, the literary movement, the historical era, and the significance.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you open your Hindi textbook to Chapter 4 and see the poem "cukjl" by osQnkjukFk ¯lg.',
            decisions: [{ prompt: 'Who is the poet of "cukjl" and which literary tendency in modern Hindi poetry is he most associated with?', options: [
                { text: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*', outcome: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad* (Experimentalism) and.' },
                { text: 'a *Chhayavaad* poet like Nirala or a *Pragativad* poet like Nagarjun', outcome: 'Not quite — Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a short film with no dialogue — only visuals and background music. How do you know what\'s happening?',
            decisions: [{ prompt: 'Define "narrative arc" in the context of a narrative poem. List its five standard stages in order.', options: [
                { text: 'A narrative arc is the structural framework of a story comprising five stages: (1)', outcome: 'A narrative arc is the structural framework of a story comprising five stages: (1) Exposition.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students believe narrative poems *must* have named characters, dialogue, and linear chronology.', reveals: 'narrative-poems-must-have-named' },
                { text: 'beginning, middle, end" or confusing with thematic progression', outcome: 'Not quite — Students believe narrative poems *must* have named characters, dialogue, and linear chronology.', reveals: 'narrative-poems-must-have-named' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are describing your ancestral village to a friend who has never visited.',
            decisions: [{ prompt: 'What are the three core components of setting in a literary text?', options: [
                { text: 'The three core components are physical setting (geography, weather, objects), temporal', outcome: 'The three core components are physical setting (geography, weather, objects), temporal setting.' },
                { text: 'place and time', outcome: 'Not quite — Students often treat setting as a static backdrop — listing physical details like "there is.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are asked: "Is the street just a background in this poem, or does it have a personality?" Start by reading the poem aloud — notice how the street.',
            decisions: [{ prompt: 'In the poem "cukjl", which entity is the central figure around whom the imagery and action revolve?', options: [
                { text: 'The street (cukjl) itself is the protagonist', outcome: 'The street (cukjl) itself is the protagonist. A wrong answer (e.g., "the child" or "the poet").' },
                { text: 'the child', outcome: 'Not quite — Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because.', reveals: 'students-treat-character-analysis-as' },
                { text: 'the poet', outcome: 'Not quite — Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because.', reveals: 'students-treat-character-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are reading "जूही की कली" and you pause at the lines where a child speaks: "फिरंगी फूल है क्या?" — why does the poet suddenly introduce a child’s.',
            decisions: [{ prompt: 'Identify the three distinct supporting figures explicitly mentioned or strongly implied in the poem "जूही की कली" (excluding the.', options: [
                { text: 'The three supporting figures are: (1) the child (बच्चा/सीपी) who asks "फिरंगी फूल है', outcome: 'The three supporting figures are: (1) the child (बच्चा/सीपी) who asks "फिरंगी फूल है क्या?", (2).' },
                { text: 'supporting characters', outcome: 'Not quite — Students often believe "supporting characters" in a poem are only explicitly named humans (like the.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'lists only human characters (e', outcome: 'Not quite — Students often believe "supporting characters" in a poem are only explicitly named humans (like the.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'What comes next? j?kqohj lgk; · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — j?kqohj lgk; · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is the preparatory step where.',
          hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "cukjl" and which literary tendency in modern Hindi poetry is he most associated with?', answer: 'The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*',
                  options: ['The poet is Ashok Vajpeyi (अशोक वाजपेयी), a central figure of *Prayogvaad*', 'a *Chhayavaad* poet like Nirala or a *Pragativad* poet like Nagarjun'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' },
                { id: 'b', prompt: 'Explain in your own words why knowing the poet\'s birth year (1934) and the phrase "आधुनिक हिंदी कविता में प्रयोग" matters for reading "cukjl".', answer: '1934 places the poet\'s formative years in the 1950s–60s',
                  options: ['1934 places the poet\'s formative years in the 1950s–60s', 'it helps understand the poet\'s life'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' },
                { id: 'c', prompt: 'You are given an unseen poem titled "फ्लाईओवर के नीचे" by a poet born in 1965, described in the textbook as "समकालीन कविता के प्रमुख हस्ताक्षर, नगरीय यथार्थ के.', answer: 'Step 1: Identify period',
                  options: ['Step 1: Identify period', 'beautiful description of nature', 'rhyming couplets'],
                  hint: 'If stuck, review Class 11 "Before You Read" nodes (e.g., c11_hin_ar_cbse_01_001) and practice: take.',
                  misconception: 'Students treat the "Before You Read" box as a *biographical fact file* to memorize for 1-mark questions ("कवि का जन्म कब हुआ?").' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot convert the poet\'s intro into reading predictions: (1) Have them re-read *only* the NCERT intro for.', '(2) For each adjective, write one question they will ask the poem (e.g., "चित्रात्मक" → "Which three images are most.', '(3) Read the poem *only* to answer those questions.', '(4) Debrief: "Which prediction held?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_002', difficulty: 'standard',
          question: 'Narrative structure in poetry refers to the organized sequence of events.',
          hint: 'If stuck on mapping stanzas to stages, review "narrative arc in poetry" from.',
          misconception: 'Students believe narrative poems *must* have named characters, dialogue, and linear chronology to have a "plot." They.',
          parts: [
                { id: 'a', prompt: 'Given this 4-line excerpt from an unseen narrative poem: "पहले आया सन्नाटा, फिर पदचाप / फिर दरवाज़ा खुला, फिर कोई न आया / फिर धूप झुकी दीवार पर, फिर छाया / फिर.', answer: 'Line 1: Exposition (establishes silence/emptiness)',
                  options: ['Line 1: Exposition (establishes silence/emptiness)', 'climax', 'label line 2 as "climax" confuse surprise with structural peak'],
                  hint: 'If stuck on mapping stanzas to stages, review "narrative arc in poetry" from c11_hin_ar_cbse_01_002.',
                  misconception: 'Students believe narrative poems *must* have named characters, dialogue, and linear chronology to have a "plot." They read चुकजल as.' }
          ],
            remediations: { 'narrative-poems-must-have-named': { steps: ['Have the student watch a 2-minute silent short film (e.g., "The Red Balloon" clip) and draw a 5-box storyboard labeling.', 'Map the same 5 boxes onto चुकजל\'s stanzas — well activity = rising action, reflection = climax, stillness = resolution.', 'Repeat for फ्नेक using the child\'s *changing understanding* as the "character."', 'Re-attempt Diagnostic Questions 2 and 4. If confusion persists, revisit c11_hin_ar_cbse_01_002 (Class 11 Plot and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a literary.',
          hint: 'If stuck, review "annotating poetry for sensory verbs" from c11_hin_ar_cbse_01_003 and.',
          misconception: 'Students often treat setting as a static backdrop — listing physical details like "there is a banyan tree, a pond.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', '"Before You Read: Context and Background" is the preparatory step where students', 'Narrative structure in poetry refers to the organized sequence of events, images, and', 'Character analysis of a protagonist in poetry involves identifying the central figure'],
                  hint: 'If stuck, review "annotating poetry for sensory verbs" from c11_hin_ar_cbse_01_003 and practice.',
                  misconception: 'Students often treat setting as a static backdrop — listing physical details like "there is a banyan tree, a pond, fields" — and atmosphere.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student reread the poem and underline every verb that shows action or change (e.g., vkrk, mBrk, mM+rh, pyrs.', 'Ask: "Which of these verbs describe nature?', 'Which describe time itself?" 3.', 'Then, have them write one sentence for each verb explaining what it adds to the village\'s *feel*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist in poetry involves identifying the central.',
          hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Utsaah" where the cloud is protagonist.',
          misconception: 'Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because they\'re used to story.',
          parts: [
                { id: 'a', prompt: 'In the poem "cukjl", which entity is the central figure around whom the imagery and action revolve?', answer: 'The street (cukjl) itself is the protagonist',
                  options: ['The street (cukjl) itself is the protagonist', 'the child', 'the poet'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Utsaah" where the cloud is protagonist — analyze its.',
                  misconception: 'Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because they\'re used to story characters.' },
                { id: 'b', prompt: 'Apply the concept of "character through action" to the line: "[kkyh dVksjksa esa olar dk mrjuk!" What does this action reveal about the street\'s character?', answer: 'The street "swallows the breath in broken lanes"',
                  options: ['The street "swallows the breath in broken lanes"', 'pollution'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Utsaah" where the cloud is protagonist — analyze its.',
                  misconception: 'Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because they\'re used to story characters.' },
                { id: 'c', prompt: 'Compare the protagonist of "cukjl" (the street) with the protagonist of "fn\'kk" (the child). What shared trait emerges from how both are portrayed?', answer: 'Both exhibit quiet endurance without complaint',
                  options: ['Both exhibit quiet endurance without complaint', 'both are poor'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 "Utsaah" where the cloud is protagonist — analyze its.',
                  misconception: 'Students treat "character analysis" as listing physical traits (dark, narrow, crowded) because they\'re used to story characters.' }
          ],
            remediations: { 'students-treat-character-analysis-as': { steps: ['Re-read stanza 1-2 aloud, circling every verb whose subject is the street.', 'Classify each verb: biological (breathes, swallows), mechanical (fills, breaks), emotional (reaches).', 'Write one sentence: "The street is a character because it ______." 4.', 'Re-attempt Diagnostic Question 3 with this verb-list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in a poem involves identifying the.',
          hint: 'If stuck, review "Personification as Characterization" in Class 11 poetry nodes.',
          misconception: 'Students often believe "supporting characters" in a poem are only explicitly named humans (like the child).',
          parts: [
                { id: 'a', prompt: 'Apply the "character function" framework to the gardener (माली): using two pieces of textual evidence, show how the gardener’s implied presence establishes the.', answer: 'Step 1: Locate the line "माली ने कहा"',
                  options: ['Step 1: Locate the line "माली ने कहा"', 'supporting characters'],
                  hint: 'If stuck, review "Personification as Characterization" in Class 11 poetry nodes.',
                  misconception: 'Students often believe "supporting characters" in a poem are only explicitly named humans (like the child).' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['Re-read the poem aloud, circling every noun that acts or is addressed (बच्चा, माली, रात, प्रभात, ओस).', 'For each, write one line of evidence and one inference about its attitude toward the bud.', 'Compare your list with the worked examples below.', 'Re-attempt Diagnostic Questions 3 and 4, focusing on non-human figures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "supporting characters" in a poem are only explicitly named humans (like the child).',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The poet-speaker is the most important supporting character because he mediates all other figures." Defend or refute using evidence from.', answer: 'Refute: the poet-speaker is the observer, not a supporting character',
                  options: ['Refute: the poet-speaker is the observer, not a supporting character', 'supporting characters'],
                  hint: 'If stuck, review "Personification as Characterization" in Class 11 poetry nodes.',
                  misconception: 'Students often believe "supporting characters" in a poem are only explicitly named humans (like the child).' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['Re-read the poem aloud, circling every noun that acts or is addressed (बच्चा, माली, रात, प्रभात, ओस).', 'For each, write one line of evidence and one inference about its attitude toward the bud.', 'Compare your list with the worked examples below.', 'Re-attempt Diagnostic Questions 3 and 4, focusing on non-human figures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'Review Class 11 Antra Chapter 1 (c11_hin_ar_cbse_01_006) worked example on thematic.',
          misconception: 'Students consistently write: \'The theme of the poem is the drying pond\' or \'The message is that water is precious.\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea',
                  options: ['The primary theme of a literary work is its central, unifying idea', '"Before You Read: Context and Background" is the preparatory step where students', 'Narrative structure in poetry refers to the organized sequence of events, images, and', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review Class 11 Antra Chapter 1 (c11_hin_ar_cbse_01_006) worked example on thematic statement.',
                  misconception: 'Students consistently write: \'The theme of the poem is the drying pond\' or \'The message is that water is precious.\' This error arises.' }
          ],
            remediations: { 'students-consistently-write-the-theme': { steps: ['If a student cannot distinguish subject from theme: (1) Give them three familiar texts (e.g., \'The Road Not Taken\'.', '(2) Use the formula: Subject = What happens (noun phrase); Theme = What it means about [life/humanity/time] (complete.', '(3) Have them re-read stanza 3 of \'cukjl\' and complete: \'The pond is not just a pond; the pond is a ______ of ______.\'.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
