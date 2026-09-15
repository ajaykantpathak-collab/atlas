import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch08_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch08_p1',
    title: 'fQjkd xksj[kiqjh · Part 1/3',
    subtitle: 'Read a prisoner\'s India — episodic, argumentative, and allergic to uniformity.',
    classLevel: 11, subject: 'hin_ar', topic: 'fQjkd xksj[kiqjh · Part 1/3',
    chapters: ['c11_hin_ar_ch08'],
    nodeIds: ['c11_hin_ar_cbse_08_001', 'c11_hin_ar_cbse_08_002', 'c11_hin_ar_cbse_08_003', 'c11_hin_ar_cbse_08_004', 'c11_hin_ar_cbse_08_005', 'c11_hin_ar_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prisoner composing a nation from memory', intro: 'From a cell, Nehru walks the whole country — and every conversation with a peasant becomes a meditation on what \'India\' even is.', goal: 'Analyse the episodic-reflective structure and the theme of unity built from diversity.' },
    discovery: {
        question: 'Nehru\'s chapter jumps from the Himalaya to a peasant\'s face to a Vedic hymn to a Kanpur factory — is the disorder a structural weakness?',
        options: ['No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity', 'Yes — history must run in dates', 'Yes — prison made him ramble', 'No — but only because it\'s a travelogue'],
        answer: 'No — the architecture is thematic, not temporal: episodes cluster by idea, welding modern and ancient into one continuity',
        hook: 'Written in a 1942-46 prison cell, \'Bharat Mata\' argues that India\'s unity lives in shared labour and suffering — not in cultural sameness.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory literary skill that equips students to situate a text within its historical period, author\'s biography, socio-political milieu, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the journey\'s episodes from its reflective digressions, then defend whether diversity can ground unity without uniformity.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re visiting a friend\'s ancestral home for the first time—you\'d want to know their family history, the house\'s age, and what events shaped it before.',
            decisions: [{ prompt: 'Who is the author of "Bharat Mata" and what significant historical position did he hold in independent India?', options: [
                { text: 'The author is Jawaharlal Nehru (1889–1964), who served as India\'s first Prime Minister', outcome: 'The author is Jawaharlal Nehru (1889–1964), who served as India\'s first Prime Minister from 1947.' },
                { text: 'another freedom fighter or misidentifying his role', outcome: 'Not quite — Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat.', reveals: 'students-often-treat-bharat-mata' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked to summarize this chapter in one paragraph but find yourself jumping from the Himalayas to the plains, from a dialogue with a peasant.',
            decisions: [{ prompt: 'What is the primary narrative frame that structures the entire chapter "Hkkjr ekrk"?', options: [
                { text: 'The primary narrative frame is Jawaharlal Nehru\'s first-person travelogue across India', outcome: 'The primary narrative frame is Jawaharlal Nehru\'s first-person travelogue across India (tyl) during.' },
                { text: 'the freedom struggle', outcome: 'Not quite — Students believe "plot" only applies to fiction and means a chronological sequence.', reveals: 'plot-only-applies-to-fiction' },
                { text: 'Nehru\'s autobiography', outcome: 'Not quite — Students believe "plot" only applies to fiction and means a chronological sequence.', reveals: 'plot-only-applies-to-fiction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing at a train window watching India\'s landscape change from the Himalayan foothills to the Deccan plateau — that shifting view is exactly.',
            decisions: [{ prompt: 'In Nehru\'s essay, which geographical regions does he explicitly mention while describing his travels across India to establish the physical.', options: [
                { text: 'Nehru mentions the Himalayan region ("pahadon se lekar maidon tak"), the plains from', outcome: 'Nehru mentions the Himalayan region ("pahadon se lekar maidon tak"), the plains from Punjab.' },
                { text: 'villages and cities', outcome: 'Not quite — Students often treat setting as mere "where and when" backdrop and atmosphere as a single static.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are sitting with your grandfather who tells you about his journey across India in the 1930s—he describes meeting a farmer in a dusty village who.',
            decisions: [{ prompt: 'Who is the protagonist of the chapter "Bharat Mata" and what is his primary role in the narrative?', options: [
                { text: 'The protagonist is Jawaharlal Nehru, who serves as the first-person narrator traveling', outcome: 'The protagonist is Jawaharlal Nehru, who serves as the first-person narrator traveling across.' },
                { text: 'Bharat Mata', outcome: 'Not quite — Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as.', reveals: 'students-conflate-bharat-mata-the' },
                { text: 'Bharat Mata is the protagonist', outcome: 'Not quite — Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as.', reveals: 'students-conflate-bharat-mata-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re sitting in a village chaupal listening to Nehru ask farmers "What does Bharat Mata mean to you?" - their answers aren\'t just opinions, they\'re.',
            decisions: [{ prompt: 'Identify the supporting character in "Hkkjr ekrk" who responds to Nehru\'s question about Bharat Mata by saying the slogan comes from the.', options: [
                { text: 'The supporting character is the farmer described as "g^s&d^s tkV" (an old weather-beaten', outcome: 'The supporting character is the farmer described as "g^s&d^s tkV" (an old weather-beaten peasant).' },
                { text: 'villager', outcome: 'Not quite — Students treat supporting characters in this non-fiction essay as if they were fictional characters.', reveals: 'students-treat-supporting-characters-in' },
                { text: 'Nehru himself or a generic "villager', outcome: 'Not quite — Students treat supporting characters in this non-fiction essay as if they were fictional characters.', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re at a family gathering where everyone argues about what "real India" means — some say it\'s the temples, others the Constitution, others the.',
            decisions: [{ prompt: 'What is the difference between a "topic" and a "theme" in literary analysis? Give an example from "Bharat Mata" to illustrate.', options: [
                { text: 'A topic is a subject or noun phrase (e.g., "India," "freedom struggle," "geography")', outcome: 'A topic is a subject or noun phrase (e.g., "India," "freedom struggle," "geography").' },
                { text: 'Bharat Mata', outcome: 'Not quite — Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued.', reveals: 'students-often-confuse-the-refrain' },
                { text: 'Bharat Mata is the millions of people who constitute the nation', outcome: 'Not quite — Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued.', reveals: 'students-often-confuse-the-refrain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For Independence Day, a student proposes a poster quoting Nehru\'s \'Bharat Mata\' essay beside a calendar image of the goddess Bharat Mata with a flag. Another teammate says the essay \'has no structure — it just rambles from mountains to peasants to philosophy.\'',
            decisions: [{ prompt: 'What do both get wrong about the text?', options: [
                { text: 'Separate symbol from argument: Nehru, writing in Ahmednagar Fort prison in Discovery of India, deliberately redefines Bharat Mata — not a goddess of land but \'the millions of individuals\', the people themselves. And the structure is the argument: an episodic travelogue where physical journey is the spine, encounters are self-contained units, and reflective digressions build the idea — fragments joined like the diverse-yet-united nation.', outcome: 'The poster gets redesigned — people, not iconography — and the \'rambling\' resolves into a deliberate episodic architecture mirroring India\'s unity-in-diversity.' },
                { text: 'Keep the goddess image — Bharat Mata is Bharat Mata, and the picture makes the poster devotional.', outcome: 'That projects external iconography onto the text: Nehru explicitly rejects goddess imagery for a secular, humanist definition — the people constitute the nation.', reveals: 'bharat-mata-is-goddess' },
                { text: 'Agree it has no structure — it\'s a prison diary, so wandering is natural.', outcome: 'Non-fiction has structure too: the journey spine, episodes, digressions and synthesis form an intellectual arc — the \'plot\' is the idea developing.', reveals: 'essay-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'The journey ends but the argument doesn\'t — the \'Bharat Mata\' Nehru finds is the people themselves, not a goddess on a map.',
            decisions: [{ prompt: 'What comes next? fQjkd xksj[kiqjh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — fQjkd xksj[kiqjh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory literary skill that.',
          hint: 'Review "authorial intent vs. reader response" from Class 10 prose chapters (e.g., "The.',
          misconception: 'Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat Mata iconography.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a preparatory literary skill that equips',
                  options: ['"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot and Narrative Structure refers to the deliberate arrangement of events, reflections,', 'Setting refers to the physical, temporal, and socio-cultural backdrop against', 'Character analysis of the protagonist involves examining the narrator\'s personality,'],
                  hint: 'Review "authorial intent vs. reader response" from Class 10 prose chapters (e.g., "The Letter".',
                  misconception: 'Students often treat "Bharat Mata" as a religious or mythological concept (equating it with Bharat Mata iconography in temples.' }
          ],
            remediations: { 'students-often-treat-bharat-mata': { steps: ['Show the student the exact passage where Nehru says: "Bharat Mata...', 'is essentially these millions of people" and contrast it with a calendar art image of Bharat Mata as a goddess.', 'Ask: "Whose voice speaks in each?', 'What is the political purpose of each representation?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the deliberate arrangement of events.',
          hint: 'Review the "Before You Read" node (c11_hin_ar_cbse_08_001) for Nehru\'s biography and the.',
          misconception: 'Students believe "plot" only applies to fiction and means a chronological sequence of cause-and-effect events leading.',
          parts: [
                { id: 'a', prompt: 'Compare the narrative structure of this chapter with a conventional short story (exposition-rising action-climax-fall-resolution).', answer: 'A conventional story uses linear causality to resolve a conflict',
                  options: ['A conventional story uses linear causality to resolve a conflict', 'the climax is the Quit India Movement', 'forces the chapter into a story arc (e'],
                  hint: 'Review the "Before You Read" node (c11_hin_ar_cbse_08_001) for Nehru\'s biography and the historical.',
                  misconception: 'Students believe "plot" only applies to fiction and means a chronological sequence of cause-and-effect events leading to a climax.' }
          ],
            remediations: { 'plot-only-applies-to-fiction': { steps: ['Ask the student to list five distinct "stops" in Nehru\'s journey (places/people) without interpreting them.', 'For each stop, ask: "What idea does Nehru connect to this encounter?" — this separates episode from reflection.', 'Have them draw a two-column table: Column A = Physical Encounter (Episode), Column B = Idea Triggered (Reflection).', 'Show how the chapter alternates A→B→A→B, and how the final pages merge all Column B ideas.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "plot" only applies to fiction and means a chronological sequence of cause-and-effect events leading.',
          parts: [
                { id: 'a', prompt: 'Critique the view that the chapter\'s lack of chronological order (jumping between 1930s travels, ancient history, and 1947 independence) is a weakness.', answer: 'The non-chronological order is a strength',
                  options: ['The non-chronological order is a strength', 'confusing', 'poor editing'],
                  hint: 'Review the "Before You Read" node (c11_hin_ar_cbse_08_001) for Nehru\'s biography and the historical.',
                  misconception: 'Students believe "plot" only applies to fiction and means a chronological sequence of cause-and-effect events leading to a climax.' }
          ],
            remediations: { 'plot-only-applies-to-fiction': { steps: ['Ask the student to list five distinct "stops" in Nehru\'s journey (places/people) without interpreting them.', 'For each stop, ask: "What idea does Nehru connect to this encounter?" — this separates episode from reflection.', 'Have them draw a two-column table: Column A = Physical Encounter (Episode), Column B = Idea Triggered (Reflection).', 'Show how the chapter alternates A→B→A→B, and how the final pages merge all Column B ideas.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_003', difficulty: 'standard',
          question: 'Setting refers to the physical, temporal, and socio-cultural backdrop against.',
          hint: 'Review the "travelogue structure" explanation in c11_hin_ar_cbse_08_002 — specifically.',
          misconception: 'Students often treat setting as mere "where and when" backdrop and atmosphere as a single static mood (e.g.',
          parts: [
                { id: 'a', prompt: 'Explain how the temporal setting (historical period) influences the atmosphere in the passage where Nehru describes the economic depression after 1929.', answer: 'The 1930s depression setting creates an atmosphere of despair and helplessness',
                  options: ['The 1930s depression setting creates an atmosphere of despair and helplessness', 'it makes the story sad'],
                  hint: 'Review the "travelogue structure" explanation in c11_hin_ar_cbse_08_002 — specifically how each leg.',
                  misconception: 'Students often treat setting as mere "where and when" backdrop and atmosphere as a single static mood (e.g., "patriotic").' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot distinguish setting from atmosphere: (1) Have them list 5 physical details from the text (rivers.', '(2) Have them name the feeling each detail evokes (awe, pity, solidarity) — these are atmosphere.', '(3) Ask: "Does the feeling change when Nehru moves from describing a famine-stricken village to a Congress rally?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'Review "first-person narrative voice" (कथावाचक की दृष्टि) from Class 10.',
          misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the narrator\'s personality,',
                  options: ['Character analysis of the protagonist involves examining the narrator\'s personality,', '"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot and Narrative Structure refers to the deliberate arrangement of events, reflections,', 'Setting refers to the physical, temporal, and socio-cultural backdrop against'],
                  hint: 'Review "first-person narrative voice" (कथावाचक की दृष्टि) from Class 10 Hindi—specifically how.',
                  misconception: 'Students conflate "Bharat Mata" (the symbol) with the protagonist, treating the chapter as a description of a goddess rather than.' }
          ],
            remediations: { 'students-conflate-bharat-mata-the': { steps: ['Have the student highlight every sentence beginning with "मैं" (I) in the chapter—there are 15+.', 'Ask: "Who is doing the seeing, asking, traveling, understanding in each?"', 'Create a two-column table: Column A = Nehru\'s action/statement; Column B = What it reveals about him.', 'Guide them to see the pattern: the "I" is the constant consciousness; Bharat Mata is the variable he\'s solving for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'Review the protagonist analysis (node 004) focusing on Nehru\'s method: he doesn\'t lecture.',
          misconception: 'Students treat supporting characters in this non-fiction essay as if they were fictional characters in a story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining how secondary figures in a',
                  options: ['Character analysis of supporting characters involves examining how secondary figures in a', '"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot and Narrative Structure refers to the deliberate arrangement of events, reflections,', 'Setting refers to the physical, temporal, and socio-cultural backdrop against'],
                  hint: 'Review the protagonist analysis (node 004) focusing on Nehru\'s method: he doesn\'t lecture -.',
                  misconception: 'Students treat supporting characters in this non-fiction essay as if they were fictional characters in a story - expecting names.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['Show the student the exact text where the farmer is introduced ("vkf[kj ,d g^s&d^s tkV us...") - note the descriptive.', 'Have them highlight every instance where Nehru uses plural pronouns ("bu yksx", "mUgsa", "os") when referring to people.', 'Ask: "If these were fictional characters, why would the author deny them names and individuality?"', 'Guide them to see that the TEXT\'S PURPOSE (defining a nation) requires collective voices, not individual portraits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea that the.',
          hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes.',
          misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).',
          parts: [
                { id: 'a', prompt: 'Nehru writes that when he asked people "Who is Bharat Mata?", a farmer replied "The earth, the fields." Why does Nehru reject this answer as incomplete, and.', answer: 'Nehru rejects the farmer\'s answer',
                  options: ['Nehru rejects the farmer\'s answer', 'Nehru liked the farmer\'s answer', 'Nehru wanted a more poetic answer', 'Bharat Mata ki Jai'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes, then.',
                  misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).' },
                { id: 'b', prompt: 'Apply the "theme tracing" method: Find three distinct passages in the text where Nehru moves from describing physical India to describing human India.', answer: 'Passage 1: "From the snow-capped Himalayas to Cape Comorin" (physical geography)',
                  options: ['Passage 1: "From the snow-capped Himalayas to Cape Comorin" (physical geography)', 'Bharat Mata ki Jai'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (node 002) to map the journey\'s episodes, then.',
                  misconception: 'Students often confuse the *refrain* "Bharat Mata ki Jai" (a slogan) with the *theme* (an argued concept).' }
          ],
            remediations: { 'students-often-confuse-the-refrain': { steps: ['If a student gives the slogan-based answer: (1) Ask them to find the exact paragraph where Nehru says "I would tell.', '(2) Have them underline every group of people Nehru lists (peasants, workers, city-dwellers, etc.).', '(3) Ask: "If Bharat Mata is just the land, why does Nehru spend 80% of the essay describing *people*?" (4) Guide them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
