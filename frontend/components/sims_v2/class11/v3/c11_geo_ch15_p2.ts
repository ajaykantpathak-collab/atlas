import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch15_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch15_p2: SimDef = {
    id: 'v3_c11_geo_ch15_p2',
    title: 'Wildlife and Conservation · Part 2/2',
    subtitle: 'Separate \'found only here\' from \'about to vanish\' — they\'re different claims.',
    classLevel: 11, subject: 'geography', topic: 'Wildlife and Conservation · Part 2/2',
    chapters: ['c11_geo_ch15'],
    nodeIds: ['c11_geo_cbse_15_007', 'c11_geo_cbse_15_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a conservation biologist reading a fragmenting map', intro: 'A tiger dead on a railway line, a bustard downed by power cables — the map explains the deaths better than the poachers do.', goal: 'Distinguish endemism from endangerment and evaluate fragmentation as the dominant threat.' },
    discovery: {
        question: 'The lion-tailed macaque lives nowhere on Earth but the Western Ghats — so being endemic means it\'s endangered, right?',
        options: ['No — endemic means restricted to one place; it\'s only listed Vulnerable, and widespread species like the elephant can be more threatened', 'Yes — a small range guarantees a small, doomed population', 'Yes — endemism and endangerment are the same label', 'No — endemic species are always the safest'],
        answer: 'No — endemic means restricted to one place; it\'s only listed Vulnerable, and widespread species like the elephant can be more threatened',
        hook: 'Poaching grabs headlines, but the quieter killer is fragmentation — tigers rose to 3,682 by 2022 inside connected reserves while corridors keep bleeding.',
    },
    teaching: [
        { title: 'Threats to Wildlife: Poaching, Habitat Loss and Conservation Measures', text: 'Threats to wildlife encompass human-induced pressures such as poaching (illegal hunting, trapping, or trade of wild animals and their parts), habitat loss (destruction, fragmentation, or degradation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map India\'s biogeographic zones onto its endemics, then weigh poaching statistics against the habitat-fragmentation ceiling on tiger recovery.',
        labels: ['Threats to Wildlife: Poaching,', 'Wildlife Protection Act (1972)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_007', title: 'Threats to Wildlife: Poaching, Habitat Loss and Conservation Measures',
          caseStudy: { intro: 'Begin by observing a local example: a highway cutting through a forest reserve near your town, with roadkill incidents reported in newspapers.',
            decisions: [{ prompt: 'Define \'poaching\' in the context of Indian wildlife law and distinguish it from legal hunting (where permitted historically) and.', options: [
                { text: 'Poaching is the illegal hunting, capturing, or killing of wild animals protected under', outcome: 'Poaching is the illegal hunting, capturing, or killing of wild animals protected under the Wildlife.' },
                { text: 'poaching is driven solely by international demand (e', outcome: 'Not quite — Students often think poaching is driven solely by international demand (e.g., tiger bone, rhino.', reveals: 'poaching-is-driven-solely-by' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_15_008', title: 'Wildlife Protection Act (1972) and Conservation Success Stories',
          scaffold: { problem: 'A state government proposes to denotify 50 sq km of a Wildlife Sanctuary for a highway project.',
            steps: [
            { text: 'Identify the legal provision — Section 26A of WPA 1972 states no alteration of boundaries of a sanctuary except.' },
            { text: 'Recall the 2002 amendment — made NBWL recommendation mandatory for any de-notification or diversion of sanctuary/NP.' },
            { text: 'Apply to scenario — 50 sq km diversion requires: (a) State Board for Wildlife (SBWL) recommendation, (b) NBWL standing.' },
            { text: 'Analyse the hierarchy — SBWL advises state government; NBWL advises central government; both must concur.' },
            { text: 'Interpret geographically — This legal hurdle ensures ecological connectivity is assessed at national level, not just.', faded: true, blankAnswer: 'The diversion requires SBWL recommendation → NBWL standing.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your eco-club debates how to save the lion-tailed macaque. One member says: \'It\'s endemic to the Western Ghats, so it\'s automatically endangered — the answer is anti-poaching patrols, since killing is what drives species to extinction.\'',
            decisions: [{ prompt: 'What two corrections does the plan need?', options: [
                { text: 'Separate the terms first: endemic means restricted to a place (the macaque lives nowhere else), not automatically endangered — some endemics like the Andaman day gecko are abundant. Then fix the driver: for most Indian species, habitat fragmentation — roads, rail, power lines slicing habitat into isolated patches — is the pervasive threat, creating edge effects and extinction vortices, as with Great Indian Bustards hitting power lines.', outcome: 'The plan shifts from patrols to connectivity: protecting contiguous habitat corridors tackles the spatial problem that actually drives decline.' },
                { text: 'Endorse the plan — endemic means rare, rare means endangered, and poaching is the main killer.', outcome: 'Every link is broken: endemism describes range, not risk; the IUCN status is separate; and fragmentation, not direct killing, is the primary driver for most species.', reveals: 'endemic-equals-endangered-poaching-main' },
                { text: 'Refocus on widespread species instead — only common animals like the elephant need help since endemics are doomed anyway.', outcome: 'Widespread species can indeed be more threatened, but endemism itself isn\'t doom — small-range species can be stable where habitat stays intact.', reveals: 'endemics-are-doomed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_15_008', title: 'You made it',
          caseStudy: { intro: 'Isolation creates endemics; disconnection creates the endangered — one is a product of geography, the other of us.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_007', difficulty: 'standard',
          question: 'Threats to wildlife encompass human-induced pressures such as poaching (illegal.',
          hint: 'If stuck, review the \'Endangered Species in India: Causes of Decline\' node.',
          misconception: 'Students often think poaching is driven solely by international demand (e.g., tiger bone, rhino horn) and overlook the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Threats to wildlife encompass human-induced pressures such as poaching (illegal hunting,',
                  options: ['Threats to wildlife encompass human-induced pressures such as poaching (illegal hunting,', 'Faunal diversity refers to the variety of animal species—including mammals, birds,', 'Endangered species in India are those wild fauna and flora populations that face a very', 'Project Tiger (1973) and Project Elephant (1992) are centrally sponsored species-specific'],
                  hint: 'If stuck, review the \'Endangered Species in India: Causes of Decline\' node (c11_geo_cbse_15_002).',
                  misconception: 'Students often think poaching is driven solely by international demand (e.g., tiger bone, rhino horn) and overlook the significant role.' }
          ],
            remediations: { 'poaching-is-driven-solely-by': { steps: ['Revisit the \'Causes of Depletion\' node (c10_geo_cbse_02_003) and list all threat categories with Indian examples.', 'Use a map of a tiger reserve (e.g., Bandipur) to trace how a highway fragments the habitat and mark poaching incidents.', 'Create a table linking each threat (poaching type, habitat loss driver) to specific conservation measures (WPA.', 'Discuss with peers why a measure like \'captive breeding\' fails if the threat is habitat fragmentation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think poaching is driven solely by international demand (e.g., tiger bone, rhino horn) and overlook the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Ex-situ conservation (zoos, captive breeding, gene banks) is a sufficient substitute for in-situ conservation when habitat loss.', answer: 'Ex-situ conservation is a necessary but insufficient substitute',
                  options: ['Ex-situ conservation is a necessary but insufficient substitute', 'poaching is driven solely by international demand (e'],
                  hint: 'If stuck, review the \'Endangered Species in India: Causes of Decline\' node (c11_geo_cbse_15_002).',
                  misconception: 'Students often think poaching is driven solely by international demand (e.g., tiger bone, rhino horn) and overlook the significant role.' }
          ],
            remediations: { 'poaching-is-driven-solely-by': { steps: ['Revisit the \'Causes of Depletion\' node (c10_geo_cbse_02_003) and list all threat categories with Indian examples.', 'Use a map of a tiger reserve (e.g., Bandipur) to trace how a highway fragments the habitat and mark poaching incidents.', 'Create a table linking each threat (poaching type, habitat loss driver) to specific conservation measures (WPA.', 'Discuss with peers why a measure like \'captive breeding\' fails if the threat is habitat fragmentation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_008', difficulty: 'standard',
          question: 'The Wildlife Protection Act (1972) is an Indian parliamentary legislation that.',
          hint: 'Review node c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries: Distinction).',
          misconception: 'Students think \'Project Tiger\' and \'Wildlife Protection Act\' are the same thing, or that the Act only protects animals.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a',
                  options: ['The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a', 'Faunal diversity refers to the variety of animal species—including mammals, birds,', 'Endangered species in India are those wild fauna and flora populations that face a very', 'Project Tiger (1973) and Project Elephant (1992) are centrally sponsored species-specific'],
                  hint: 'Review node c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries: Distinction) and the.',
                  misconception: 'Students think \'Project Tiger\' and \'Wildlife Protection Act\' are the same thing, or that the Act only protects animals.' }
          ],
            remediations: { 'project-tiger-and-wildlife-protection': { steps: ['Make a two-column table: Column A = Legal Instrument (WPA 1972, 2006 Amendment, NTCA), Column B = Conservation Scheme.', 'Create a schedule chart with one animal and one plant example per schedule (I–VI).', 'Re-read Section 38V (Tiger Reserve notification) and Section 38U (NTCA functions) from the Act summary in textbook.', 'Practice writing a 150-word answer: "How does the Wildlife Protection Act provide the legal backbone for Project.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
