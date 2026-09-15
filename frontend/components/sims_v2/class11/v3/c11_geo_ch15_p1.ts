import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch15_p1: SimDef = {
    id: 'v3_c11_geo_ch15_p1',
    title: 'Wildlife and Conservation · Part 1/2',
    subtitle: 'Separate \'found only here\' from \'about to vanish\' — they\'re different claims.',
    classLevel: 11, subject: 'geography', topic: 'Wildlife and Conservation · Part 1/2',
    chapters: ['c11_geo_ch15'],
    nodeIds: ['c11_geo_cbse_15_001', 'c11_geo_cbse_15_002', 'c11_geo_cbse_15_003', 'c11_geo_cbse_15_004', 'c11_geo_cbse_15_005', 'c11_geo_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a conservation biologist reading a fragmenting map', intro: 'A tiger dead on a railway line, a bustard downed by power cables — the map explains the deaths better than the poachers do.', goal: 'Distinguish endemism from endangerment and evaluate fragmentation as the dominant threat.' },
    discovery: {
        question: 'The lion-tailed macaque lives nowhere on Earth but the Western Ghats — so being endemic means it\'s endangered, right?',
        options: ['No — endemic means restricted to one place; it\'s only listed Vulnerable, and widespread species like the elephant can be more threatened', 'Yes — a small range guarantees a small, doomed population', 'Yes — endemism and endangerment are the same label', 'No — endemic species are always the safest'],
        answer: 'No — endemic means restricted to one place; it\'s only listed Vulnerable, and widespread species like the elephant can be more threatened',
        hook: 'Poaching grabs headlines, but the quieter killer is fragmentation — tigers rose to 3,682 by 2022 inside connected reserves while corridors keep bleeding.',
    },
    teaching: [
        { title: 'Wildlife of India: Faunal Diversity and Endemism', text: 'Faunal diversity refers to the variety of animal species—including mammals, birds, reptiles, amphibians, fish, and invertebrates—occurring naturally within a defined geographic region.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map India\'s biogeographic zones onto its endemics, then weigh poaching statistics against the habitat-fragmentation ceiling on tiger recovery.',
        labels: ['Wildlife of India: Faunal', 'Endangered Species in India', 'Project Tiger and Project', 'Biosphere Reserves in India', 'National Parks and Wildlife', 'Conservation: In-situ and Ex-situ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_002', title: 'Endangered Species in India: Causes of Decline',
          caseStudy: { intro: 'Begin with a real-world observation: Show students a recent newspaper headline about a tiger death in a railway corridor in central India or a Great Indian.',
            decisions: [{ prompt: 'Name the six major anthropogenic drivers of wildlife population decline in India as recognized by the IUCN and the Wildlife Institute.', options: [
                { text: 'The six drivers are: (1) Habitat loss and fragmentation (e.g., conversion of Terai', outcome: 'The six drivers are: (1) Habitat loss and fragmentation (e.g., conversion of Terai grasslands.' },
                { text: 'deforestation', outcome: 'Not quite — Students often think "endangered species decline is mainly due to direct killing (poaching)" and.', reveals: 'endangered-species-decline-is-mainly' },
                { text: 'endangered species decline is mainly due to direct killing (poaching)', outcome: 'Not quite — Students often think "endangered species decline is mainly due to direct killing (poaching)" and.', reveals: 'endangered-species-decline-is-mainly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_003', title: 'Project Tiger and Project Elephant: Conservation Programmes',
          caseStudy: { intro: 'Imagine you are standing at the edge of Bandipur Tiger Reserve in Karnataka: you see a signboard marking the "Core Zone — No Entry" and beyond it a "Buffer.',
            decisions: [{ prompt: 'What are the two main zones in a tiger reserve under Project Tiger, and what is the primary management objective of each zone?', options: [
                { text: 'Correct answer: Core Zone (critical tiger habitat, inviolate, no human activity) and', outcome: 'Correct answer: Core Zone (critical tiger habitat, inviolate, no human activity) and Buffer Zone.' },
                { text: 'Core Zone for tourism, Buffer Zone for tigers', outcome: 'Not quite — Students often think Project Tiger and Project Elephant are separate, non-overlapping schemes.', reveals: 'project-tiger-and-project-elephant' },
                { text: 'buffer is the main habitat, missing that core is breeding nucleus', outcome: 'Not quite — Students often think Project Tiger and Project Elephant are separate, non-overlapping schemes.', reveals: 'project-tiger-and-project-elephant' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_004', title: 'Biosphere Reserves in India: Concept and Network',
          caseStudy: { intro: 'Imagine you are visiting the Nilgiri hills and see a signboard: "Nilgiri Biosphere Reserve – India\'s First UNESCO Biosphere Reserve." You notice tea.',
            decisions: [{ prompt: 'What are the three mandatory zones in a UNESCO Biosphere Reserve, and which zone permits the highest intensity of human economic activity?', options: [
                { text: 'The three zones are: Core Zone (strictly protected, no human activity), Buffer Zone', outcome: 'The three zones are: Core Zone (strictly protected, no human activity), Buffer Zone (surrounds.' },
                { text: 'Buffer Zone', outcome: 'Not quite — Students frequently confuse **Biosphere Reserves** with **National Parks** in three ways: (1) They.', reveals: 'students-frequently-confuse-biosphere-reserves' },
                { text: 'Biosphere Reserve', outcome: 'Not quite — Students frequently confuse **Biosphere Reserves** with **National Parks** in three ways: (1) They.', reveals: 'students-frequently-confuse-biosphere-reserves' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_006', title: 'Conservation: In-situ and Ex-situ Methods',
          caseStudy: { intro: 'Imagine visiting Kaziranga National Park in Assam: you see wild one-horned rhinos grazing in their natural floodplain grasslands, interacting with deer, birds.',
            decisions: [{ prompt: 'Define in-situ conservation and give two Indian examples from the protected area network.', options: [
                { text: 'In-situ conservation is the on-site protection of genetic resources in natural', outcome: 'In-situ conservation is the on-site protection of genetic resources in natural populations of plant.' },
                { text: 'keeping animals in zoos for public display', outcome: 'Not quite — Students often think ex-situ conservation means "keeping animals in zoos for public display" and.', reveals: 'ex-situ-conservation-means-keeping' },
                { text: 'just declaring a national park', outcome: 'Not quite — Students often think ex-situ conservation means "keeping animals in zoos for public display" and.', reveals: 'ex-situ-conservation-means-keeping' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your eco-club debates how to save the lion-tailed macaque. One member says: \'It\'s endemic to the Western Ghats, so it\'s automatically endangered — the answer is anti-poaching patrols, since killing is what drives species to extinction.\'',
            decisions: [{ prompt: 'What two corrections does the plan need?', options: [
                { text: 'Separate the terms first: endemic means restricted to a place (the macaque lives nowhere else), not automatically endangered — some endemics like the Andaman day gecko are abundant. Then fix the driver: for most Indian species, habitat fragmentation — roads, rail, power lines slicing habitat into isolated patches — is the pervasive threat, creating edge effects and extinction vortices, as with Great Indian Bustards hitting power lines.', outcome: 'The plan shifts from patrols to connectivity: protecting contiguous habitat corridors tackles the spatial problem that actually drives decline.' },
                { text: 'Endorse the plan — endemic means rare, rare means endangered, and poaching is the main killer.', outcome: 'Every link is broken: endemism describes range, not risk; the IUCN status is separate; and fragmentation, not direct killing, is the primary driver for most species.', reveals: 'endemic-equals-endangered-poaching-main' },
                { text: 'Refocus on widespread species instead — only common animals like the elephant need help since endemics are doomed anyway.', outcome: 'Widespread species can indeed be more threatened, but endemism itself isn\'t doom — small-range species can be stable where habitat stays intact.', reveals: 'endemics-are-doomed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'Isolation creates endemics; disconnection creates the endangered — one is a product of geography, the other of us.',
            decisions: [{ prompt: 'What comes next? Wildlife and Conservation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Wildlife and Conservation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_001', difficulty: 'standard',
          question: 'Faunal diversity refers to the variety of animal species—including mammals.',
          hint: 'Revisit Class 10 Geography Chapter 2 (Forest and Wildlife Resources) node.',
          misconception: 'Students conflate "endemic" with "endangered," assuming a species restricted to a small area (endemic) is automatically.',
          parts: [
                { id: 'a', prompt: 'Compare the patterns of faunal endemism in the Andaman & Nicobar Islands versus the Western Ghats.', answer: 'Andaman & Nicobar: High endemism results from oceanic isolation (island',
                  options: ['Andaman & Nicobar: High endemism results from oceanic isolation (island', 'isolated'],
                  hint: 'Revisit Class 10 Geography Chapter 2 (Forest and Wildlife Resources) node c10_geo_cbse_02_002 for.',
                  misconception: 'Students conflate "endemic" with "endangered," assuming a species restricted to a small area (endemic) is automatically threatened with.' }
          ],
            remediations: { 'students-conflate-endemic-with-endangered': { steps: ['Create a 2x2 matrix: Endemic vs. Non-endemic (rows) × Threatened vs. Non-threatened (columns).', 'Plot five Indian species using IUCN Red List: Endemic+Threatened (Lion-tailed macaque), Endemic+Non-threatened (Andaman.', 'Verify each status on the IUCN website.', 'Discuss why endemism *increases vulnerability* but does not *equal* threat status—threat requires additional drivers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_002', difficulty: 'standard',
          question: 'Endangered species in India are those wild fauna and flora populations that.',
          hint: 'If stuck, revisit the "Causes of Depletion of Forest and Wildlife Resources".',
          misconception: 'Students often think "endangered species decline is mainly due to direct killing (poaching)" and overlook that *habitat.',
          parts: [
                { id: 'a', prompt: 'Explain why habitat fragmentation is more detrimental to large carnivores like tigers than an equivalent amount of habitat loss that leaves a single contiguous.', answer: 'Fragmentation breaks a large habitat into smaller, isolated patches',
                  options: ['Fragmentation breaks a large habitat into smaller, isolated patches', 'both reduce habitat so both are equally bad', 'endangered species decline is mainly due to direct killing (poaching)', 'habitat loss'],
                  hint: 'If stuck, revisit the "Causes of Depletion of Forest and Wildlife Resources" (c10_geo_cbse_02_003).',
                  misconception: 'Students often think "endangered species decline is mainly due to direct killing (poaching)" and overlook that *habitat fragmentation*.' },
                { id: 'b', prompt: 'A tiger reserve in Central India has a core area of 800 km² and a buffer of 1200 km². Recent camera-trap data shows 45 adult tigers.', answer: 'Step 1: Total nominal habitat = core + buffer = 2000 km²',
                  options: ['Step 1: Total nominal habitat = core + buffer = 2000 km²', 'endangered species decline is mainly due to direct killing (poaching)', 'habitat loss', 'fragmentation'],
                  hint: 'If stuck, revisit the "Causes of Depletion of Forest and Wildlife Resources" (c10_geo_cbse_02_003).',
                  misconception: 'Students often think "endangered species decline is mainly due to direct killing (poaching)" and overlook that *habitat fragmentation*.' }
          ],
            remediations: { 'endangered-species-decline-is-mainly': { steps: ['Have the student map the current distribution of one endangered species (e.g., Tiger, Elephant, GIB) on an outline map.', 'Overlay linear infrastructure (NH, SH, railway lines, canals, power lines) and land-use change (urban, agriculture).', 'Identify *specific locations* where barriers cut across known corridors or core habitats.', 'Calculate the number of habitat patches and their sizes using a simple grid overlay.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "endangered species decline is mainly due to direct killing (poaching)" and overlook that *habitat.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Poaching is the biggest threat to India\'s tigers today." Use evidence from the last three tiger estimation cycles (2014, 2018, 2022).', answer: 'The statement is *partially true but incomplete*',
                  options: ['The statement is *partially true but incomplete*', 'poaching is #1', 'habitat loss is #1', 'endangered species decline is mainly due to direct killing (poaching)'],
                  hint: 'If stuck, revisit the "Causes of Depletion of Forest and Wildlife Resources" (c10_geo_cbse_02_003).',
                  misconception: 'Students often think "endangered species decline is mainly due to direct killing (poaching)" and overlook that *habitat fragmentation*.' }
          ],
            remediations: { 'endangered-species-decline-is-mainly': { steps: ['Have the student map the current distribution of one endangered species (e.g., Tiger, Elephant, GIB) on an outline map.', 'Overlay linear infrastructure (NH, SH, railway lines, canals, power lines) and land-use change (urban, agriculture).', 'Identify *specific locations* where barriers cut across known corridors or core habitats.', 'Calculate the number of habitat patches and their sizes using a simple grid overlay.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_003', difficulty: 'standard',
          question: 'Project Tiger (1973) and Project Elephant (1992) are centrally sponsored.',
          hint: 'Revisit c11_geo_cbse_15_002 (Endangered Species: Causes of Decline) and.',
          misconception: 'Students often think Project Tiger and Project Elephant are separate, non-overlapping schemes operating in different.',
          parts: [
                { id: 'a', prompt: 'Using the 2022 All India Tiger Estimation figure of 3,682 tigers and the 2017 Synchronised Elephant Census figure of 27,312 elephants, calculate the.', answer: 'Calculation: 27,312 ÷ 3,682 ≈ 7.4 elephants per tiger',
                  options: ['Calculation: 27,312 ÷ 3,682 ≈ 7.4 elephants per tiger', 'elephants are more abundant so lower priority'],
                  hint: 'Revisit c11_geo_cbse_15_002 (Endangered Species: Causes of Decline) and c10_geo_cbse_02_005.',
                  misconception: 'Students often think Project Tiger and Project Elephant are separate, non-overlapping schemes operating in different states.' }
          ],
            remediations: { 'project-tiger-and-project-elephant': { steps: ['On an outline map of India, shade all tiger reserves (green) and elephant reserves (blue) — observe the purple overlap.', 'Take one overlapping landscape (e.g., Satpura-Melghat) and draw the core, buffer, and corridor layers.', 'List the management activities in each layer for both programmes — note where they converge (anti-poaching patrols.', 'Read a recent NTCA or Project Elephant annual report to see joint monitoring protocols.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_004', difficulty: 'standard',
          question: 'A Biosphere Reserve is a designated area of terrestrial and coastal/marine.',
          hint: 'If stuck, review Class 10 Geography Chapter 2 "Forest and Wildlife Resources".',
          misconception: 'Students frequently confuse **Biosphere Reserves** with **National Parks** in three ways: (1) They think "Biosphere.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Biosphere Reserve is a designated area of terrestrial and coastal/marine ecosystems',
                  options: ['A Biosphere Reserve is a designated area of terrestrial and coastal/marine ecosystems', 'Faunal diversity refers to the variety of animal species—including mammals, birds,', 'Endangered species in India are those wild fauna and flora populations that face a very', 'Project Tiger (1973) and Project Elephant (1992) are centrally sponsored species-specific'],
                  hint: 'If stuck, review Class 10 Geography Chapter 2 "Forest and Wildlife Resources" – specifically the.',
                  misconception: 'Students frequently confuse **Biosphere Reserves** with **National Parks** in three ways: (1) They think "Biosphere Reserve" is a higher.' }
          ],
            remediations: { 'students-frequently-confuse-biosphere-reserves': { steps: ['Designation confusion**: Create a two-column table: Column A = Legal Category under WLPA (National Park, Wildlife.', 'Column B = International Designations (UNESCO Biosphere Reserve, World Heritage Site, Ramsar Site).', 'Place "Biosphere Reserve" in Column B.', 'Note that a single area (e.g., Sundarbans) can be in both columns simultaneously.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_005', difficulty: 'standard',
          question: 'A National Park is a strictly protected area declared under Section 35 of the.',
          hint: 'If stuck, review Class 10 Geography Chapter 2 \'Forest and Wildlife Resources\'.',
          misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name*.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, you see a protected area in the Sundarbans delta marked as a National Park and another in the same region marked as a Wildlife.', answer: 'Step 1: Identify the conservation objective',
                  options: ['Step 1: Identify the conservation objective', 'the Sanctuary was created first', 'the National Park is for tourists'],
                  hint: 'If stuck, review Class 10 Geography Chapter 2 \'Forest and Wildlife Resources\', specifically the.',
                  misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or *size*, and that both.' }
          ],
            remediations: { 'the-only-difference-between-a': { steps: ['If the student holds this misconception: (1) Have them create a two-column comparison table using the exact Sections.', 'Bund Baretha* case study (both in Bharatpur, Rajasthan) to contrast real-world management: Keoladeo (National Park).', '(3) Assign a map exercise: On a map of Madhya Pradesh, identify Kanha National Park and Phen Wildlife Sanctuary.', 'This grounds the legal distinction in observable geography.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_006', difficulty: 'standard',
          question: 'In-situ conservation is the protection of ecosystems, natural habitats, and.',
          hint: 'Revisit c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries) for in-situ legal.',
          misconception: 'Students often think ex-situ conservation means "keeping animals in zoos for public display" and in-situ means "just.',
          parts: [
                { id: 'a', prompt: 'Define in-situ conservation and give two Indian examples from the protected area network.', answer: 'In-situ conservation is the on-site protection of genetic resources in natural',
                  options: ['In-situ conservation is the on-site protection of genetic resources in natural', 'keeping animals in zoos for public display', 'just declaring a national park'],
                  hint: 'Revisit c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries) for in-situ legal categories.',
                  misconception: 'Students often think ex-situ conservation means "keeping animals in zoos for public display" and in-situ means "just declaring a national.' },
                { id: 'b', prompt: 'A conservation biologist wants to save the Great Indian Bustard (Ardeotis nigriceps), now down to ~150 individuals in Rajasthan and Gujarat.', answer: 'Step 1: Assess population viability',
                  options: ['Step 1: Assess population viability', 'keeping animals in zoos for public display', 'just declaring a national park'],
                  hint: 'Revisit c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries) for in-situ legal categories.',
                  misconception: 'Students often think ex-situ conservation means "keeping animals in zoos for public display" and in-situ means "just declaring a national.' }
          ],
            remediations: { 'ex-situ-conservation-means-keeping': { steps: ['If the student conflates ex-situ with zoos only: Show the National Gene Bank (New Delhi) holding 400,000+ seed.', 'If they think in-situ is passive: Use the example of Kaziranga\'s annual flood management, anti-poaching camps, and.', 'If they see the two as separate: Map the pygmy hog conservation programme — Durrell\'s captive breeding (ex-situ) →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
