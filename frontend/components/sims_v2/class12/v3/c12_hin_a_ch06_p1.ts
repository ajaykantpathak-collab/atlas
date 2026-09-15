import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p1: SimDef = {
    id: 'v3_c12_hin_a_ch06_p1',
    title: 'v/ksofj dkO; · Part 1/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'v/ksofj dkO; · Part 1/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_001', 'c12_hin_a_cbse_06_002', 'c12_hin_a_cbse_06_003', 'c12_hin_a_cbse_06_004', 'c12_hin_a_cbse_06_005', 'c12_hin_a_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section provides essential historical, cultural, and literary information about the poet Raskhan (रसखान), his life, the Bhakti movement context, and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine opening your Hindi textbook to Chapter 6 and seeing unfamiliar names like "रसखान", "जके पंजरेकुल", and verses in Braj Bhasha that feel distant.',
            decisions: [{ prompt: 'Who was Raskhan, and during which period did he live?', options: [
                { text: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c', outcome: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c. 1532–1623) born in a Muslim family, possibly.' },
                { text: 'He was a Mughal emperor', outcome: 'Not quite — Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic".', reveals: 'raskhan-s-muslim-background-makes' },
                { text: 'He wrote in Sanskrit', outcome: 'Not quite — Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic".', reveals: 'raskhan-s-muslim-background-makes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re asked to explain Raskhan\'s life journey to a friend who knows nothing about him.',
            decisions: [{ prompt: 'What is the chronological sequence of major life events presented in the biographical sketch of Raskhan before he composed "हजारी-जइके"?', options: [
                { text: 'Correct sequence: Birth in Kannauj (c', outcome: 'Correct sequence: Birth in Kannauj (c. 1532) → Early loss of parents → Education in Persian/Arabic.' },
                { text: 'life journey', outcome: 'Not quite — Students treat the biographical sketch as "just facts" and the poem as "just images," missing that.', reveals: 'students-treat-the-biographical-sketch' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing in a crowded Vrindavan temple courtyard in 1580 CE — the air thick with incense, the sound of dholak and cymbals, devotees swaying.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" in your own words, and give one example of each from Raskhan\'s "Jhānkī" poem (reference stanza number.', options: [
                { text: 'Setting = the concrete spatiotemporal and social coordinates of the narrative (e.g.,', outcome: 'Setting = the concrete spatiotemporal and social coordinates of the narrative (e.g., "Vrindavan\'s.' },
                { text: 'swaps the two (e', outcome: 'Not quite — Students treat setting as a passive "background" (time/place labels) and atmosphere as a simple.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet someone who completely changed their life path at age 30 — left their career, religion, and community to follow a spiritual calling.',
            decisions: [{ prompt: 'What is the primary difference between analyzing a protagonist in a fictional narrative versus analyzing a historical-poetic figure like.', options: [
                { text: 'In fictional narratives, the protagonist is a constructed character whose traits we infer', outcome: 'In fictional narratives, the protagonist is a constructed character whose traits we infer only from.' },
                { text: 'Both use dialogues and actions', outcome: 'Not quite — Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his.', reveals: 'students-treat-raskhan-s-conversion' },
                { text: 'कहा जाता है', outcome: 'Not quite — Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his.', reveals: 'students-treat-raskhan-s-conversion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re asked: "How does Yashoda\'s anxiety in the prose excerpt reveal Krishna\'s divinity?" Don\'t just retell the story.',
            decisions: [{ prompt: 'Identify the two supporting characters who appear in BOTH prose excerpts (जयदेव and मैथिलीशरण गुप्त) but are absent from the poem "हरि-केसव.', options: [
                { text: 'Correct answer: यशोदा (Krishna\'s foster mother) and रोहिणी/बलराम की माता (implied in', outcome: 'Correct answer: यशोदा (Krishna\'s foster mother) and रोहिणी/बलराम की माता (implied in second.' },
                { text: 'गोपियाँ', outcome: 'Not quite — Students treat supporting characters as "background decoration" and write only physical.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are explaining Raidas to a friend who has never read him.',
            decisions: [{ prompt: 'What is the primary theme of Raidas\'s poetry as presented in this chapter? State it in one clear sentence.', options: [
                { text: '**Correct answer:** The primary theme is that true devotion (निर्गुण भक्ति) is realized', outcome: '**Correct answer:** The primary theme is that true devotion (निर्गुण भक्ति) is realized through.' },
                { text: 'God is one', outcome: 'Not quite — **Misconception:** "The primary theme is \'Raidas was a great devotee who overcame caste.\'" **Why.', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'What comes next? v/ksofj dkO; · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — v/ksofj dkO; · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section provides essential.',
          hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read".',
          misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial.',
          parts: [
                { id: 'a', prompt: 'Who was Raskhan, and during which period did he live?', answer: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c',
                  options: ['Raskhan (रसखान) was a 16th–17th century Hindi poet (c', 'He was a Mughal emperor', 'He wrote in Sanskrit', 'unusual'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' },
                { id: 'b', prompt: 'The "Before You Read" section mentions Raskhan\'s works include *dohas*, *pads*, and *savaiyas*.', answer: 'It would be a *doha*',
                  options: ['It would be a *doha*', 'savaiya', 'unusual', 'syncretic'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' }
          ],
            remediations: { 'raskhan-s-muslim-background-makes': { steps: ['Re-read the "Before You Read" box *aloud* slowly, underlining every proper noun (Raskhan, Jake Panjrekul, Vrindavan.', 'Create a two-column table: left column = facts from the text (birth, turning point, works, death), right column.', 'Watch a 5-minute video on "Bhakti Movement and Syncretism" (e.g., NCERT Class 12 History Chapter 6 summary).', 'Re-attempt Diagnostic Question 2 and 5, checking if your answers now reflect the *internal logic of bhakti* rather than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Raskhan\'s poetry is merely an imitation of Surdas or other Hindu Bhakti poets." Defend your judgment with evidence from the context.', answer: 'The statement is false',
                  options: ['The statement is false', 'unusual', 'syncretic', 'He was a Muslim who wrote Hindu poems'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' },
                { id: 'b', prompt: 'Write a short paragraph (4–5 lines) in Hindi or English imagining Raskhan\'s inner monologue at the moment he decided to leave his earlier life and settle.', answer: 'A strong response might be: "The verse from Jake Panjrekul echoed in my heart',
                  options: ['A strong response might be: "The verse from Jake Panjrekul echoed in my heart', 'unusual', 'syncretic', 'He was a Muslim who wrote Hindu poems'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' }
          ],
            remediations: { 'raskhan-s-muslim-background-makes': { steps: ['Re-read the "Before You Read" box *aloud* slowly, underlining every proper noun (Raskhan, Jake Panjrekul, Vrindavan.', 'Create a two-column table: left column = facts from the text (birth, turning point, works, death), right column.', 'Watch a 5-minute video on "Bhakti Movement and Syncretism" (e.g., NCERT Class 12 History Chapter 6 summary).', 'Re-attempt Diagnostic Question 2 and 5, checking if your answers now reflect the *internal logic of bhakti* rather than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the organized sequence of events and the.',
          hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
          misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully.',
          parts: [
                { id: 'a', prompt: 'What is the chronological sequence of major life events presented in the biographical sketch of Raskhan before he composed "हजारी-जइके"?', answer: 'Correct sequence: Birth in Kannauj (c',
                  options: ['Correct sequence: Birth in Kannauj (c', 'life journey'],
                  hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
                  misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully structured.' },
                { id: 'b', prompt: 'Compare the narrative structure of the biographical prose (linear, chronological) with the poem\'s structure (imagistic, emotional escalation).', answer: 'Prose uses *chronological causality* (event A → event B) to establish historical',
                  options: ['Prose uses *chronological causality* (event A → event B) to establish historical', 'linear', 'descriptive'],
                  hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
                  misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully structured.' }
          ],
            remediations: { 'students-treat-the-biographical-sketch': { steps: ['Re-read the biographical sketch *only for sequence markers*: "पहले", "फिर", "बाद में", "तब" — mark each temporal.', 'Re-read the poem *stanza by stanza* asking: "What changes from previous stanza?" (Not "what is described?" but "what.', 'Complete node c11_hin_ar_cbse_01_002 (Class 11 Plot & Narrative Structure) Exercise 3 on "emotional arc as plot." 4.', 'Re-attempt Diagnostic Question 4 — if still stuck, map both texts on a two-column chart: Left = Prose Event, Right.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a literary.',
          hint: 'If unable to separate setting from atmosphere, return to Class 11 node.',
          misconception: 'Students treat setting as a passive "background" (time/place labels) and atmosphere as a simple adjective ("sad,".',
          parts: [
                { id: 'a', prompt: 'ANALYZE: Compare how the poem "Jhānkī" and the prose "Hajar-Jak" use the *Yamuna river* as a setting element.', answer: 'In the poem, "यमुना तट" is a *static, eternal backdrop* for Krishna\'s lila',
                  options: ['In the poem, "यमुना तट" is a *static, eternal backdrop* for Krishna\'s lila', 'both show Yamuna is holy'],
                  hint: 'If unable to separate setting from atmosphere, return to Class 11 node **c11_hin_ar_cbse_08_003**.',
                  misconception: 'Students treat setting as a passive "background" (time/place labels) and atmosphere as a simple adjective ("sad," "holy," "peaceful").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Re-read the poem aloud, circling every noun that names a place, object, or time (कुंज, यमुना, बांसुरी, रात, प्रातः).', 'For each circled word, write *one* sensory detail the text attaches to it (e.g., कुंज → "गहन" dense/dark; बांसुरी →.', 'Draw a two-column table: left column = setting detail, right column = feeling it evokes in *you* as reader.', 'Re-attempt Diagnostic Question 2 using this table as evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If stuck on "how to analyze a real person as character," revisit c11_hin_v_cbse_01_004.',
          misconception: 'Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his religion." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves systematically examining the central',
                  options: ['Character analysis of the protagonist involves systematically examining the central', 'The "Before You Read: Context and Background" section provides essential historical,', 'Plot and narrative structure refers to the organized sequence of events and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck on "how to analyze a real person as character," revisit c11_hin_v_cbse_01_004 (Vitan.',
                  misconception: 'Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his religion." This is historically.' }
          ],
            remediations: { 'students-treat-raskhan-s-conversion': { steps: ['Have the student re-read the biographical sketch (पृष्ठ 33-34) and underline every *process verb* — "सीखा" (learnt).', 'In the poems, highlight *first-person markers* ("मेरे", "मैं", "मुझको") and *address terms* ("प्राणनाथ", "मन मंदिर").', 'Create a two-column timeline: Left column = biographical actions (external), Right column = poetic expressions.', 'Rewrite the "conversion" sentence as: "Raskhan\'s *gradual alignment* of outer life (language, location, community) with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining secondary.',
          hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
          misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.',
          parts: [
                { id: 'a', prompt: 'In the second prose excerpt (मैथिलीशरण गुप्त), Yashoda sends Krishna to Vrindavan.', answer: 'Sample PEEL response: Point',
                  options: ['Sample PEEL response: Point', 'dramatic agency'],
                  hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
                  misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.' },
                { id: 'b', prompt: 'Compare the portrayal of maternal anxiety in Yashoda (prose excerpt 1) vs. the implied mother-figure in the poem "हरि-केसव की प्रीति".', answer: 'Correct answer: Prose (जयदेव) uses detailed narration',
                  options: ['Correct answer: Prose (जयदेव) uses detailed narration', 'both show love'],
                  hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
                  misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Re-read node c12_hin_a_cbse_06_004 (Protagonist Analysis) to recall how Krishna\'s divinity is established.', 'Take the prose excerpt 1 (जयदेव). Highlight every verb associated with Yashoda in one color, every verb associated with.', 'For each Yashoda-verb, ask: "What does this human action reveal about the divine child?"', 'Write 3 PEEL paragraphs linking one verb each to a specific aspect of Krishna\'s divinity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, review the "Character Analysis: Protagonist" (node 004) notes on Raidas\'s.',
          misconception: '**Misconception:** "The primary theme is \'Raidas was a great devotee who overcame caste.\'" **Why it\'s wrong:** This.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the biographical note (रैदास का जीवन-परिचय) and the poem "हरि के चरनन की प्रीति" jointly establish the primary theme.', answer: '**Correct answer:** The biographical note shows Raidas living the theme',
                  options: ['**Correct answer:** The biographical note shows Raidas living the theme', 'Biography tells his life'],
                  hint: 'If stuck, review the "Character Analysis: Protagonist" (node 004) notes on Raidas\'s *choices*.',
                  misconception: '**Misconception:** "The primary theme is \'Raidas was a great devotee who overcame caste.\'" **Why it\'s wrong:** This reduces a *universal.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['If a student cannot move beyond biography to theme: 1.', '**List & Group:** Have them write 10 key words from the chapter (e.g., चमड़ा, तिलक, माला, राजा, संत, हरि, मन, कर्म.', 'Group them into two columns: "External/Ritual" vs "Internal/Real".', '**Bridge:** Ask: "Which column does Raidas choose?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
