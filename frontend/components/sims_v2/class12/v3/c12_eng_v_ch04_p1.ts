import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch04_p1: SimDef = {
    id: 'v3_c12_eng_v_ch04_p1',
    title: 'The Enemy · Part 1/3',
    subtitle: 'The scalpel or the state — a doctor\'s wartime third option',
    classLevel: 12, subject: 'eng_v', topic: 'The Enemy · Part 1/3',
    chapters: ['c12_eng_v_ch04'],
    nodeIds: ['c12_eng_v_cbse_04_001', 'c12_eng_v_cbse_04_002', 'c12_eng_v_cbse_04_003', 'c12_eng_v_cbse_04_004', 'c12_eng_v_cbse_04_005', 'c12_eng_v_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'War-fiction analyst', intro: 'An enemy soldier bleeds on a Japanese doorstep. Everything the doctor knows says save him; everything his nation demands says hand him over.', goal: 'Read The Enemy inside its WWII context — medical ethics versus treason, and the moral agency that escapes the binary.' },
    discovery: {
        question: '1944 Japan: a wounded American POW washes up at Dr. Sadao\'s door. Treating him is treason under military law — yet the Geneva Convention requires it. The \'doctor or patriot\' framing hides what?',
        options: ['A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely', 'Nothing — it\'s genuinely two options', 'Treason is always wrong', 'Medicine outranks everything'],
        answer: 'A third path — humanity transcending both roles; Sadao operates, then helps him escape, answering neither duty fully and a higher one completely',
        hook: 'Pearl S. Buck wrote this DURING the war — an American raised in China who could see both sides without caricature. Judging Sadao by peacetime logic (\'just call the police\') misses that the police meant execution; the dilemma only works inside its history.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read" context provides the historical, cultural, and ethical framework necessary to interpret the story: it establishes the World War II Pacific Theater setting, introduces Pearl S.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Stand in Sadao\'s surgery under wartime law: weigh the oath against the statute, watch Hana and the servants choose sides, and test whether a man can be patriot, doctor and human at once.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are a doctor in a modern conflict zone — say, a surgeon in a war-torn region — and an injured enemy combatant is brought to your clinic.',
            decisions: [{ prompt: 'What is the specific historical conflict that forms the backdrop of "The Enemy," and which two nations are directly opposed in this setting?', options: [
                { text: 'The story is set during World War II in the Pacific Theater, specifically between', outcome: 'The story is set during World War II in the Pacific Theater, specifically between Imperial Japan.' },
                { text: 'World War I', outcome: 'Not quite — Students treat the "Before You Read" box as a plot spoiler or optional introduction.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a surgical drama where the protagonist must operate on a terrorist — the camera lingers on the doctor\'s hands trembling over the.',
            decisions: [{ prompt: 'Identify the six stages of Freytag\'s dramatic pyramid in order, and for each stage name ONE specific textual moment from "The Enemy" that.', options: [
                { text: 'Correct mapping: (1) Exposition', outcome: 'Correct mapping: (1) Exposition — Sadao\'s childhood memory of his father pointing to islands.' },
                { text: 'First Sadao remembers his father, then the soldier arrives', outcome: 'Not quite — Students treat "plot" and "narrative structure" as synonyms, writing chronological event summaries.', reveals: 'students-treat-plot-and-narrative' },
                { text: 'lists events chronologically without labeling structural function (e', outcome: 'Not quite — Students treat "plot" and "narrative structure" as synonyms, writing chronological event summaries.', reveals: 'students-treat-plot-and-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re standing on a rocky Japanese coastline at dusk, thick fog rolling in from the Pacific, hiding everything beyond a few meters — you can hear the.',
            decisions: [{ prompt: 'Identify the specific geographical features of Dr. Sadao\'s house and its surroundings as described in the opening paragraphs of "The Enemy."', options: [
                { text: 'The house is a low, square stone structure built on rocks well above a narrow beach', outcome: 'The house is a low, square stone structure built on rocks well above a narrow beach outlined with.' },
                { text: 'well above', outcome: 'Not quite — Students believe "setting analysis" means listing where and when the story happens (Japan, WWII,.', reveals: 'setting-analysis-means-listing-where' },
                { text: 'bent pines', outcome: 'Not quite — Students believe "setting analysis" means listing where and when the story happens (Japan, WWII,.', reveals: 'setting-analysis-means-listing-where' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re a doctor in wartime and an enemy soldier washes up at your doorstep — bleeding, unconscious, and completely at your mercy.',
            decisions: [{ prompt: 'REMEMBER: What are the three specific details the text gives about Dr.', options: [
                { text: 'Correct answer: (1) He was sent to America at twenty-two to learn surgery and medicine,', outcome: 'Correct answer: (1) He was sent to America at twenty-two to learn surgery and medicine, (2).' },
                { text: 'he studied in Japan', outcome: 'Not quite — Students often read Dr. Sadao as a straightforward "hero who chooses humanity over patriotism.".', reveals: 'students-often-read-dr' },
                { text: 'he was a general physician', outcome: 'Not quite — Students often read Dr. Sadao as a straightforward "hero who chooses humanity over patriotism.".', reveals: 'students-often-read-dr' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are a juror watching a trial: the protagonist is the defendant, but the witnesses — Hana, the servants, the General, Tom — each give testimony that.',
            decisions: [{ prompt: 'Name the four primary supporting characters in "The Enemy" and state each one\'s relationship to Dr. Sadao.', options: [
                { text: 'The four primary supporting characters are: (1) Hana', outcome: 'The four primary supporting characters are: (1) Hana — Sadao\'s wife, (2) Yumi — the nanny/servant.' },
                { text: 'the professor or landlady as primary', outcome: 'Not quite — Students treat supporting characters as "less important" and write generic descriptions like "Hana.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a doctor in a war zone and an enemy soldier is brought to you, bleeding. Your country says kill him; your profession says save him.',
            decisions: [{ prompt: 'What is the central conflict that drives the primary theme of "The Enemy"?', options: [
                { text: 'The central conflict is Dr', outcome: 'The central conflict is Dr. Sadao\'s dilemma between his duty as a doctor to save a wounded enemy.' },
                { text: 'the conflict is between Sadao and the General', outcome: 'Not quite — Students often think the primary theme is "war is bad" or "enemies can become friends." The actual.', reveals: 'the-primary-theme-is-war' },
                { text: 'war is bad', outcome: 'Not quite — Students often think the primary theme is "war is bad" or "enemies can become friends." The actual.', reveals: 'the-primary-theme-is-war' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re a first-aid volunteer at a zonal tournament. An opposing team\'s player — who earlier got your teammate fouled out and is widely hated by your side — collapses near your post, bleeding and alone. Your teammates mutter \'let their own people handle him.\'',
            decisions: [{ prompt: 'What would Sadao\'s choice in \'The Enemy\' prescribe?', options: [
                { text: 'Treat him first and quietly — Sadao operates on the American POW because the surgeon\'s duty to a bleeding human overrides the wartime label \'enemy\'; afterwards you can let the officials sort out the politics, as Sadao lets the General\'s system handle the rest.', outcome: 'The story\'s climax is the surgery itself — \'My friend\' murmured to an enemy under the knife — and its resolution is deliberately quiet: doing the human thing without needing to be seen as a hero or a traitor.' },
                { text: 'Call his side\'s medical tent and wait — he\'s their responsibility.', outcome: 'That\'s the servants\' and Yumi\'s position in the story — the refusal that makes Sadao act alone; the chapter treats deferring to the group as the failure, not the safe middle path.', reveals: 'their-problem-not-mine' },
                { text: 'Treat him but report him to the organisers afterwards to stay safe.', outcome: 'That reverses the story\'s architecture — Sadao provides the boat and signal code instead of the General\'s assassins; the chapter\'s point is that professional mercy isn\'t complete until the person is out of danger, not merely bandaged.', reveals: 'mercy-then-report' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hold an ethical dilemma inside its historical moment — and spot when a binary question is built to exclude the answer that matters.',
            decisions: [{ prompt: 'What comes next? The Enemy · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Enemy · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_001', difficulty: 'standard',
          question: 'The "Before You Read" context provides the historical, cultural, and ethical.',
          hint: 'If stuck on historical facts, review Class 12 History chapter "The Second World War".',
          misconception: 'Students treat the "Before You Read" box as a plot spoiler or optional introduction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Before You Read" context provides the historical, cultural, and ethical framework',
                  options: ['The "Before You Read" context provides the historical, cultural, and ethical framework', 'Plot and narrative structure refers to the deliberate arrangement of story events', 'Setting in "The Enemy" refers to the specific time (World War II), place (Japanese', 'Character analysis of the protagonist involves examining Dr'],
                  hint: 'If stuck on historical facts, review Class 12 History chapter "The Second World War" (Pacific.',
                  misconception: 'Students treat the "Before You Read" box as a plot spoiler or optional introduction.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the WWII Japan-US context or the doctor-patriot dilemma: (1) Assign a 10-minute focused.', '(2) Have them write a 100-word diary entry as Dr.', 'Sadao *the night before* the soldier washes ashore, expressing his fears about the war, his father\'s expectations, and.', '(3) Re-test with Diagnostic Question 2 — if they still miss the bicultural lens, show a 5-min clip from a documentary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the deliberate arrangement of story.',
          hint: 'Review Freytag\'s pyramid using *The Portrait of a Lady* (Class 11 Hornbill): map the.',
          misconception: 'Students treat "plot" and "narrative structure" as synonyms, writing chronological event summaries and calling.',
          parts: [
                { id: 'a', prompt: 'Identify the six stages of Freytag\'s dramatic pyramid in order, and for each stage name ONE specific textual moment from "The Enemy" that exemplifies it.', answer: 'Correct mapping: (1) Exposition',
                  options: ['Correct mapping: (1) Exposition', 'First Sadao remembers his father, then the soldier arrives', 'lists events chronologically without labeling structural function (e'],
                  hint: 'Review Freytag\'s pyramid using *The Portrait of a Lady* (Class 11 Hornbill): map the grandmother\'s.',
                  misconception: 'Students treat "plot" and "narrative structure" as synonyms, writing chronological event summaries and calling it structural analysis.' },
                { id: 'b', prompt: 'The story opens with a flashback to Sadao\'s childhood and his father\'s words about "stepping stones to the future." Explain in your own words why Buck places.', answer: 'The flashback establishes Sadao\'s internal framework',
                  options: ['The flashback establishes Sadao\'s internal framework', 'hooking the reader', 'giving background'],
                  hint: 'Review Freytag\'s pyramid using *The Portrait of a Lady* (Class 11 Hornbill): map the grandmother\'s.',
                  misconception: 'Students treat "plot" and "narrative structure" as synonyms, writing chronological event summaries and calling it structural analysis.' }
          ],
            remediations: { 'students-treat-plot-and-narrative': { steps: ['Have student create a two-column table — Column A: Event (chronological), Column B: Structural Function.', 'Using a familiar Bollywood film (e.g., *Uri: The Surgical Strike*), practice labeling only Column B for 5 key scenes.', 'Return to "The Enemy" and complete Column B for all major scenes.', 'Write one paragraph explaining how the obstacle-type progression (moral → domestic → professional → physiological).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_003', difficulty: 'standard',
          question: 'Setting in "The Enemy" refers to the specific time (World War II), place.',
          hint: 'If the student cannot distinguish "fog as weather" from "fog as narrative device," return.',
          misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the fog functions atmospherically in the scene where Sadao and Hana first discover the wounded man. Do not simply quote the text.', answer: 'The fog acts as a natural screen that isolates the couple from the world',
                  options: ['The fog acts as a natural screen that isolates the couple from the world', 'creating suspense', 'making it scary', 'setting analysis'],
                  hint: 'If the student cannot distinguish "fog as weather" from "fog as narrative device," return to the.',
                  misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).' },
                { id: 'b', prompt: 'Apply the concept of "setting as moral metaphor" to the following textual moment: "The surf beyond the beach was spiked with rocks.', answer: 'The rock-spiked surf represents the lethal hostility of the wartime environment',
                  options: ['The rock-spiked surf represents the lethal hostility of the wartime environment', 'he\'s hurt badly', 'setting analysis'],
                  hint: 'If the student cannot distinguish "fog as weather" from "fog as narrative device," return to the.',
                  misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).' }
          ],
            remediations: { 'setting-analysis-means-listing-where': { steps: ['Have the student reread only the first 3 pages (opening to "flung up out of the ocean") and underline every sensory.', 'Ask: "If you removed the fog, how would the scene change?" Force them to articulate the fog\'s *function*, not just its.', 'Map the setting-atmosphere pairs on paper: House on rocks → isolation; Bent pines → endurance under pressure; Ocean →.', 'Re-attempt Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the final setting image — Sadao on the veranda gazing at the "spot of black in the twilighted sea" where the island was, seeing.', answer: 'The final image resolves the atmospheric arc perfectly',
                  options: ['The final image resolves the atmospheric arc perfectly', 'a sad ending', 'Sadao feeling lonely', 'setting analysis'],
                  hint: 'If the student cannot distinguish "fog as weather" from "fog as narrative device," return to the.',
                  misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).' },
                { id: 'b', prompt: 'Create a 50-word atmospheric description of a different moment in the story — the servants\' departure — using only sensory details (sound, sight, smell, touch).', answer: '*Example:* "Cold rice in lacquered bowls',
                  options: ['*Example:* "Cold rice in lacquered bowls', 'setting analysis'],
                  hint: 'If the student cannot distinguish "fog as weather" from "fog as narrative device," return to the.',
                  misconception: 'Students believe "setting analysis" means listing where and when the story happens (Japan, WWII, a house by the sea).' }
          ],
            remediations: { 'setting-analysis-means-listing-where': { steps: ['Have the student reread only the first 3 pages (opening to "flung up out of the ocean") and underline every sensory.', 'Ask: "If you removed the fog, how would the scene change?" Force them to articulate the fog\'s *function*, not just its.', 'Map the setting-atmosphere pairs on paper: House on rocks → isolation; Bent pines → endurance under pressure; Ocean →.', 'Re-attempt Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining Dr. Sadao Hoki\'s.',
          hint: 'If unable to distinguish stated vs. revealed values, review Class 11 character analysis.',
          misconception: 'Students often read Dr. Sadao as a straightforward "hero who chooses humanity over patriotism." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining Dr',
                  options: ['Character analysis of the protagonist involves examining Dr', 'The "Before You Read" context provides the historical, cultural, and ethical framework', 'Plot and narrative structure refers to the deliberate arrangement of story events', 'Setting in "The Enemy" refers to the specific time (World War II), place (Japanese'],
                  hint: 'If unable to distinguish stated vs. revealed values, review Class 11 character analysis nodes.',
                  misconception: 'Students often read Dr. Sadao as a straightforward "hero who chooses humanity over patriotism." This is wrong because: (1) Sadao NEVER.' }
          ],
            remediations: { 'students-often-read-dr': { steps: ['If a student holds the "simple hero" misconception: Step 1 — Have them re-read Sadao\'s internal monologue during.', 'there is no reason under heaven why he should live") and his conversation with the General.', 'Step 2 — Ask: "Find three moments where Sadao explicitly says he doesn\'t care about Tom." Step 3 — Have them write.', 'Step 4 — Discuss: "Why does the gap between Columns A and B make him a more interesting character than if they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures.',
          hint: 'If stuck, review the "foil/catalyst/mirror" definitions from Class 11.',
          misconception: 'Students treat supporting characters as "less important" and write generic descriptions like "Hana is a supportive.',
          parts: [
                { id: 'a', prompt: 'Name the four primary supporting characters in "The Enemy" and state each one\'s relationship to Dr. Sadao.', answer: 'The four primary supporting characters are: (1) Hana',
                  options: ['The four primary supporting characters are: (1) Hana', 'the professor or landlady as primary'],
                  hint: 'If stuck, review the "foil/catalyst/mirror" definitions from Class 11 (c11_eng_h_cbse_01_005) and.',
                  misconception: 'Students treat supporting characters as "less important" and write generic descriptions like "Hana is a supportive wife" or "The servants.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student writes generic descriptions: (1) Have them reread the three servant scenes (pp.', '30-31, 36-37, 37-38) and highlight every line where a servant *speaks* about the prisoner.', '(2) Make a two-column table: "Character\'s words" vs.', '"What this reveals about their worldview." (3) Rewrite one PEEL paragraph for the gardener using only his direct quotes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is the central idea or message that the.',
          hint: 'Review the plot timeline (c12_eng_v_cbse_04_002) and Sadao\'s character arc.',
          misconception: 'Students often think the primary theme is "war is bad" or "enemies can become friends." The actual primary theme is the.',
          parts: [
                { id: 'a', prompt: 'What is the central conflict that drives the primary theme of "The Enemy"?', answer: 'The central conflict is Dr',
                  options: ['The central conflict is Dr', 'the conflict is between Sadao and the General', 'war is bad', 'enemies can become friends'],
                  hint: 'Review the plot timeline (c12_eng_v_cbse_04_002) and Sadao\'s character arc (c12_eng_v_cbse_04_004).',
                  misconception: 'Students often think the primary theme is "war is bad" or "enemies can become friends." The actual primary theme is the conflict between.' }
          ],
            remediations: { 'the-primary-theme-is-war': { steps: ['If a student confuses the primary theme with a secondary one, ask them to list the three biggest decisions Sadao makes.', 'Then ask: "What value drives each decision?" Guide them to see the pattern: medical duty > national duty.', 'Then re-read the General\'s scene to see the contrast.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
