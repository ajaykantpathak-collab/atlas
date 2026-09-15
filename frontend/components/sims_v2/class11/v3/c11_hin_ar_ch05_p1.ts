import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch05_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch05_p1',
    title: 'j?kqohj lgk; · Part 1/3',
    subtitle: 'See a modern institution carrying an old hierarchy in its walls.',
    classLevel: 11, subject: 'hin_ar', topic: 'j?kqohj lgk; · Part 1/3',
    chapters: ['c11_hin_ar_ch05'],
    nodeIds: ['c11_hin_ar_cbse_05_001', 'c11_hin_ar_cbse_05_002', 'c11_hin_ar_cbse_05_003', 'c11_hin_ar_cbse_05_004', 'c11_hin_ar_cbse_05_005', 'c11_hin_ar_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing a cantonment\'s promise of equality', intro: 'A new nation, a cantonment town, an old ladder of caste — the story asks who the new order is really for.', goal: 'Analyse caste and education in a post-independence cantonment setting through Nayi Kahani realism.' },
    discovery: {
        question: 'Post-1947 India promised a modern, equal cantonment — did the new order actually erase caste?',
        options: ['No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity', 'Yes — the army\'s discipline abolished caste overnight', 'Yes — independence legally ended all discrimination', 'No — because cantonments don\'t exist anymore'],
        answer: 'No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity',
        hook: 'Nayi Kahani\'s rule: no heroes, no easy rescue — just middle-class realism where dignity must be fought for inside an unequal system.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" prepares students to engage with Shrilal Shukla\'s story "Xyrk Ysgk" by establishing the author\'s literary significance, the socio-historical milieu.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a 20-year movie compressed into 10 minutes—how does the director decide which scenes to show and which to skip?',
            decisions: [{ prompt: 'What are the five stages of Freytag\'s pyramid used for plot analysis in senior secondary English?', options: [
                { text: 'The five stages are: 1) Exposition (establishes setting, characters, status quo), 2)', outcome: 'The five stages are: 1) Exposition (establishes setting, characters, status quo), 2) Rising Action.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students conflate *plot* (what happens) with *narrative structure* (how it\'s told).', reveals: 'students-conflate-plot-what-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your grandmother\'s village house after many years - the smell of damp earth, the sound of the school bell, the hush that falls when.',
            decisions: [{ prompt: 'Identify the three primary physical settings in "xyrk yksgk" where the major events of eksgu\'s childhood unfold, as established in the.', options: [
                { text: 'The three primary physical settings are: (1) the village school (LowQy) where eksgu', outcome: 'The three primary physical settings are: (1) the village school (LowQy) where eksgu studies under.' },
                { text: 'village', outcome: 'Not quite — Students treat setting as a static backdrop - "the story takes place in a village" - and atmosphere.', reveals: 'students-treat-setting-as-a' },
                { text: 'school and home', outcome: 'Not quite — Students treat setting as a static backdrop - "the story takes place in a village" - and atmosphere.', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re watching a news report about a talented student from a marginalized community who tops the board exams but still faces discrimination when.',
            decisions: [{ prompt: 'What is the primary theme of "जूही की कली" as revealed through the protagonist Eksgu\'s life trajectory from childhood to adulthood?', options: [
                { text: 'The primary theme is the systemic caste-based discrimination that denies human dignity', outcome: 'The primary theme is the systemic caste-based discrimination that denies human dignity and equal.' },
                { text: 'the importance of hard work', outcome: 'Not quite — Students often confuse "theme" with "topic" or "plot summary" — they write "the story is about.', reveals: 'students-often-confuse-theme-with' },
                { text: 'father-son conflict', outcome: 'Not quite — Students often confuse "theme" with "topic" or "plot summary" — they write "the story is about.', reveals: 'students-often-confuse-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates a story set in an army cantonment where a Dalit boy\'s education is his only escape. One student calls it \'a sad tale about one cruel officer and a lucky boy — the quarters, the school, the floods are just background.\'',
            decisions: [{ prompt: 'What\'s missing from that reading?', options: [
                { text: 'Reframe through context and structure: Shukla/Shivprasad Singh write in the Nayi Kahani mode — the cantonment is a designed microcosm where quarters are allotted by rank and caste and the school is the only porous boundary, so institutions, not one villain, reproduce caste. And the elliptical structure — childhood, flood, clerkship with years skipped — enacts how change for a lower-caste life isn\'t a smooth climb but rare visible breakthroughs between invisible struggle.', outcome: 'The debate shifts from pity to analysis: \'Low Quarter vs Officer Quarter\' reads as structural evidence, and the gaps in time become the argument.' },
                { text: 'Keep the individual-villain reading — the story works as a warning about cruel officers.', outcome: 'Personalising it hides the target: the story dissects how school, army and family as systems reproduce caste — replacing one officer changes nothing.', reveals: 'caste-is-one-bad-officer' },
                { text: 'Fill in the missing years in your summary — schooling and job-hunting must have happened, so narrate them.', outcome: 'The ellipsis is deliberate: making struggle invisible between breakthroughs is how the structure mirrors the theme — summarising the gaps erases the design.', reveals: 'gaps-are-just-missing-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The story refuses both cynicism and fantasy — dignity is possible, but only through struggle the system makes necessary.',
            decisions: [{ prompt: 'What comes next? j?kqohj lgk; · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — j?kqohj lgk; · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" prepares students to engage with.',
          hint: 'If stuck, review Class 10 History "Nationalism in India" (caste and nationalism debates).',
          misconception: 'Students often treat "context" as a list of facts to memorize (author birth year, movement dates) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" prepares students to engage with Shrilal',
                  options: ['"Before You Read: Context and Background" prepares students to engage with Shrilal', 'Plot is the logical sequence of causally connected events that constitute the story,', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If stuck, review Class 10 History "Nationalism in India" (caste and nationalism debates) and Class.',
                  misconception: 'Students often treat "context" as a list of facts to memorize (author birth year, movement dates) rather than an analytical lens.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['If a student cannot articulate the three structural features of cantonment caste hierarchy (quarters-rank-caste.', 'Instead: (1) Give them a blank cantonment map—ask them to place "Officer Quarters," "JCO Quarters," "Sweeper Lines,".', 'Why/why not?" This forces structural thinking over factual recall.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "context" as a list of facts to memorize (author birth year, movement dates) rather than.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The Nayi Kahani movement\'s focus on \'ordinary people\' makes its stories apolitical—they just show life as it is." Use "Xyrk Ysgk"s.', answer: 'The claim is false',
                  options: ['The claim is false', 'non-ideological', 'apolitical'],
                  hint: 'If stuck, review Class 10 History "Nationalism in India" (caste and nationalism debates) and Class.',
                  misconception: 'Students often treat "context" as a list of facts to memorize (author birth year, movement dates) rather than an analytical lens.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['If a student cannot articulate the three structural features of cantonment caste hierarchy (quarters-rank-caste.', 'Instead: (1) Give them a blank cantonment map—ask them to place "Officer Quarters," "JCO Quarters," "Sweeper Lines,".', 'Why/why not?" This forces structural thinking over factual recall.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_002', difficulty: 'standard',
          question: 'Plot is the logical sequence of causally connected events that constitute the.',
          hint: 'If stuck, re-read the "Before You Read" section (c11_hin_ar_cbse_05_001) and the.',
          misconception: 'Students conflate *plot* (what happens) with *narrative structure* (how it\'s told).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the logical sequence of causally connected events that constitute the story,',
                  options: ['Plot is the logical sequence of causally connected events that constitute the story,', '"Before You Read: Context and Background" prepares students to engage with Shrilal', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If stuck, re-read the "Before You Read" section (c11_hin_ar_cbse_05_001) and the end-of-chapter.',
                  misconception: 'Students conflate *plot* (what happens) with *narrative structure* (how it\'s told).' }
          ],
            remediations: { 'students-conflate-plot-what-happens': { steps: ['Give the student 10 scrambled events from the story (e.g., "Eksgu gets clerk job," "Flood rescue," "Teacher dies,".', 'Ask them to reorder chronologically (plot).', 'Then: "Which events are *shown in detail*?', 'Label each detailed scene with Freytag\'s stage." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, review the narrative structure node (c11_hin_ar_cbse_05_002) focusing on the.',
          misconception: 'Students treat setting as a static backdrop - "the story takes place in a village" - and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', '"Before You Read: Context and Background" prepares students to engage with Shrilal', 'Plot is the logical sequence of causally connected events that constitute the story,', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If stuck, review the narrative structure node (c11_hin_ar_cbse_05_002) focusing on the timeline.',
                  misconception: 'Students treat setting as a static backdrop - "the story takes place in a village" - and atmosphere as a single adjective - "the mood.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student draw a rough map of the village marking LowQy, eksgu\'s ?, the xk¡o, and the temple/well.', 'For each location, ask them to find two quotes - one from early childhood (pages 56-59) and one from the later timeline.', 'Ask: "Who has power in this space in quote 1? Who has power in quote 2? What sensory detail signals the shift?"', 'Guide them to write one comparative sentence per location using the template: "In [location], the atmosphere shifts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, return to the plot timeline (node 002) and mark every page reference where.',
          misconception: 'Students conflate "protagonist" with "hero who fights back visibly." They read Eksgu\'s silence as passivity and miss.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the central character\'s',
                  options: ['Character analysis of the protagonist involves examining the central character\'s', '"Before You Read: Context and Background" prepares students to engage with Shrilal', 'Plot is the logical sequence of causally connected events that constitute the story,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, return to the plot timeline (node 002) and mark every page reference where Eksgu.',
                  misconception: 'Students conflate "protagonist" with "hero who fights back visibly." They read Eksgu\'s silence as passivity and miss that his *endurance.' }
          ],
            remediations: { 'students-conflate-protagonist-with-hero': { steps: ['If a student insists Eksgu is "weak" or "passive," do not lecture.', 'Instead: 1) Have them re-read the haircut scene (p.56) and list every verb associated with Eksgu—notice "pyk Fkk".', '2) Compare his inner monologue during the poem incident (p.59) with Èkujke\'s outer reaction—whose response changes the.', '3) Ask: "If Eksgu shouted at the teacher, what happens next?" Guide them to see the text\'s answer: expulsion, family.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures in.',
          hint: 'Review c11_hin_ar_cbse_05_004\'s worked examples on tracing eksgu\'s silence and resistance.',
          misconception: 'Students treat supporting characters as "minor" — less important than the protagonist — and write superficial sketches.',
          parts: [
                { id: 'a', prompt: 'Apply the "foil character" concept: How does oa\'khèkj\'s treatment of eksgu contrast with ekLVj f=kyksd flag\'s treatment, and what does this contrast reveal.', answer: 'Step 1: Identify ekLVj f=kyksd flag\'s actions',
                  options: ['Step 1: Identify ekLVj f=kyksd flag\'s actions', 'same role, different choice', 'and ekLVj'],
                  hint: 'Review c11_hin_ar_cbse_05_004\'s worked examples on tracing eksgu\'s silence and resistance — then.',
                  misconception: 'Students treat supporting characters as "minor" — less important than the protagonist — and write superficial sketches (appearance, a few.' },
                { id: 'b', prompt: 'Analyze g¡lqos\'s silence throughout the story. Is her silence submission, resistance, or both? Support with three textual instances.', answer: 'g¡lqos\'s silence is *both* submission and resistance',
                  options: ['g¡lqos\'s silence is *both* submission and resistance', 'passive', 'strong'],
                  hint: 'Review c11_hin_ar_cbse_05_004\'s worked examples on tracing eksgu\'s silence and resistance — then.',
                  misconception: 'Students treat supporting characters as "minor" — less important than the protagonist — and write superficial sketches (appearance, a few.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Give the student a two-column table. Column A: "Character\'s Action/Dialogue" (quote 3-4 textual moments).', 'Model one row together using èkujke.', 'Have the student complete the table for ekLVj f=kyksd flag and g¡lqos.', 'Ask: "If you removed this character, what would the caste system lose?" This forces structural thinking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or universal.',
          hint: 'If stuck, review "Plot and Narrative Structure" (c11_hin_ar_cbse_05_002) focusing on the.',
          misconception: 'Students often confuse "theme" with "topic" or "plot summary" — they write "the story is about a lower-caste boy who.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Thakurain\'s sympathetic behavior toward Eksgu (giving him food, defending him to her husband) does NOT contradict the story\'s.', answer: 'Thakurain\'s kindness operates within caste boundaries',
                  options: ['Thakurain\'s kindness operates within caste boundaries', 'she is a good person so caste doesn\'t matter', 'plot summary', 'the story is about a lower-caste boy who becomes a lawyer'],
                  hint: 'If stuck, review "Plot and Narrative Structure" (c11_hin_ar_cbse_05_002) focusing on the time-jumps.',
                  misconception: 'Students often confuse "theme" with "topic" or "plot summary" — they write "the story is about a lower-caste boy who becomes a lawyer".' }
          ],
            remediations: { 'students-often-confuse-theme-with': { steps: ['If a student gives a topic/plot instead of a theme: Step 1 — Ask "What is the story SAYING about caste discrimination?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
