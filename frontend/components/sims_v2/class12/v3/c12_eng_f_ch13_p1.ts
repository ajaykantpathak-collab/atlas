import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch13_p1: SimDef = {
    id: 'v3_c12_eng_f_ch13_p1',
    title: 'A Roadside Stand (Poem) · Part 1/3',
    subtitle: 'A thousand cars an hour — and not one stops',
    classLevel: 12, subject: 'eng_f', topic: 'A Roadside Stand (Poem) · Part 1/3',
    chapters: ['c12_eng_f_ch13'],
    nodeIds: ['c12_eng_f_cbse_13_001', 'c12_eng_f_cbse_13_002', 'c12_eng_f_cbse_13_003', 'c12_eng_f_cbse_13_004', 'c12_eng_f_cbse_13_005', 'c12_eng_f_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry and society analyst', intro: 'Every highway has them — stalls nobody stops at. Frost turned one into an accusation aimed at every passing car.', goal: 'Read A Roadside Stand as a Depression-era critique of rural marginalisation and the false charity of top-down rescue.' },
    discovery: {
        question: 'On a Depression-era highway, \'polished traffic\' streaks past a fruit stand without braking. Why does Frost call the government\'s plan to \'gather\' these villagers into towns predatory — not helpful?',
        options: ['Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save', 'Because villages are cheaper', 'Because traffic needs slowing', 'No reason — Frost is just being dramatic'],
        answer: 'Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save',
        hook: 'This isn\'t a quaint farm scene — it\'s economics in verse. The stand owners need city money that never stops; the city needs nothing from them. Frost even confesses the urge to end their pain \'at one stroke\' — then catches himself, because pity without dignity is its own violence.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Aunt Jennifer\'s Tigers\' (Flamingo, ch. 13) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Decelerate at a roadside stand: read the squeal of brakes, the \'artless paint\' and the waiting sellers as a critique of a cash economy that drives past — then test the poem against India\'s own highway vendors.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Aunt Jennifer\'s Tigers\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the poet of "A Roadside Stand" and what is his primary literary association?', options: [
                { text: 'Robert Frost (1874–1963), an American poet famously associated with rural New England', outcome: 'Robert Frost (1874–1963), an American poet famously associated with rural New England life, using.' },
                { text: 'an Indian poet or a Romantic poet like Wordsworth', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia rather than an analytical lens.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Aunt Jennifer\'s Tigers\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary narrative movement in the first stanza of "A Roadside Stand"?', options: [
                { text: 'The first stanza establishes the physical setting', outcome: 'The first stanza establishes the physical setting — the little old house with a new shed, the.' },
                { text: 'it describes the poet\'s childhood', outcome: 'Not quite — Students treat the poem as a static description of a roadside stand rather than a dynamic narrative.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Aunt Jennifer\'s Tigers\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting of the poem "A Roadside Stand"? Describe it in one sentence using specific details from the text.', options: [
                { text: 'The poem is set at a roadside stand', outcome: 'The poem is set at a roadside stand — a small, newly built shed attached to an old house at the.' },
                { text: 'a village market', outcome: 'Not quite — Students often confuse "setting" with "plot" and write a summary of what happens at the stand,.', reveals: 'students-often-confuse-setting-with' },
                { text: 'a city street', outcome: 'Not quite — Students often confuse "setting" with "plot" and write a summary of what happens at the stand,.', reveals: 'students-often-confuse-setting-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Aunt Jennifer\'s Tigers\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Identify the collective protagonist in "A Roadside Stand" and quote one phrase from stanza 1 that establishes their economic activity.', options: [
                { text: 'The protagonist is the rural collective who run the roadside stand', outcome: 'The protagonist is the rural collective who run the roadside stand; the phrase "the little old.' },
                { text: 'the farmer', outcome: 'Not quite — Students treat the roadside stand owners as passive victims because they don\'t speak or rebel.', reveals: 'students-treat-the-roadside-stand' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Aunt Jennifer\'s Tigers\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'In "Aunt Jennifer\'s Tigers," which two supporting presences shape Aunt Jennifer\'s experience, and how is each introduced in the poem?', options: [
                { text: 'The two supporting presences are Uncle (introduced indirectly through "Uncle\'s wedding', outcome: 'The two supporting presences are Uncle (introduced indirectly through "Uncle\'s wedding band".' },
                { text: 'the men beneath the tree', outcome: 'Not quite — Students often think "supporting characters" must speak or appear physically.', reveals: 'supporting-characters-must-speak-or' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" must speak or appear physically.', reveals: 'supporting-characters-must-speak-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Aunt Jennifer\'s Tigers\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the **primary theme** of Robert Frost\'s "A Roadside Stand" in one precise sentence? (Do not list secondary themes.)', options: [
                { text: '**Correct answer:** The primary theme is the devastating impact of economic inequality', outcome: '**Correct answer:** The primary theme is the devastating impact of economic inequality and urban.' },
                { text: 'poverty', outcome: 'Not quite — **Misconception:** *"The primary theme is the stall owner\'s personal sadness / the beauty of rural.', reveals: 'misconception-the-primary-theme-is' },
                { text: 'rural life', outcome: 'Not quite — **Misconception:** *"The primary theme is the stall owner\'s personal sadness / the beauty of rural.', reveals: 'misconception-the-primary-theme-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A new highway bypass leaves a village\'s fruit stalls watching traffic roar past. The council proposes fresh paint and prettier signboards to \'attract the city money\'.',
            decisions: [{ prompt: 'Will a facelift fix it?', options: [
                { text: 'No — Frost\'s roadside stand is about structural exclusion: rural sellers are shut out of the cash flow entirely; the answer is real access — viable locations, linkages to buyers — not cosmetics.', outcome: 'The poem\'s vendors wanted \'city money\', not city approval; paint doesn\'t move money off the highway.' },
                { text: 'Yes — a polished look is what draws passing customers.', outcome: 'The poem\'s drivers speed past indifferent to the stand itself; the failure is economic exclusion, not aesthetics.', reveals: 'cosmetics-over-structure' },
                { text: 'Neither — the sensible thing is for them to abandon the village for the city.', outcome: 'Frost treats their rootedness as legitimate; telling them to migrate just accepts the neglect the poem indicts.', reveals: 'displacement-as-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a fruit stall as a structural argument about who development forgets. The stand is small; the question it asks is enormous.',
            decisions: [{ prompt: 'What comes next? A Roadside Stand (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Roadside Stand (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_001', difficulty: 'standard',
          question: '\'Aunt Jennifer\'s Tigers\' (Flamingo, ch. 13) — the context and background.',
          hint: 'If stuck, review c11_eng_w_cbse_13_001 (Class 11 poem pre-reading) and practice the.',
          misconception: 'Students treat "Before You Read" as optional background trivia rather than an analytical lens.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Aunt Jennifer\'s Tigers\' (Flamingo, ch',
                  options: ['\'Aunt Jennifer\'s Tigers\' (Flamingo, ch', 'The plot/narrative arc of \'Aunt Jennifer\'s Tigers\'', 'The setting of \'Aunt Jennifer\'s Tigers\'', 'Character analysis in \'Aunt Jennifer\'s Tigers\''],
                  hint: 'If stuck, review c11_eng_w_cbse_13_001 (Class 11 poem pre-reading) and practice the "Context →.',
                  misconception: 'Students treat "Before You Read" as optional background trivia rather than an analytical lens.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Revisit c11_eng_w_cbse_13_001 (Class 11 "Before You Read" for a poem) to see how context frames reading.', 'Watch a 5-min clip on the Great Depression\'s rural impact (e.g., Dorothea Lange photos).', 'Re-do Diagnostic Question 2 orally, forcing the student to say: "Farmers needed cash because ______, so they built.', 'Then re-attempt Diagnostic Question 4 with the photograph.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Aunt Jennifer\'s Tigers\' — what happens, in what.',
          hint: 'If stuck, return to c11_eng_w_cbse_03_002 and practice mapping a simpler 3-stanza poem.',
          misconception: 'Students treat the poem as a static description of a roadside stand rather than a dynamic narrative with a protagonist.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative movement in the first stanza of "A Roadside Stand"?', answer: 'The first stanza establishes the physical setting',
                  options: ['The first stanza establishes the physical setting', 'it describes the poet\'s childhood'],
                  hint: 'If stuck, return to c11_eng_w_cbse_03_002 and practice mapping a simpler 3-stanza poem (e.g., "The.',
                  misconception: 'Students treat the poem as a static description of a roadside stand rather than a dynamic narrative with a protagonist (the collective.' },
                { id: 'b', prompt: 'Stanza 4 introduces "greedy good-doers" and "beneficent beasts of prey." Analyze how this political layer changes the narrative stakes.', answer: 'The narrative expands from a local scene (stand vs',
                  options: ['The narrative expands from a local scene (stand vs', 'it\'s about animals'],
                  hint: 'If stuck, return to c11_eng_w_cbse_03_002 and practice mapping a simpler 3-stanza poem (e.g., "The.',
                  misconception: 'Students treat the poem as a static description of a roadside stand rather than a dynamic narrative with a protagonist (the collective.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student physically map the poem: draw 5 boxes for 5 stanzas; in each, write ONE verb that captures the.', 'Ask: "What changes from box 1 to box 5?" 3.', 'Re-read only the first and last lines of each stanza to hear the narrative arc.', 'Revisit node c11_eng_w_cbse_03_002 (Class 11 poetry narrative structure) for the scaffolded version of this skill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the poem as a static description of a roadside stand rather than a dynamic narrative with a protagonist.',
          parts: [
                { id: 'a', prompt: 'Evaluate the speaker\'s final stance in stanza 5: "I can\'t help owning the great relief it would be / To put these people at one stroke out of their pain.".', answer: 'It is a devastating complication',
                  options: ['It is a devastating complication', 'beasts of prey', 'the speaker wants to help them', 'put out of their pain'],
                  hint: 'If stuck, return to c11_eng_w_cbse_03_002 and practice mapping a simpler 3-stanza poem (e.g., "The.',
                  misconception: 'Students treat the poem as a static description of a roadside stand rather than a dynamic narrative with a protagonist (the collective.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student physically map the poem: draw 5 boxes for 5 stanzas; in each, write ONE verb that captures the.', 'Ask: "What changes from box 1 to box 5?" 3.', 'Re-read only the first and last lines of each stanza to hear the narrative arc.', 'Revisit node c11_eng_w_cbse_03_002 (Class 11 poetry narrative structure) for the scaffolded version of this skill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_003', difficulty: 'standard',
          question: 'The setting of \'Aunt Jennifer\'s Tigers\' — the place, time and atmosphere the.',
          hint: 'If stuck, review c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) and practice.',
          misconception: 'Students often confuse "setting" with "plot" and write a summary of what happens at the stand, or they treat.',
          parts: [
                { id: 'a', prompt: 'What is the physical setting of the poem "A Roadside Stand"? Describe it in one sentence using specific details from the text.', answer: 'The poem is set at a roadside stand',
                  options: ['The poem is set at a roadside stand', 'a village market', 'a city street', 'and write a summary of what happens at the stand, or they treat'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) and practice with.',
                  misconception: 'Students often confuse "setting" with "plot" and write a summary of what happens at the stand, or they treat "atmosphere" as a single.' },
                { id: 'b', prompt: 'Explain how the phrase "polished traffic" contributes to the atmosphere of the poem. What contrast does it create?', answer: '"Polished traffic" suggests sleek, modern, wealthy city cars that reflect light',
                  options: ['"Polished traffic" suggests sleek, modern, wealthy city cars that reflect light', 'polished', 'setting', 'and write a summary of what happens at the stand, or they treat'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) and practice with.',
                  misconception: 'Students often confuse "setting" with "plot" and write a summary of what happens at the stand, or they treat "atmosphere" as a single.' },
                { id: 'c', prompt: 'The poet writes: "The sadness that lurks behind the open prayer / For city money, city money, city money." Apply your understanding of atmosphere to explain.', answer: 'The repetition mimics a desperate chant or prayer, emphasizing the stand owners\'',
                  options: ['The repetition mimics a desperate chant or prayer, emphasizing the stand owners\'', 'prayer', 'setting', 'and write a summary of what happens at the stand, or they treat'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) and practice with.',
                  misconception: 'Students often confuse "setting" with "plot" and write a summary of what happens at the stand, or they treat "atmosphere" as a single.' },
                { id: 'd', prompt: 'Compare the atmosphere in the first stanza ("The little old house was out with a little new shed...") with the atmosphere in the final stanza ("I can\'t help.', answer: 'The first stanza establishes a quiet, observational atmosphere',
                  options: ['The first stanza establishes a quiet, observational atmosphere', 'sadness in both', 'setting', 'and write a summary of what happens at the stand, or they treat'],
                  hint: 'If stuck, review c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) and practice with.',
                  misconception: 'Students often confuse "setting" with "plot" and write a summary of what happens at the stand, or they treat "atmosphere" as a single.' }
          ],
            remediations: { 'students-often-confuse-setting-with': { steps: ['If the student cannot distinguish setting from plot, have them draw a labeled diagram of the stand\'s physical layout.', 'Then ask: "What does each element suggest about the sellers\' lives?" For atmosphere, give them three short extracts.', 'Revisit c11_eng_w_cbse_13_003 (Class 11 Setting and Atmosphere) for foundational practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_004', difficulty: 'standard',
          question: 'Character analysis in \'Aunt Jennifer\'s Tigers\' — the central figure(s), their.',
          hint: 'If stuck, review "inferring character from imagery" in c11_eng_w_cbse_13_004 and re-read.',
          misconception: 'Students treat the roadside stand owners as passive victims because they don\'t speak or rebel.',
          parts: [
                { id: 'a', prompt: 'Identify the collective protagonist in "A Roadside Stand" and quote one phrase from stanza 1 that establishes their economic activity.', answer: 'The protagonist is the rural collective who run the roadside stand',
                  options: ['The protagonist is the rural collective who run the roadside stand', 'the farmer'],
                  hint: 'If stuck, review "inferring character from imagery" in c11_eng_w_cbse_13_004 and re-read stanza 2.',
                  misconception: 'Students treat the roadside stand owners as passive victims because they don\'t speak or rebel.' }
          ],
            remediations: { 'students-treat-the-roadside-stand': { steps: ['Re-read stanza 2 aloud, circling every verb associated with the stand owners ("painted," "offer," "wait," "pray").', 'List these verbs in two columns: "Labour" and "Hope." 3.', 'Ask: "If they were truly passive, which verbs would disappear?" 4.', 'Re-attempt Diagnostic Question 3 using this verb-map as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_005', difficulty: 'standard',
          question: 'Supporting characters in \'Aunt Jennifer\'s Tigers\' — the secondary figures who.',
          hint: 'If stuck, review c11_eng_h_cbse_01_005 (Class 11 Supporting Character Analysis) for the.',
          misconception: 'Students often think "supporting characters" must speak or appear physically.',
          parts: [
                { id: 'a', prompt: 'Explain why the tigers are described as "denizens of a world of green" and "sleek chivalric certainty" — what do these phrases reveal about their symbolic role.', answer: '"Denizens" implies natural belonging and freedom',
                  options: ['"Denizens" implies natural belonging and freedom', 'supporting characters', 'men beneath the tree', '"supporting characters" must speak or appear physically'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_005 (Class 11 Supporting Character Analysis) for the.',
                  misconception: 'Students often think "supporting characters" must speak or appear physically.' },
                { id: 'b', prompt: 'Apply the concept of "foil" to analyze how the tigers function as supporting characters in relation to Aunt Jennifer.', answer: 'Step 1: Identify Aunt Jennifer\'s traits in stanza 2',
                  options: ['Step 1: Identify Aunt Jennifer\'s traits in stanza 2', 'supporting characters', 'men beneath the tree', 'lists traits without contrasting them fails to demonstrate foil function'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_005 (Class 11 Supporting Character Analysis) for the.',
                  misconception: 'Students often think "supporting characters" must speak or appear physically.' },
                { id: 'c', prompt: 'Analyze how Uncle operates as an absent-yet-omnipresent supporting character.', answer: 'The wedding band is "Uncle\'s"',
                  options: ['The wedding band is "Uncle\'s"', 'supporting characters', 'men beneath the tree', '"supporting characters" must speak or appear physically'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_005 (Class 11 Supporting Character Analysis) for the.',
                  misconception: 'Students often think "supporting characters" must speak or appear physically.' }
          ],
            remediations: { 'supporting-characters-must-speak-or': { steps: ['If a student cannot distinguish supporting characters from background imagery: Step 1 — Revisit c12_eng_f_cbse_13_004.', 'Step 2 — Reread stanza 2 aloud, circling every noun phrase that implies another person\'s agency ("Uncle\'s wedding.', 'Step 3 — Complete a T-chart: left column "Aunt Jennifer\'s Reality" (fluttering, burdened, terrified), right column.', 'Step 4 — Re-attempt Diagnostic Question 3 using the chart.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of \'Aunt Jennifer\'s Tigers\' — the central idea the whole text.',
          hint: 'If stuck on "what is the theme?", go to node c12_eng_f_cbse_13_002, stanza 3 ("It is.',
          misconception: '**Misconception:** *"The primary theme is the stall owner\'s personal sadness / the beauty of rural life / the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words: **Why does the poet call the city money "the requisite lift of spirit" that the country folk need?', answer: '**Correct answer:** "Requisite lift of spirit" is deeply ironic',
                  options: ['**Correct answer:** "Requisite lift of spirit" is deeply ironic', 'lift of spirit'],
                  hint: 'If stuck on "what is the theme?", go to node c12_eng_f_cbse_13_002, stanza 3 ("It is in the.',
                  misconception: '**Misconception:** *"The primary theme is the stall owner\'s personal sadness / the beauty of rural life / the inevitability of death."*.' }
          ],
            remediations: { 'misconception-the-primary-theme-is': { steps: ['**Remediation path (3 steps):** 1.', '**Re-read node c12_eng_f_cbse_13_002 (Plot/Narrative Structure)** — specifically the stanza-breakdown of stanzas 2-4.', '**Do a "Tone Mapping" exercise:** Write one adjective for the poet\'s tone in each stanza (e.g., Stanza 1.', '**Re-attempt Diagnostic Question 4** — this time, explicitly name the *policy* being critiqued (forced relocation under.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
