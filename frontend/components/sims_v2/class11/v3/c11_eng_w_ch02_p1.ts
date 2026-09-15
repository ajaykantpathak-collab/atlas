import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch02_p1: SimDef = {
    id: 'v3_c11_eng_w_ch02_p1',
    title: 'A Pair of Mustachios (Short Story) · Part 1/3',
    subtitle: 'Watch facial hair become a caste certificate men will bankrupt themselves over.',
    classLevel: 11, subject: 'eng_w', topic: 'A Pair of Mustachios (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch02'],
    nodeIds: ['c11_eng_w_cbse_02_001', 'c11_eng_w_cbse_02_002', 'c11_eng_w_cbse_02_003', 'c11_eng_w_cbse_02_004', 'c11_eng_w_cbse_02_005', 'c11_eng_w_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist decoding a village\'s moustache politics', intro: 'A moneylender dares to curl his moustache like a tiger\'s — and an impoverished Khan calls it theft of birthright.', goal: 'Analyse the doubled confrontation structure and the story\'s ironic non-resolution.' },
    discovery: {
        question: 'Two confrontations over one moustache tip: the first costs a nose-ring, the second costs everything Khan Azam Khan owns. Which is the climax?',
        options: ['The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure', 'The first — it has the fiercer dialogue and open threats', 'Neither — the climax is the moustache hierarchy being explained', 'The second — but only because the elders witness the deed'],
        answer: 'The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure',
        hook: 'Ramanand yields in round one and loses nothing real; the climax is where the stakes become irreversible.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, social, and literary framework needed to interpret a text before engaging with its narrative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map both confrontations onto the arc, then weigh the last line — \'My father was a Sultan\' — as resolution or the cycle restarting.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you overhear two adults arguing fiercely about whether a "handlebar" or "walrus" moustache is more "respectable" in your neighbourhood—sounds absurd.',
            decisions: [{ prompt: 'Define the term "nouveau riche" and explain why Mulk Raj Anand associates it with the "goat moustache" in the story\'s opening.', options: [
                { text: '"Nouveau riche" is a French term meaning "newly rich"—people who recently acquired wealth', outcome: '"Nouveau riche" is a French term meaning "newly rich"—people who recently acquired wealth but lack.' },
                { text: 'nouveau riche means old money', outcome: 'Not quite — Students often think the moustache classification is **pure fiction or exaggeration** invented.', reveals: 'the-moustache-classification-is-pure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are trying to explain "A Pair of Mustachios" to a friend who hasn\'t read it — you might jump straight to the funny ending where Khan Azam Khan.',
            decisions: [{ prompt: 'Identify the inciting incident in "A Pair of Mustachios" and explain why it qualifies as the inciting incident rather than part of the.', options: [
                { text: 'The inciting incident is Seth Ramanand twisting his goat moustache tips upward to', outcome: 'The inciting incident is Seth Ramanand twisting his goat moustache tips upward to resemble a tiger.' },
                { text: 'the exposition describing moustache types', outcome: 'Not quite — Students often identify the *first* confrontation (nose-ring) as the climax because it contains.', reveals: 'students-often-identify-the-first' },
                { text: 'rising action', outcome: 'Not quite — Students often identify the *first* confrontation (nose-ring) as the climax because it contains.', reveals: 'students-often-identify-the-first' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are watching a play where the stage design instantly tells you the story\'s world before any actor speaks.',
            decisions: [{ prompt: 'Identify the three primary physical locations in the story where the central conflict unfolds, and state one sensory detail associated with.', options: [
                { text: 'The three primary locations are: (1) Ramanand\'s moneylender/grocer shop', outcome: 'The three primary locations are: (1) Ramanand\'s moneylender/grocer shop — sensory detail: "oily.' },
                { text: 'oily hand', outcome: 'Not quite — Students often think "setting" only means the geographical location (e.g., "an Indian village") and.', reveals: 'setting-only-means-the-geographical' },
                { text: 'lentil-eating shopkeeper', outcome: 'Not quite — Students often think "setting" only means the geographical location (e.g., "an Indian village") and.', reveals: 'setting-only-means-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a detective trying to figure out why a clever shopkeeper would risk his life over a moustache tip.',
            decisions: [{ prompt: 'What is the primary motivation driving Ramanand\'s actions throughout the story?', options: [
                { text: 'Ramanand is primarily motivated by business acumen and profit maximization', outcome: 'Ramanand is primarily motivated by business acumen and profit maximization; he manipulates the.' },
                { text: 'honour', outcome: 'Not quite — Students often read Ramanand as a "villain" exploiting a "noble" Khan, because they import moral.', reveals: 'students-often-read-ramanand-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you see two people arguing fiercely over a logo on a T-shirt—one claims it proves he\'s elite, the other says it\'s fake.',
            decisions: [{ prompt: 'What is the primary theme of "A Pair of Mustachios" as introduced in the opening paragraphs of the story?', options: [
                { text: 'The primary theme is the absurdity and rigidity of class distinctions marked by moustache', outcome: 'The primary theme is the absurdity and rigidity of class distinctions marked by moustache styles.' },
                { text: 'the story is about a moneylender cheating a nobleman', outcome: 'Not quite — Students often think the primary theme is simply "pride goes before a fall" or "greed leads.', reveals: 'the-primary-theme-is-simply' },
                { text: 'pride goes before a fall', outcome: 'Not quite — Students often think the primary theme is simply "pride goes before a fall" or "greed leads.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a street-play contest your troupe adapts Mulk Raj Anand\'s \'A Pair of Mustachios\' — a village moneylender with a \'tiger\' moustache versus a ruined landlord clinging to his \'goat\' style. A member wants to modernise it into a plain comedy about facial-hair fashion: \'Moustache shapes are just style choices, keep the jokes.\'',
            decisions: [{ prompt: 'What does the moustache actually carry in the story?', options: [
                { text: 'Rank itself — in Anand\'s colonial-India satire each moustache style is a class/caste badge; the landlord\'s refusal to lower his is clinging to vanished status while the moneylender\'s upward \'tiger\' twist is new money aping old nobility. Strip the hierarchy and the satire — laughing at social pretension — becomes mere grooming comedy.', outcome: 'The whiskers are a symbolic code for hierarchy; reading them as fashion erases the critique of class pride the story is built on.' },
                { text: 'The modernisation works — audiences today won\'t get caste references, so fashion jokes are safer.', outcome: 'Removing the code removes the story: the whole point is a status war fought through an absurd proxy — prestige marks mistaken for the prestige itself.', reveals: 'moustache-is-just-fashion' },
                { text: 'Turn it into a tragedy — the landlord loses everything, so play it straight and sad.', outcome: 'Anand\'s weapon is satire, not pathos; the comedy is precisely how the critique lands — solemnising it loses the sting.', reveals: 'satire-played-as-tragedy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The moustache tips stay down, the heirlooms change hands, and the loser walks off inventing royal blood — the performance never ends.',
            decisions: [{ prompt: 'What comes next? A Pair of Mustachios (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Pair of Mustachios (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'Review the "Social and Economic Changes under British Rule" section in Class 10 History.',
          misconception: 'Students often think the moustache classification is **pure fiction or exaggeration** invented by Anand for humour.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" provides the essential historical, social, and',
                  options: ['"Before You Read: Context and Background" provides the essential historical, social, and', 'Plot and Narrative Structure refers to the organized sequence of events in a story,', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'Review the "Social and Economic Changes under British Rule" section in Class 10 History (or Class 8.',
                  misconception: 'Students often think the moustache classification is **pure fiction or exaggeration** invented by Anand for humour.' }
          ],
            remediations: { 'the-moustache-classification-is-pure': { steps: ['If a student treats the moustache codes as pure fantasy: (1) Show them 2-3 historical photographs (e.g., a Rajput.', '(2) Have them research "moustache regulations in British Indian Army" to find actual orders specifying styles.', '(3) Re-read the opening paragraph asking: "Which details sound like observed fact vs.', 'comic exaggeration?" (e.g., "patented by Government of India" = exaggeration; "murders...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the organized sequence of events in.',
          hint: 'Review "The Necklace" (c10_engl_cbse_16_005) plot mapping exercise — identify the exact.',
          misconception: 'Students often identify the *first* confrontation (nose-ring) as the climax because it contains heated dialogue and.',
          parts: [
                { id: 'a', prompt: 'The story contains two major confrontations over the moustache tip (first over the nose-ring, then over the necklace).', answer: 'The two confrontations form a *single* rising action',
                  options: ['The two confrontations form a *single* rising action', 'rising action'],
                  hint: 'Review "The Necklace" (c10_engl_cbse_16_005) plot mapping exercise — identify the exact moment.',
                  misconception: 'Students often identify the *first* confrontation (nose-ring) as the climax because it contains heated dialogue and threats ("I shall wring.' },
                { id: 'b', prompt: 'Map the following events to their correct plot stages: (a) The village elders witness the deed signing, (b) Ramanand describes the moustache hierarchy to the.', answer: 'The village elders witness the deed signing, (',
                  options: ['The village elders witness the deed signing, (', 'rising action'],
                  hint: 'Review "The Necklace" (c10_engl_cbse_16_005) plot mapping exercise — identify the exact moment.',
                  misconception: 'Students often identify the *first* confrontation (nose-ring) as the climax because it contains heated dialogue and threats ("I shall wring.' }
          ],
            remediations: { 'students-often-identify-the-first': { steps: ['If a student misidentifies the climax or cannot map events to plot stages: (1) Have them create a two-column timeline.', '(3) The row with the *greatest irreversible loss* marks the climax.', '(4) Practice with a simpler Class 10 story like "The Necklace" (c10_engl_cbse_16_005) where the climax (realizing the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often identify the *first* confrontation (nose-ring) as the climax because it contains heated dialogue and.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the resolution of "A Pair of Mustachios" is a true resolution (conflict settled) or an ironic non-resolution (conflict perpetuated).', answer: 'It is an *ironic non-resolution*',
                  options: ['It is an *ironic non-resolution*', 'rising action'],
                  hint: 'Review "The Necklace" (c10_engl_cbse_16_005) plot mapping exercise — identify the exact moment.',
                  misconception: 'Students often identify the *first* confrontation (nose-ring) as the climax because it contains heated dialogue and threats ("I shall wring.' }
          ],
            remediations: { 'students-often-identify-the-first': { steps: ['If a student misidentifies the climax or cannot map events to plot stages: (1) Have them create a two-column timeline.', '(3) The row with the *greatest irreversible loss* marks the climax.', '(4) Practice with a simpler Class 10 story like "The Necklace" (c10_engl_cbse_16_005) where the climax (realizing the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'Review "Setting: The Jungle, Railway and the Tunnel" (c7_engl_ch04_001) and "Atmosphere.',
          misconception: 'Students often think "setting" only means the geographical location (e.g., "an Indian village") and "atmosphere" only.',
          parts: [
                { id: 'a', prompt: 'Identify the three primary physical locations in the story where the central conflict unfolds, and state one sensory detail associated with each.', answer: 'The three primary locations are: (1) Ramanand\'s moneylender/grocer shop',
                  options: ['The three primary locations are: (1) Ramanand\'s moneylender/grocer shop', 'oily hand', 'lentil-eating shopkeeper', 'stately ruins'],
                  hint: 'Review "Setting: The Jungle, Railway and the Tunnel" (c7_engl_ch04_001) and "Atmosphere: Heat.',
                  misconception: 'Students often think "setting" only means the geographical location (e.g., "an Indian village") and "atmosphere" only means the general.' },
                { id: 'b', prompt: 'Explain how the social setting — the unwritten code linking moustache styles to class — functions as an invisible "law" that governs character behavior in the.', answer: 'The moustache code acts as an invisible law because: (1) It dictates identity',
                  options: ['The moustache code acts as an invisible law because: (1) It dictates identity', 'setting', 'an Indian village', 'atmosphere'],
                  hint: 'Review "Setting: The Jungle, Railway and the Tunnel" (c7_engl_ch04_001) and "Atmosphere: Heat.',
                  misconception: 'Students often think "setting" only means the geographical location (e.g., "an Indian village") and "atmosphere" only means the general.' },
                { id: 'c', prompt: 'Apply the concept of "atmosphere shift" to the scene at Ramanand\'s shop: describe the atmosphere when Khan first enters, how it changes during the negotiation.', answer: 'Atmosphere shifts in three stages: (1) Entry',
                  options: ['Atmosphere shifts in three stages: (1) Entry', 'sourly', 'Since when have the lentil-eating shopkeepers become noblemen?', 'seed of a donkey'],
                  hint: 'Review "Setting: The Jungle, Railway and the Tunnel" (c7_engl_ch04_001) and "Atmosphere: Heat.',
                  misconception: 'Students often think "setting" only means the geographical location (e.g., "an Indian village") and "atmosphere" only means the general.' }
          ],
            remediations: { 'setting-only-means-the-geographical': { steps: ['If a student gives only generic setting/mood labels: (1) Have them draw a map of the story\'s three key spaces (shop.', '(2) Ask them to highlight every verb describing Khan\'s voice ("asked sourly," "raged," "roared," "spluttered,".', '(3) Give them the sentence: "The moustache code turns the village into a board game where each space has rules." Have.', 'This moves them from label to system.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, review the "business acumen" question in NCERT Understanding the Text Q2 and.',
          misconception: 'Students often read Ramanand as a "villain" exploiting a "noble" Khan, because they import moral judgment into.',
          parts: [
                { id: 'a', prompt: 'What is the primary motivation driving Ramanand\'s actions throughout the story?', answer: 'Ramanand is primarily motivated by business acumen and profit maximization',
                  options: ['Ramanand is primarily motivated by business acumen and profit maximization', 'honour'],
                  hint: 'If stuck, review the "business acumen" question in NCERT Understanding the Text Q2 and map each.',
                  misconception: 'Students often read Ramanand as a "villain" exploiting a "noble" Khan, because they import moral judgment into a satirical text.' }
          ],
            remediations: { 'students-often-read-ramanand-as': { steps: ['Re-read the opening taxonomy of moustaches: notice the narrator\'s mock-anthropological tone.', 'Track every transaction: what does Ramanand give vs.', 'Ask: "Who has agency at the end?" The Khan walks away proud but penniless; Ramanand owns the house and mocks the Khan\'s.', 'Write one paragraph stating: "Ramanand wins because he treats symbols as commodities."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_02_004) focusing on the.',
          misconception: 'Students often treat supporting characters as "background decoration" and write character sketches that only list.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the landlord Chaudhary Chottu Ram declares the moneylender\'s compromise "fair" when Ramanand agrees to lower one moustache tip.', answer: 'The landlord calls it "fair"',
                  options: ['The landlord calls it "fair"', 'neutrality', 'wisdom'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_02_004) focusing on the narrator\'s use.',
                  misconception: 'Students often treat supporting characters as "background decoration" and write character sketches that only list physical traits or single.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student writes superficial character sketches, do this 3-step remediation: (1) Have them re-read only the.', '(2) Ask: "What does this character GAIN from this interaction?" for each highlighted line.', '(3) Have them rewrite one paragraph explaining how these three characters together form a "triangle of power" that.', 'Use the phrase "economic interest disguised as tradition" as the analytical lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'Review the distinction between plot summary and theme statement using a familiar story.',
          misconception: 'Students often think the primary theme is simply "pride goes before a fall" or "greed leads to loss," reducing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" provides the essential historical, social, and', 'Plot and Narrative Structure refers to the organized sequence of events in a story,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the distinction between plot summary and theme statement using a familiar story (e.g., "The.',
                  misconception: 'Students often think the primary theme is simply "pride goes before a fall" or "greed leads to loss," reducing the story to a moral fable.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student gives a moral-fable reading, guide them through three steps: (1) List every character who wears.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
