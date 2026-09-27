import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch08 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch08: SimDef = {
    id: 'v3_c11_hist_ch08',
    title: 'Displacing Indigenous Peoples',
    subtitle: 'Covers the *ideological foundations* and *early structural mechanisms* of European.',
    classLevel: 11, subject: 'history', topic: 'Displacing Indigenous Peoples',
    chapters: ['c11_hist_ch08'],
    nodeIds: ['c11_hist_cbse_08_001', 'c11_hist_cbse_08_002', 'c11_hist_cbse_08_003', 'c11_hist_cbse_08_004', 'c11_hist_cbse_08_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: *"Have you ever seen a place name like \'New Delhi\' or \'New Mumbai\' and wondered why so many.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The NCERT states: *"The prairies were cleared for farmland, and wild bison killed off. \'Primitive man will disappear with the primitive animal\'"* (p. 144).',
        options: ['Ecologically: Bison were the keystone species of the Plains ecosystem', 'settler colonialism', 'colonialism'],
        answer: 'Ecologically: Bison were the keystone species of the Plains ecosystem',
        hook: 'Students believe **"settler colonialism" = "colonialism" (like British India)** — i.e., a foreign power ruling.',
    },
    teaching: [
        { title: 'European Imperialism and the Settler Colonies', text: 'European Imperialism in the context of settler colonies (c. 1700s–1900s) refers to the process by which European powers — primarily Britain, France, and the Netherlands — established permanent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['European Imperialism and', 'Displacement of Indigenous Peoples', 'The American West', 'Indigenous Peoples of Australia', 'The Fate of'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_001', title: 'European Imperialism and the Settler Colonies',
          caseStudy: { intro: 'Start by asking: *"Have you ever seen a place name like \'New Delhi\' or \'New Mumbai\' and wondered why so many places in the world start with \'New\'?"* Show the.',
            decisions: [{ prompt: 'In the NCERT textbook, the term *terra nullius* is explicitly linked to which region\'s colonial history, and what does the Latin term.', options: [
                { text: '*Terra nullius* ("nobody\'s land") was the legal doctrine applied to **Australia**,', outcome: '*Terra nullius* ("nobody\'s land") was the legal doctrine applied to **Australia**, declaring the.' },
                { text: 'settler colonialism', outcome: 'Not quite — Students believe **"settler colonialism" = "colonialism" (like British India)** — i.e., a foreign.', reveals: 'settler-colonialism-colonialism-like-british' },
                { text: 'colonialism', outcome: 'Not quite — Students believe **"settler colonialism" = "colonialism" (like British India)** — i.e., a foreign.', reveals: 'settler-colonialism-colonialism-like-british' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_002', title: 'Displacement of Indigenous Peoples in North America',
          caseStudy: { intro: 'Start by asking: "Have you noticed how many Indian cities have \'pura\', \'nagar\', or \'abad\' in their names — and how many American rivers (Mississippi, Ohio) and.',
            decisions: [{ prompt: 'In which year did the US Supreme Court rule in *Worcester v. Georgia* that the Cherokee Nation was a "distinct community" with.', options: [
                { text: 'The ruling was in 1832', outcome: 'The ruling was in 1832. Chief Justice John Marshall held that Georgia state laws had no force.' },
                { text: 'primitive nomads', outcome: 'Not quite — **Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently,.', reveals: 'students-believe-native-americans-were' },
                { text: 'progress', outcome: 'Not quite — **Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently,.', reveals: 'students-believe-native-americans-were' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_003', title: 'The American West and the Gold Rush',
          caseStudy: { intro: 'Start by asking: "You\'ve seen movies where a hero strikes gold and becomes rich.',
            decisions: [{ prompt: 'In which year was gold discovered at Sutter\'s Mill, California, triggering the Gold Rush, and what was the immediate demographic.', options: [
                { text: 'Gold was discovered at Sutter\'s Mill in **1848** (James Marshall, January 24)', outcome: 'Gold was discovered at Sutter\'s Mill in **1848** (James Marshall, January 24).' },
                { text: 'Forty-Niners', outcome: 'Not quite — Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**.', reveals: 'the-gold-rush-was-a' },
                { text: 'get rich quick', outcome: 'Not quite — Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**.', reveals: 'the-gold-rush-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_004', title: 'Indigenous Peoples of Australia — Windschuttle vs the Killing Fields',
          caseStudy: { intro: 'Start by asking: "If a court case today relied only on diaries written by the British police in 1820s Tasmania, but ignored the stories passed down.',
            decisions: [{ prompt: 'What was the specific geographic and temporal focus of Keith Windschuttle\'s critique in *The Fabrication of Aboriginal History, Volume One*.', options: [
                { text: 'Windschuttle focused specifically on **Van Diemen\'s Land (Tasmania) between 1803 and', outcome: 'Windschuttle focused specifically on **Van Diemen\'s Land (Tasmania) between 1803 and 1834**.' },
                { text: 'all of Australia', outcome: 'Not quite — Students often think the "Windschuttle vs. Killing Fields" debate is **simply a disagreement about.', reveals: 'the-windschuttle-vs' },
                { text: 'the 20th century Stolen Generations', outcome: 'Not quite — Students often think the "Windschuttle vs. Killing Fields" debate is **simply a disagreement about.', reveals: 'the-windschuttle-vs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_005', title: 'The Fate of the Natives — Assimilation and Loss of Culture',
          caseStudy: { intro: 'Start by asking: *"Have you seen a place name like \'Mumbai\' (formerly Bombay) or \'Chennai\' (formerly Madras) and wondered why names change?',
            decisions: [{ prompt: 'What was the primary purpose of the **Dawes General Allotment Act (1887)** in the USA, and how did it function to undermine tribal.', options: [
                { text: '**Correct answer:** The Dawes Act (1887) aimed to break up collectively held tribal lands', outcome: '**Correct answer:** The Dawes Act (1887) aimed to break up collectively held tribal lands into.' },
                { text: 'assimilation policies ended in the mid-20th century', outcome: 'Not quite — **Students believe "assimilation policies ended in the mid-20th century" and that Indigenous.', reveals: 'students-believe-assimilation-policies-ended' },
                { text: 'died out', outcome: 'Not quite — **Students believe "assimilation policies ended in the mid-20th century" and that Indigenous.', reveals: 'students-believe-assimilation-policies-ended' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_08_005', title: 'You made it',
          caseStudy: { intro: 'You finished Displacing Indigenous Peoples — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_001', difficulty: 'standard',
          question: 'European Imperialism in the context of settler colonies (c. 1700s–1900s) refers.',
          hint: 'Revisit c8_hist_ch3_1 (Colonialism: Definition) and c8_hist_ch3_5 (Battle of Plassey).',
          misconception: 'Students believe **"settler colonialism" = "colonialism" (like British India)** — i.e., a foreign power ruling.',
          parts: [
                { id: 'a', prompt: 'The NCERT states: *"The prairies were cleared for farmland, and wild bison killed off. \'Primitive man will disappear with the primitive animal\'"* (p. 144).', answer: 'Ecologically: Bison were the keystone species of the Plains ecosystem',
                  options: ['Ecologically: Bison were the keystone species of the Plains ecosystem', 'settler colonialism', 'colonialism', '**"settler colonialism" = "colonialism" (like British India)**'],
                  hint: 'Revisit c8_hist_ch3_1 (Colonialism: Definition) and c8_hist_ch3_5 (Battle of Plassey) — ask: "Did.',
                  misconception: 'Students believe **"settler colonialism" = "colonialism" (like British India)** — i.e., a foreign power ruling a distant territory and.' }
          ],
            remediations: { 'settler-colonialism-colonialism-like-british': { steps: ['135–136** (NCERT intro): Note the distinction — "When the European inhabitants of the colonies became independent.', '**Compare maps**: Map 1 (p.', '141) shows USA expanding *across* the continent; Map 2 (p.', '149) shows Australian colonies hugging the coast.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_002', difficulty: 'standard',
          question: 'The displacement of Indigenous peoples in North America (c. 1600–1890) refers.',
          hint: 'Revisit *Johnson v. M\'Intosh* (1823) summary: Chief Justice Marshall ruled that.',
          misconception: '**Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently, so displacement was.',
          parts: [
                { id: 'a', prompt: 'In which year did the US Supreme Court rule in *Worcester v. Georgia* that the Cherokee Nation was a "distinct community" with self-government rights, and how.', answer: 'The ruling was in 1832',
                  options: ['The ruling was in 1832', 'primitive nomads', 'progress', 'Five Civilised Tribes'],
                  hint: 'Revisit *Johnson v. M\'Intosh* (1823) summary: Chief Justice Marshall ruled that "discovery" gave.',
                  misconception: '**Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently, so displacement was justified.' }
          ],
            remediations: { 'students-believe-native-americans-were': { steps: ['**Revisit the Cherokee Phoenix newspaper (1828)** — read an editorial opposing removal.', 'Ask: "Does this sound like a \'primitive\' society?" 2.', '**Map exercise:** Overlay a map of "Five Civilised Tribes" homelands (pre-1830) with cotton-growing regions and slavery.', '**Compare with Class 8, c8_hist_ch3_9 (Impact of British Rule on Indian Artisans):** Both cases show colonisers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently, so displacement was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The near-extermination of the bison (buffalo) by the 1880s was an ecological side-effect of settlement, not a deliberate policy."', answer: '**False.** It was deliberate',
                  options: ['**False.** It was deliberate', 'unintended consequence', 'primitive nomads', 'progress'],
                  hint: 'Revisit *Johnson v. M\'Intosh* (1823) summary: Chief Justice Marshall ruled that "discovery" gave.',
                  misconception: '**Students believe Native Americans were "primitive nomads" who didn\'t use the land efficiently, so displacement was justified.' }
          ],
            remediations: { 'students-believe-native-americans-were': { steps: ['**Revisit the Cherokee Phoenix newspaper (1828)** — read an editorial opposing removal.', 'Ask: "Does this sound like a \'primitive\' society?" 2.', '**Map exercise:** Overlay a map of "Five Civilised Tribes" homelands (pre-1830) with cotton-growing regions and slavery.', '**Compare with Class 8, c8_hist_ch3_9 (Impact of British Rule on Indian Artisans):** Both cases show colonisers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_003', difficulty: 'standard',
          question: 'The American West and the Gold Rush (c. 1848–1890) refers to the period.',
          hint: 'If confused about *why* treaties were broken, re-read **Node 002 (c11_hist_cbse_08_002)**.',
          misconception: 'Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**, and that conflict with.',
          parts: [
                { id: 'a', prompt: 'In which year was gold discovered at Sutter\'s Mill, California, triggering the Gold Rush, and what was the immediate demographic consequence for the non-Native.', answer: 'Gold was discovered at Sutter\'s Mill in **1848** (James Marshall, January 24)',
                  options: ['Gold was discovered at Sutter\'s Mill in **1848** (James Marshall, January 24)', 'Forty-Niners', 'get rich quick', 'frontier friction'],
                  hint: 'If confused about *why* treaties were broken, re-read **Node 002 (c11_hist_cbse_08_002)** section.',
                  misconception: 'Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**, and that conflict with Natives was.' },
                { id: 'b', prompt: 'Why did the US government violate the Treaty of Fort Laramie (1851), which guaranteed Indigenous control over vast territories including the Black Hills.', answer: 'The 1851 Treaty was violated primarily',
                  options: ['The 1851 Treaty was violated primarily', 'settler greed', 'broken promises', 'pacified'],
                  hint: 'If confused about *why* treaties were broken, re-read **Node 002 (c11_hist_cbse_08_002)** section.',
                  misconception: 'Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**, and that conflict with Natives was.' },
                { id: 'c', prompt: 'Analyze the following primary source excerpt: *"The bison... is the Indians\' commissary...', answer: 'Sheridan reveals the **deliberate policy of ecological warfare**',
                  options: ['Sheridan reveals the **deliberate policy of ecological warfare**', 'overhunting for profit', 'get rich quick', 'frontier friction'],
                  hint: 'If confused about *why* treaties were broken, re-read **Node 002 (c11_hist_cbse_08_002)** section.',
                  misconception: 'Students believe the **Gold Rush was a spontaneous "get rich quick" event for ordinary people**, and that conflict with Natives was.' }
          ],
            remediations: { 'the-gold-rush-was-a': { steps: ['** Show the **California "Act for the Government and Protection of Indians" (1850)** – legalized indentured servitude.', '** Compare **1849 miner diary** (individual) vs. **1855 corporate hydraulic mining photo** (capital-intensive.', '** Map **Pacific Railway Act land grants (1862)** – checkerboard pattern showing *federal* transfer of Indigenous land.', '** Read **Dawes Act Section 1** – "allotment" = *forced privatization*, not a gift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_004', difficulty: 'standard',
          question: 'The "Windschuttle vs. the Killing Fields" debate (c. 2000–2003) refers to the.',
          hint: 'Revisit **c11_hist_cbse_08_001 (European Imperialism and the Settler Colonies)**.',
          misconception: 'Students often think the "Windschuttle vs. Killing Fields" debate is **simply a disagreement about the *number*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Windschuttle vs',
                  options: ['The "Windschuttle vs', 'European Imperialism in the context of settler colonies (c', 'The displacement of Indigenous peoples in North America (c', 'The American West and the Gold Rush (c'],
                  hint: 'Revisit **c11_hist_cbse_08_001 (European Imperialism and the Settler Colonies)** — specifically the.',
                  misconception: 'Students often think the "Windschuttle vs. Killing Fields" debate is **simply a disagreement about the *number* of Aboriginal people.' }
          ],
            remediations: { 'the-windschuttle-vs': { steps: ['**Re-read the "Mutual Perceptions" section in NCERT (p.', '140-141)** on how Europeans and Natives viewed land/law differently—this is the root of the evidence gap.', '**Create a two-column table**: Column A = "Windschuttle\'s Accepted Evidence" (Official dispatches, police reports.', '**Watch the 15-min clip "The History Wars" (ABC Australia, 2003)** focusing on the "Black War" map in Tasmania.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_08_005', difficulty: 'standard',
          question: 'The "Fate of the Natives" refers to the systematic policies of **forced.',
          hint: 'Revisit **c11_hist_cbse_08_001** (European Imperialism and Settler Colonies) — focus.',
          misconception: '**Students believe "assimilation policies ended in the mid-20th century" and that Indigenous cultures "died out".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "Fate of the Natives" refers to the systematic policies of **forced assimilation**',
                  options: ['The "Fate of the Natives" refers to the systematic policies of **forced assimilation**', 'European Imperialism in the context of settler colonies (c', 'The displacement of Indigenous peoples in North America (c', 'The American West and the Gold Rush (c'],
                  hint: 'Revisit **c11_hist_cbse_08_001** (European Imperialism and Settler Colonies) — focus on the.',
                  misconception: '**Students believe "assimilation policies ended in the mid-20th century" and that Indigenous cultures "died out" naturally.** **Reality:**.' }
          ],
            remediations: { 'students-believe-assimilation-policies-ended': { steps: ['** Re-read **Chief Seattle\'s 1854 speech** (NCERT p. 145) — note his refusal to treat land as commodity. **', '** Compare **Dawes Act (1887)** and **Aboriginal Protection Act (QLD 1897)** using a **Venn diagram**: both target.', '** Watch 10-min clip from *"The Canary Effect"* (US) or *"Rabbit-Proof Fence"* (Australia) — identify **three specific.', '** Write one paragraph: *"Assimilation was not a side effect of colonization — it was its engine.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
