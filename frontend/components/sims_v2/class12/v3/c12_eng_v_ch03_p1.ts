import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch03_p1: SimDef = {
    id: 'v3_c12_eng_v_ch03_p1',
    title: 'Journey to the End of the Earth · Part 1/3',
    subtitle: 'Humanity arrived in the last seconds — and changed the climate anyway',
    classLevel: 12, subject: 'eng_v', topic: 'Journey to the End of the Earth · Part 1/3',
    chapters: ['c12_eng_v_ch03'],
    nodeIds: ['c12_eng_v_cbse_03_001', 'c12_eng_v_cbse_03_002', 'c12_eng_v_cbse_03_003', 'c12_eng_v_cbse_03_004', 'c12_eng_v_cbse_03_005', 'c12_eng_v_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Environmental essayist', intro: 'A ship of schoolchildren heads to the frozen archive where Earth keeps its past — and its prognosis.', goal: 'Read Antarctica as planetary archive — Gondwana, ice cores and the case for intergenerational climate education.' },
    discovery: {
        question: 'On Earth\'s geological clock, all of human civilisation fits in the last seconds — yet \'for humans, the prognosis isn\'t good.\' How can a blink of a species threaten a 500-million-year system?',
        options: ['Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did', 'We can\'t — the claim is exaggerated', 'Industry is bigger than geology', 'Ice melts every summer anyway'],
        answer: 'Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did',
        hook: 'This isn\'t a travelogue — it\'s a geological argument wearing a journey\'s clothes. Antarctica\'s ice cores hold half a million years of carbon records; Gondwana\'s breakup rearranged the climate once, and our emissions are rearranging it again — the same scale of forcing, at a thousand times the speed.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior knowledge, establishes essential historical-geographical context (Gondwana, Antarctic climate records), and sets.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Join Students on Ice at the bottom of the world: read the continent as archive — Gondwana\'s drift, the circumpolar current, the frozen carbon diary — and weigh why teenagers, not tourists, were taken there.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re a student in Chennai (13°N) planning a virtual expedition to the South Pole — what would you need to know before you "go"?',
            decisions: [{ prompt: 'What is the single sentence in the "Before You Read" box, and what does it claim about Antarctica\'s value for understanding Earth?', options: [
                { text: 'The box reads: "If you want to know more about the planet\'s past, present and future, the', outcome: 'The box reads: "If you want to know more about the planet\'s past, present and future, the.' },
                { text: 'It\'s about a trip to Antarctica', outcome: 'Not quite — Students treat "Before You Read" as a skippable summary or a simple travel introduction.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are planning a trip to a remote place and want to write about it not just as a diary but as a story that changes how readers see the world.',
            decisions: [{ prompt: 'What is the narrative point of view used in "Journey to the End of the Earth" and how does it shape the reader\'s experience of the.', options: [
                { text: 'The text uses a first-person reflective point of view ("I found myself aboard...", "my', outcome: 'The text uses a first-person reflective point of view ("I found myself aboard...", "my first.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often treat this text as a linear travel diary and write plot summaries that go: "She.', reveals: 'students-often-treat-this-text' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine standing on a frozen ocean where the only sounds are your breath and a distant ice shelf cracking — no trees, buildings, or human markers for.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" in a literary context. How are they different?', options: [
                { text: 'Setting is the concrete time, place, and physical environment (e.g., "Antarctica, austral', outcome: 'Setting is the concrete time, place, and physical environment (e.g., "Antarctica, austral summer.' },
                { text: 'setting is the mood', outcome: 'Not quite — Students treat "setting" as a static backdrop (listing where/when) and "atmosphere" as a single.', reveals: 'students-treat-setting-as-a' },
                { text: 'how does the author create atmosphere?', outcome: 'Not quite — Students treat "setting" as a static backdrop (listing where/when) and "atmosphere" as a single.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'ve just returned from a school trip to Ladakh — the freezing wind, the stark mountains, the silence that makes you hear your own heartbeat.',
            decisions: [{ prompt: 'What is the narrator\'s stated profession or primary identity as implied in the text, and how does it shape her perspective on Antarctica?', options: [
                { text: 'The narrator identifies as a "sun-worshipping South Indian" and a writer/poet (implied by', outcome: 'The narrator identifies as a "sun-worshipping South Indian" and a writer/poet (implied by her.' },
                { text: 'she is a climate scientist', outcome: 'Not quite — Students often treat the narrator as a transparent window — "just the author telling what happened".', reveals: 'students-often-treat-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a documentary about a school trip to Antarctica — the narrator is the filmmaker, but the teacher leading the trip, the ship\'s captain.',
            decisions: [{ prompt: 'Name the three main supporting human characters or character-groups in "Journey to the End of the Earth" and state one key action.', options: [
                { text: 'Correct answer: (1) Geoff Green — Canadian head of Students on Ice, "got tired of carting', outcome: 'Correct answer: (1) Geoff Green — Canadian head of Students on Ice, "got tired of carting.' },
                { text: 'got tired of carting celebrities and retired, rich, curiosity-seekers', outcome: 'Not quite — Students consistently treat supporting characters as "minor characters" who need less analysis.', reveals: 'students-consistently-treat-supporting-character' },
                { text: 'new understanding and respect for our planet', outcome: 'Not quite — Students consistently treat supporting characters as "minor characters" who need less analysis.', reveals: 'students-consistently-treat-supporting-character' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a Class 12 student who has heard "climate change is real" a hundred times but feels disconnected from it because you live in a bustling Indian.',
            decisions: [{ prompt: 'What is the central geological event referenced in the chapter that explains the historical connection between India and Antarctica?', options: [
                { text: 'The central geological event is the existence and breakup of Gondwana, a southern', outcome: 'The central geological event is the existence and breakup of Gondwana, a southern supercontinent.' },
                { text: 'the formation of the Himalayas', outcome: 'Not quite — Students often reduce the primary theme to "climate change is dangerous" or "Antarctica.', reveals: 'students-often-reduce-the-primary' },
                { text: 'the Ice Age', outcome: 'Not quite — Students often reduce the primary theme to "climate change is dangerous" or "Antarctica.', reveals: 'students-often-reduce-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re back from an internship field visit to a shrinking wetland and must write it up. Your draft is a day-by-day diary: arrived, walked, sampled water, came home.',
            decisions: [{ prompt: 'How would the structure of \'Journey to the End of the Earth\' improve it?', options: [
                { text: 'Restructure it as an argument, not a diary — open with the sensory arrival, flash back to the wetland\'s deep history, lay out the human damage, describe the restoration effort, and end on one epiphanic moment of physically standing in the water.', outcome: 'Doshi makes structure the argument: the Gondwana timescale reframes the present, the Students on Ice section pivots from despair to agency, and the walk on the frozen ocean condenses the whole thesis into one moment.' },
                { text: 'Keep the diary — chronological order is the most honest record of what you actually did.', outcome: 'That produces the summary-level reading the chapter warns against: the geological flashback isn\'t \'background\', it\'s the device that makes the later data mean something; without it the visit is a list of events.', reveals: 'chronology-equals-honesty' },
                { text: 'Cut the personal parts and report only the data so it reads as objective science.', outcome: 'The text\'s first-person reflective voice is what anchors geological scale in human perception; stripping the \'I\' loses the epiphany that turns information into responsibility.', reveals: 'objectivity-needs-no-i' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue Antarctica\'s case on geological timescales — and explain why one white continent holds the planet\'s whole medical record.',
            decisions: [{ prompt: 'What comes next? Journey to the End of the Earth · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Journey to the End of the Earth · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_001', difficulty: 'standard',
          question: 'The "Before You Read" section is a pre-reading pedagogical tool that activates.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (thesis-first reading) and c9_engl_ch3_7.',
          misconception: 'Students treat "Before You Read" as a skippable summary or a simple travel introduction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior',
                  options: ['The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds', 'Character analysis of the protagonist in a first-person non-fiction travelogue involves'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (thesis-first reading) and c9_engl_ch3_7 (expository.',
                  misconception: 'Students treat "Before You Read" as a skippable summary or a simple travel introduction.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read only the "Before You Read" box and the first two pages (up to "Human impact").', 'Create a three-column table: Column A = Claim in the box ("past, present, future"), Column B = Evidence in text.', 'Orally explain each row to a peer.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Before You Read" as a skippable summary or a simple travel introduction.',
          parts: [
                { id: 'a', prompt: 'Geoff Green switched from "carting celebrities and retired, rich, curiosity-seekers" to taking high-school students.', answer: 'cognitive plasticity of the target group, (',
                  options: ['cognitive plasticity of the target group, (', 'inspiring'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_001 (thesis-first reading) and c9_engl_ch3_7 (expository.',
                  misconception: 'Students treat "Before You Read" as a skippable summary or a simple travel introduction.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read only the "Before You Read" box and the first two pages (up to "Human impact").', 'Create a three-column table: Column A = Claim in the box ("past, present, future"), Column B = Evidence in text.', 'Orally explain each row to a peer.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a non-fiction travelogue like "Journey to the.',
          hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" or Snapshot Chapter 1 "The.',
          misconception: 'Students often treat this text as a linear travel diary and write plot summaries that go: "She travelled, saw Gondwana.',
          parts: [
                { id: 'a', prompt: 'The narrative moves from the author\'s 100-hour physical journey to a 650-million-year geological history of Gondwana.', answer: 'The non-linear structure juxtaposes human timescales (hours, 12,000 years) with',
                  options: ['The non-linear structure juxtaposes human timescales (hours, 12,000 years) with', 'to give background information'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" or Snapshot Chapter 1 "The Summer.',
                  misconception: 'Students often treat this text as a linear travel diary and write plot summaries that go: "She travelled, saw Gondwana history, learned.' }
          ],
            remediations: { 'students-often-treat-this-text': { steps: ['If a student cannot map the non-linear structure: (1) Have them draw a timeline with two parallel tracks: "Author\'s.', '(2) Ask them to label each paragraph with its *function* (e.g., "hook", "geological reframing", "diagnosis".', '(3) Re-read only the first and last paragraphs to see the circular structure.', '(4) Re-attempt Diagnostic Question 3 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment where a narrative.',
          hint: 'If stuck, revisit Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
          misconception: 'Students treat "setting" as a static backdrop (listing where/when) and "atmosphere" as a single label (e.g., "scary,".',
          parts: [
                { id: 'a', prompt: 'Compare the atmosphere in the "walk on the ocean" passage (para 7: "stark whiteness," "metre-thick ice pack," "Crabeater seals ...', answer: 'Shift: from personal wonder to humbling cosmic perspective',
                  options: ['Shift: from personal wonder to humbling cosmic perspective', 'both show beauty'],
                  hint: 'If stuck, revisit Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
                  misconception: 'Students treat "setting" as a static backdrop (listing where/when) and "atmosphere" as a single label (e.g., "scary," "peaceful").' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student re-read paragraphs 1, 3, 5, and 7 with a two-column table: Column A = "Exact sensory detail from text".', 'Ask them to draw arrows showing how Column B shifts across paragraphs.', 'Practice with a familiar local place (Class 7 node c7_engl_ch04_005 "Atmosphere: Heat, Silence and Anticipation in the.', 'Re-attempt Diagnostic Question 4 after the table exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a first-person non-fiction travelogue.',
          hint: 'If stuck, review "First-person narrative perspective in non-fiction" from Class 11.',
          misconception: 'Students often treat the narrator as a transparent window — "just the author telling what happened" — and miss that she.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in a first-person non-fiction travelogue involves',
                  options: ['Character analysis of the protagonist in a first-person non-fiction travelogue involves', 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds'],
                  hint: 'If stuck, review "First-person narrative perspective in non-fiction" from Class 11.',
                  misconception: 'Students often treat the narrator as a transparent window — "just the author telling what happened" — and miss that she is a crafted.' }
          ],
            remediations: { 'students-often-treat-the-narrator': { steps: ['Re-read paragraphs 1, 4, and 7 marking every first-person pronoun and verb ("I found," "I was," "I thought").', 'Create a two-column table: left column = personal/physical reactions; right column = intellectual/moral reflections.', 'Draw arrows showing how each left-column item leads to a right-column expansion (e.g., physical cold → imaginative.', 'Re-attempt Diagnostic Question 4 using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in "Journey to the End of the Earth" are the individuals.',
          hint: 'If confused, review "Character Analysis: Protagonist" (c12_eng_v_cbse_03_004) and note.',
          misconception: 'Students consistently treat supporting characters as "minor characters" who need less analysis, writing answers like.',
          parts: [
                { id: 'a', prompt: 'The Captain orders everyone to "walk on the ocean" when the ship cannot proceed further.', answer: 'Correct PEEL answer: Point',
                  options: ['Correct PEEL answer: Point', 'he made them walk on ice'],
                  hint: 'If confused, review "Character Analysis: Protagonist" (c12_eng_v_cbse_03_004) and note how the.',
                  misconception: 'Students consistently treat supporting characters as "minor characters" who need less analysis, writing answers like "Geoff Green runs the.' }
          ],
            remediations: { 'students-consistently-treat-supporting-character': { steps: ['If a student cannot distinguish character-function from character-description: Step 1 — Have them reread only the.', 'Step 2 — Ask: "What argument does each verb make?" (Green: "got tired," "offers," "foster" → moral choice; Captain.', 'Step 3 — Have them complete a two-column table: Character | Action Verbs | Theme Advanced.', 'Step 4 — Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of "Journey to the End of the Earth" is the.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message in Hornbill.',
          misconception: 'Students often reduce the primary theme to "climate change is dangerous" or "Antarctica is beautiful and we should.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of "Journey to the End of the Earth" is the interconnectedness of',
                  options: ['The primary theme of "Journey to the End of the Earth" is the interconnectedness of', 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_006 (Theme: Primary Theme and Message in Hornbill Chapter 1).',
                  misconception: 'Students often reduce the primary theme to "climate change is dangerous" or "Antarctica is beautiful and we should protect it." This misses.' }
          ],
            remediations: { 'students-often-reduce-the-primary': { steps: ['Re-read the "Part of history" and "Human impact" sections of the text, underlining every reference to time scales (650.', 'Create a three-column table: Geological Past | Human Present | Planetary Future — fill each with textual evidence.', 'Explain the phytoplankton metaphor to a peer in your own words without using the word "small." 4.', 'Re-attempt Diagnostic Question 4 to verify you can trace the perspective shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
