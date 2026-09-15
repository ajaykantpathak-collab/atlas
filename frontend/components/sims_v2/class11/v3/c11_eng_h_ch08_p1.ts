import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch08_p1: SimDef = {
    id: 'v3_c11_eng_h_ch08_p1',
    title: 'Silk Road · Part 1/3',
    subtitle: 'Follow a geographer\'s pilgrimage where description is not the absence of plot.',
    classLevel: 11, subject: 'eng_h', topic: 'Silk Road · Part 1/3',
    chapters: ['c11_eng_h_ch08'],
    nodeIds: ['c11_eng_h_cbse_08_001', 'c11_eng_h_cbse_08_002', 'c11_eng_h_cbse_08_003', 'c11_eng_h_cbse_08_004', 'c11_eng_h_cbse_08_005', 'c11_eng_h_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a traveller-log analyst riding to Kailash', intro: 'Altitude headaches, a grim town called Hor, a stranger named Norbu — the plot is the road, but the meaning is in the pauses.', goal: 'Trace the travelogue\'s linear-yet-layered structure and read its title as metaphor.' },
    discovery: {
        question: 'Middleton drives a modern highway toward Mount Kailash — so why is the account called \'Silk Road\'?',
        options: ['The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection', 'He was smuggling silk along NH 219', 'The title is ironic — the region never saw the real Silk Road', 'Pilgrims still carry bolts of silk to Kailash'],
        answer: 'The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection',
        hook: 'The old road moved fabric; Middleton\'s road moves meaning — same track, different cargo.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential historical, geographical, cultural, and literary information students need to comprehend the travelogue.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order the journey — Ravu to Hor to Darchen to the pass — and separate the action from the reflective pauses inside the linear timeline.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a documentary about a remote Himalayan pilgrimage — you\'d want to know where it is, why people go there, and what makes the.',
            decisions: [{ prompt: 'What was the historical Silk Road, and why is it called a "road" when it was actually a network of routes?', options: [
                { text: 'The Silk Road was a network of interconnected trade routes linking China, Central Asia,', outcome: 'The Silk Road was a network of interconnected trade routes linking China, Central Asia, the Middle.' },
                { text: 'a single road built by the Romans', outcome: 'Not quite — Students often think "Silk Road" refers only to the historical trade route and miss that the.', reveals: 'silk-road-refers-only-to' },
                { text: 'Silk Road', outcome: 'Not quite — Students often think "Silk Road" refers only to the historical trade route and miss that the.', reveals: 'silk-road-refers-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Think about the last time you went on a trip. When you tell someone about it, do you start from the beginning and go in order, or do you jump to the most.',
            decisions: [{ prompt: 'What is the narrative point of view used in "Silk Road"?', options: [
                { text: 'The narrative point of view is first-person ("I")', outcome: 'The narrative point of view is first-person ("I"). A wrong answer (e.g., "third-person".' },
                { text: 'third-person', outcome: 'Not quite — Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just.', reveals: 'students-often-mistake-the-travelogue' },
                { text: 'omniscient', outcome: 'Not quite — Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just.', reveals: 'students-often-mistake-the-travelogue' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are planning a solo trek to a remote Himalayan pilgrimage site at 15,000 feet. What would you pack? What fears would you have?',
            decisions: [{ prompt: 'Define "atmosphere" in a literary context and distinguish it from "setting" using a one-sentence example from any text you have read.', options: [
                { text: 'Atmosphere is the emotional mood (e.g., tension, serenity, dread) evoked by the setting\'s', outcome: 'Atmosphere is the emotional mood (e.g., tension, serenity, dread) evoked by the setting\'s sensory.' },
                { text: 'The Tunnel', outcome: 'Not quite — Students treat setting as a static backdrop (a map location) rather than an active participant.', reveals: 'students-treat-setting-as-a' },
                { text: 'dark, damp railway tunnel', outcome: 'Not quite — Students treat setting as a static backdrop (a map location) rather than an active participant.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are describing a close friend to someone who has never met them — you wouldn\'t just say "they\'re nice"; you\'d give examples: "Remember when they.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in *Silk Road*, and how does it shape our access to the protagonist\'s character?', options: [
                { text: 'The text uses first-person narrative perspective ("I"), giving direct access to the', outcome: 'The text uses first-person narrative perspective ("I"), giving direct access to the protagonist\'s.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often treat the narrator as a transparent window onto the landscape, ignoring that *every.', reveals: 'students-often-treat-the-narrator' },
                { text: 'first-person narrator', outcome: 'Not quite — Students often treat the narrator as a transparent window onto the landscape, ignoring that *every.', reveals: 'students-often-treat-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re planning a trek to Mount Kailash with a stranger as your driver—what would you learn about yourself from their calm during a snowstorm?',
            decisions: [{ prompt: 'List the four named supporting characters in "Silk Road" and state one specific action each takes that directly affects the narrator\'s.', options: [
                { text: 'Tsetan drives the narrator safely through treacherous terrain and arranges medical help', outcome: 'Tsetan drives the narrator safely through treacherous terrain and arranges medical help at Darchen.' },
                { text: 'they helped', outcome: 'Not quite — Students treat supporting characters as "background information" and write descriptive summaries.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are planning a difficult trek to a high-altitude lake in Ladakh — you pack gear, check weather, hire a guide.',
            decisions: [{ prompt: 'What is the precise difference between a \'plot summary\' and a \'primary theme\' in a travelogue like *Silk Road*?', options: [
                { text: 'A plot summary recounts *what happens* sequentially (e.g., "Middleton travels from Ravu', outcome: 'A plot summary recounts *what happens* sequentially (e.g., "Middleton travels from Ravu to Mount.' },
                { text: 'He met Tsetan, then Norbu', outcome: 'Not quite — **Students conflate \'theme\' with \'topic\' or \'dominant impression\'.** They write: "The theme is the.', reveals: 'students-conflate-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a geography-literature crossover project you must classify Nick Middleton\'s \'Silk Road\'. A teammate files it under \'history of the ancient trade route\' and another under \'pilgrimage narrative by a devout traveller to Mount Kailash\'.',
            decisions: [{ prompt: 'What kind of text is it, and what does the title actually mean?', options: [
                { text: 'A modern travelogue: a British geographer (observer, not pilgrim) drives a modern highway that follows the ancient Silk Road toward Kailash — sacred to Hindus, Buddhists, Jains and Bon alike. The title is metaphorical: the \'silk\' moving along the road now is stories, beliefs and human exchange, not fabric.', outcome: 'Genre shapes reading: travel writing blends personal journey, factual observation and reflection — the trade-route history is backdrop, not subject.' },
                { text: 'It\'s a history essay about silk trade — the road trip is just an excuse.', outcome: 'The route\'s history is context; the text\'s engine is the present-day journey and the people met — a travelogue, not a trade monograph.', reveals: 'title-is-literal-trade-route' },
                { text: 'It\'s a pilgrimage account — anyone travelling toward Kailash is a pilgrim.', outcome: 'Middleton is an observing geographer; his lens is landscape and culture, not devotion — mistaking narrator for pilgrim misreads the whole register.', reveals: 'traveller-equals-pilgrim' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'A travelogue can be a straight line on the map and still move in circles inside the traveller\'s head.',
            decisions: [{ prompt: 'What comes next? Silk Road · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Silk Road · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If stuck, review Class 10 "Glimpses of India" (c10_engl_cbse_05_001-008) — specifically.',
          misconception: 'Students often think "Silk Road" refers only to the historical trade route and miss that the chapter\'s title.',
          parts: [
                { id: 'a', prompt: 'Given a map of Asia, identify the Tibetan Plateau, the Himalayas, the Karakoram Range, and the approximate route of the ancient Silk Road through the.', answer: 'The Tibetan Plateau lies north of the Himalayas, averaging 4,500m elevation',
                  options: ['The Tibetan Plateau lies north of the Himalayas, averaging 4,500m elevation', 'Silk Road', 'The Adventure'],
                  hint: 'If stuck, review Class 10 "Glimpses of India" (c10_engl_cbse_05_001-008) — specifically the Coorg.',
                  misconception: 'Students often think "Silk Road" refers only to the historical trade route and miss that the chapter\'s title is metaphorical — Middleton.' },
                { id: 'b', prompt: 'Compare and contrast a travelogue with a diary entry and a geographical report.', answer: 'A diary is private, immediate, subjective, and unstructured',
                  options: ['A diary is private, immediate, subjective, and unstructured', 'just a daily record', 'Silk Road', 'The Adventure'],
                  hint: 'If stuck, review Class 10 "Glimpses of India" (c10_engl_cbse_05_001-008) — specifically the Coorg.',
                  misconception: 'Students often think "Silk Road" refers only to the historical trade route and miss that the chapter\'s title is metaphorical — Middleton.' }
          ],
            remediations: { 'silk-road-refers-only-to': { steps: ['Show a 2-minute map animation of the Silk Road\'s shifting routes over 1,500 years — emphasize "network, not road." 2.', 'Use a four-quadrant diagram: label each quadrant with one religion\'s name for Kailash; have students fill in the.', 'Give three short texts (diary, report, travelogue paragraph); ask students to label each and justify using.', 'Clarify author identity: display Middleton\'s photo, credentials (Oxford geographer, *Deserts* author), and distinguish.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure in "Silk Road" refers to the sequence of events.',
          hint: 'Work step by step.',
          misconception: 'Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just a list of places.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in "Silk Road"?', answer: 'The narrative point of view is first-person ("I")',
                  options: ['The narrative point of view is first-person ("I")', 'third-person', 'omniscient'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just a list of places.' },
                { id: 'b', prompt: 'Explain why the author chooses a chronological structure for his travelogue instead of a thematic or flashback structure.', answer: 'The chronological structure mirrors the physical journey, allowing the reader to',
                  options: ['The chronological structure mirrors the physical journey, allowing the reader to', 'it\'s easier to write'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just a list of places.' }
          ],
            remediations: { 'students-often-mistake-the-travelogue': { steps: ['Have the student list the major events in order on a timeline.', 'Identify which events are external actions (driving, meeting people) and which are internal reflections (thoughts about.', 'Show how the reflections are embedded in the chronological flow, not breaking it.', 'Practice labeling each paragraph as "action" or "reflection" to see the pattern and understand that both together.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just a list of places.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the first-person narrative in conveying the author\'s physical hardships and spiritual insights.', answer: 'The first-person narrative is highly effective',
                  options: ['The first-person narrative is highly effective', 'third-person would be more objective'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often mistake the travelogue\'s descriptive passages for lack of plot, thinking it\'s just a list of places.' }
          ],
            remediations: { 'students-often-mistake-the-travelogue': { steps: ['Have the student list the major events in order on a timeline.', 'Identify which events are external actions (driving, meeting people) and which are internal reflections (thoughts about.', 'Show how the reflections are embedded in the chronological flow, not breaking it.', 'Practice labeling each paragraph as "action" or "reflection" to see the pattern and understand that both together.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If stuck, review Class 9 "The Tunnel" (c7_engl_ch04_005) for how "heat, silence.',
          misconception: 'Students treat setting as a static backdrop (a map location) rather than an active participant in the narrative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and physical environment in',
                  options: ['Setting refers to the time, place, and physical environment in', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure in "Silk Road" refers to the sequence of events (plot) and', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'If stuck, review Class 9 "The Tunnel" (c7_engl_ch04_005) for how "heat, silence, anticipation".',
                  misconception: 'Students treat setting as a static backdrop (a map location) rather than an active participant in the narrative.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student re-read only the descriptive passages (skip dialogue/action).', 'Give them a highlighter: mark every sensory word (cold, blue, dusty, silent, taste, smell).', 'Create a two-column table: Column A = Sensory Detail (quote), Column B = Feeling it Evokes (despair, awe, anxiety).', 'Ask: "If this detail were removed, how would the mood change?" This forces causal linking of detail to atmosphere.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck, revisit c10_engl_cbse_07_007 (Valli\'s character analysis) and re-do the STEAL.',
          misconception: 'Students often treat the narrator as a transparent window onto the landscape, ignoring that *every description is.',
          parts: [
                { id: 'a', prompt: 'Apply the STEAL framework (Speech, Thoughts, Effect on others, Actions, Looks) to analyze the protagonist\'s reaction to the broken-down vehicle near Darchen.', answer: '**Speech:** He reassures Tsetan calmly ("We\'ll manage")',
                  options: ['**Speech:** He reassures Tsetan calmly ("We\'ll manage")', 'first-person narrator', 'author surrogate'],
                  hint: 'If stuck, revisit c10_engl_cbse_07_007 (Valli\'s character analysis) and re-do the STEAL exercise.',
                  misconception: 'Students often treat the narrator as a transparent window onto the landscape, ignoring that *every description is a choice revealing.' },
                { id: 'b', prompt: 'Compare the protagonist\'s physical suffering (altitude sickness, cold) with his mental state at three points: Ravu, Darchen, and Lake Manasarovar.', answer: 'At Ravu, discomfort is background noise to anticipation',
                  options: ['At Ravu, discomfort is background noise to anticipation', 'first-person narrator', 'author surrogate'],
                  hint: 'If stuck, revisit c10_engl_cbse_07_007 (Valli\'s character analysis) and re-do the STEAL exercise.',
                  misconception: 'Students often treat the narrator as a transparent window onto the landscape, ignoring that *every description is a choice revealing.' }
          ],
            remediations: { 'students-often-treat-the-narrator': { steps: ['Have the student list 10 adjectives describing the narrator *only from his own words* (e.g., "I was surprised," "I.', 'For each adjective, find the exact sentence.', 'Ask: "If he didn\'t want us to see this trait, what would he have written instead?" 4.', 'Rewrite one paragraph from Tsetan\'s perspective to show how the same events change.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'Review "Character Analysis: Protagonist" focusing on the narrator\'s shifting relationship.',
          misconception: 'Students treat supporting characters as "background information" and write descriptive summaries (e.g., "Tsetan is.',
          parts: [
                { id: 'a', prompt: 'Analyze the narrative purpose of Daniel\'s disappearance after Lhasa.', answer: 'Daniel serves as a linguistic/cultural bridge in Lhasa (urban, modern Tibet)',
                  options: ['Daniel serves as a linguistic/cultural bridge in Lhasa (urban, modern Tibet)', 'guide who left'],
                  hint: 'Review "Character Analysis: Protagonist" focusing on the narrator\'s shifting relationship with.',
                  misconception: 'Students treat supporting characters as "background information" and write descriptive summaries (e.g., "Tsetan is a good driver who knows.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Have the student create a two-column table: Column A = "Character Action", Column B = "What This Forces the Narrator.', 'Fill it for Tsetan (snowstorm → surrender), Norbu (proposal → companionship vs solitude), Daniel (departure →.', 'Ask: "If this character were deleted, what thematic thread would unravel?" 3.', 'Practice writing one PEEL paragraph using the table data, emphasizing the "Explanation" step: "This action reveals the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, return to **c11_eng_h_cbse_08_004 (Character Analysis: Protagonist)** and re-do.',
          misconception: '**Students conflate \'theme\' with \'topic\' or \'dominant impression\'.** They write: "The theme is the journey to Mount.',
          parts: [
                { id: 'a', prompt: 'Compare the narrator\'s attitude at Ravu (departure) with his attitude at Darchen (before meeting Norbu).', answer: 'At Ravu, the narrator is an **observer-tourist** ("I was excited',
                  options: ['At Ravu, the narrator is an **observer-tourist** ("I was excited', 'first happy, then sad'],
                  hint: 'If stuck, return to **c11_eng_h_cbse_08_004 (Character Analysis: Protagonist)** and re-do the.',
                  misconception: '**Students conflate \'theme\' with \'topic\' or \'dominant impression\'.** They write: "The theme is the journey to Mount Kailash" (topic).' }
          ],
            remediations: { 'students-conflate-theme-with-topic': { steps: ['**Diagnose**: Ask the student to write "The theme is ______" and fill the blank.', 'If they use a concrete noun (journey, mountain, road), they are stating topic.', '**Remediate**: Give the formula: **Theme = Abstract Noun + Author\'s Comment**.', 'Practice with known texts: *The Necklace* → "The destructive nature of vanity" (not "a lost necklace").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
