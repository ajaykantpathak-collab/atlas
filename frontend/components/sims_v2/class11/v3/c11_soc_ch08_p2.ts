import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch08_p2: SimDef = {
    id: 'v3_c11_soc_ch08_p2',
    title: 'Environment and Society · Part 2/2',
    subtitle: 'Follow the arrow that bends back on itself.',
    classLevel: 11, subject: 'sociology', topic: 'Environment and Society · Part 2/2',
    chapters: ['c11_soc_ch08'],
    nodeIds: ['c11_soc_cbse_08_007', 'c11_soc_cbse_08_008', 'c11_soc_cbse_08_009', 'c11_soc_cbse_08_010', 'c11_soc_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an environmental sociologist tracing a two-way street', intro: 'The \'untouched wilderness\' was often someone\'s farm or forest management once — society and ecology have been co-authoring all along.', goal: 'Model the society–environment relationship as dialectical, not one-directional.' },
    discovery: {
        question: 'Climate change is a purely natural phenomenon — human society isn\'t meaningfully implicated. Sound?',
        options: ['No — the relation is a feedback loop: society reshapes ecology, and the altered ecology then reshapes society', 'Yes — nature runs on its own', 'Yes — humans are too small to matter', 'No — because ecology stops where cities begin'],
        answer: 'No — the relation is a feedback loop: society reshapes ecology, and the altered ecology then reshapes society',
        hook: 'Even the \'pristine\' is manufactured — Delhi\'s Ridge and Corbett\'s meadows are products of past human intervention wearing a natural costume.',
    },
    teaching: [
        { title: 'Gender, Division of Labour and Environmental Resource Access', text: 'Gendered division of labour refers to the socially constructed allocation of tasks, responsibilities, and resource-use rights between men and women, which systematically shapes their differential.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace one deforestation loop — society to soil erosion to forced migration back into society — then judge whether better tech alone can manage the environment.',
        labels: ['Gender, Division of Labour', 'Sustainable Development: The Brundtland', 'Social Ecology (Bookchin): Social', 'Environmental Conflicts and Contested', 'Bhopal Gas Tragedy'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_007', title: 'Gender, Division of Labour and Environmental Resource Access',
          caseStudy: { intro: 'Imagine a 14-year-old girl in a Rajasthan village waking before dawn to walk 3 km to a handpump, waiting in a queue dominated by women, carrying 15 litres back.',
            decisions: [{ prompt: 'Define \'gendered division of labour\' in the specific context of environmental resource access, as discussed in the NCERT chapter.', options: [
                { text: 'Gendered division of labour in environmental resource access refers to the systematic', outcome: 'Gendered division of labour in environmental resource access refers to the systematic assignment.' },
                { text: 'men work outside, women work inside', outcome: 'Not quite — Students often conflate "gendered division of labour" with "biological differences" or "cultural.', reveals: 'students-often-conflate-gendered-division' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_008', title: 'Sustainable Development: The Brundtland Report and Its Core Principles',
          caseStudy: { intro: 'Imagine you are reading a news report about a new coal mine approved in a forested region of Chhattisgarh.',
            decisions: [{ prompt: 'State the exact definition of sustainable development as given in the Brundtland Report (1987).', options: [
                { text: 'Correct answer: "Sustainable development is development that meets the needs of the', outcome: 'Correct answer: "Sustainable development is development that meets the needs of the present without.' },
                { text: 'A wrong answer that omits', outcome: 'Not quite — Students often equate "sustainable development" with "environmental protection" or "green.', reveals: 'students-often-equate-sustainable-development' },
                { text: 'economic growth', outcome: 'Not quite — Students often equate "sustainable development" with "environmental protection" or "green.', reveals: 'students-often-equate-sustainable-development' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_009', title: 'Social Ecology (Bookchin): Social Roots of Environmental Crisis',
          caseStudy: { intro: 'Imagine you are standing in a village in Punjab where the groundwater has dropped 30 metres in 20 years.',
            decisions: [{ prompt: 'State Bookchin\'s central claim about the relationship between social problems and ecological problems in one precise sentence.', options: [
                { text: 'Bookchin argues that nearly all present ecological problems arise from deep-seated social', outcome: 'Bookchin argues that nearly all present ecological problems arise from deep-seated social problems.' },
                { text: 'ecological problems are caused by overpopulation', outcome: 'Not quite — Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat.', reveals: 'students-frequently-confuse-bookchin-s' },
                { text: 'technology destroys nature', outcome: 'Not quite — Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat.', reveals: 'students-frequently-confuse-bookchin-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_010', title: 'Environmental Conflicts and Contested Resources: Dams, Protected Areas and Displacement',
          caseStudy: { intro: 'Imagine your village is located in a forested valley where a company wants to build a dam to generate electricity for a distant city.',
            decisions: [{ prompt: 'Define "development-induced displacement" and distinguish it from "conservation-induced displacement" using one example each from the.', options: [
                { text: 'Development-induced displacement occurs when state-led infrastructure projects (e.g.,', outcome: 'Development-induced displacement occurs when state-led infrastructure projects (e.g., Sardar.' },
                { text: 'fortress conservation', outcome: 'Not quite — Students often think environmental conflicts are simply "environment vs.', reveals: 'environmental-conflicts-are-simply-environment' },
                { text: 'both are only for industrial projects', outcome: 'Not quite — Students often think environmental conflicts are simply "environment vs.', reveals: 'environmental-conflicts-are-simply-environment' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_011', title: 'Bhopal Gas Tragedy and the Risk Society: Industrial Hazards and Uncontrollable Technologies',
          caseStudy: { intro: 'Imagine you live near a chemical factory that produces pesticides for India\'s Green Revolution agriculture.',
            decisions: [{ prompt: 'What was the specific chemical released in the Bhopal Gas Tragedy, and approximately how many people died immediately?', options: [
                { text: 'Methyl isocyanate (MIC)', outcome: 'Methyl isocyanate (MIC); ~4,000 immediate deaths (official estimate), with 200,000+ permanently.' },
                { text: 'chlorine gas', outcome: 'Not quite — Students treat Bhopal as a "case of corporate crime" or "government failure" — discrete events.', reveals: 'students-treat-bhopal-as-a' },
                { text: '10,000 deaths', outcome: 'Not quite — Students treat Bhopal as a "case of corporate crime" or "government failure" — discrete events.', reveals: 'students-treat-bhopal-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For an environment project, a student writes: \'Ecology is nature untouched by humans — society then impacts it. The relationship is two arrows: nature affects us, we affect nature.\'',
            decisions: [{ prompt: 'What does the ecology–society relationship actually look like?', options: [
                { text: 'Draw the dialectic: humans are an element INSIDE ecology, not visitors to a pristine outside — the Delhi Ridge and Corbett chaurs look \'natural\' but bear millennia of cultural shaping (agriculture, fire, domestication). And the arrows form a feedback loop: deforestation causes erosion (society→nature), which then forces new farming practice, migration and state policy (nature→society), which reshape the ecology again.', outcome: 'The project gains process: not two one-way arrows but a loop — each shaping of nature changes the conditions that shape society next.' },
                { text: 'Keep \'untouched nature\' — ecology is what\'s there before people arrive.', outcome: 'That erases co-constitution: the landscape itself records past human action — there\'s no clean \'before\' for society to impact.', reveals: 'ecology-is-pristine-nature' },
                { text: 'Keep the two separate arrows — each direction is real on its own.', outcome: 'Listing two arrows misses the dialectic: the arrows connect — society\'s mark on ecology returns as new constraints on society.', reveals: 'two-independent-arrows' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'Humans aren\'t nature\'s visitors — we\'re inside the ecology we keep editing, and the edits answer back.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_007', difficulty: 'standard',
          question: 'Gendered division of labour refers to the socially constructed allocation.',
          hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c11_soc_cbse_08_003 (property.',
          misconception: 'Students often conflate "gendered division of labour" with "biological differences" or "cultural tradition," treating.',
          parts: [
                { id: 'a', prompt: 'The NCERT states: "In rural India, women are likely to experience resource scarcity more acutely because gathering fuel and fetching water are generally.', answer: 'Lack of control means women cannot decide where wells are dug',
                  options: ['Lack of control means women cannot decide where wells are dug', 'women work harder'],
                  hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c11_soc_cbse_08_003 (property.',
                  misconception: 'Students often conflate "gendered division of labour" with "biological differences" or "cultural tradition," treating it as a natural.' },
                { id: 'b', prompt: 'Compare the relationship to a *common forest* of: (a) a male landless labourer hired by the Forest Department for plantation work, and (b) a female landless.', answer: '(a) Male labourer: Holds a contractual, wage-based right',
                  options: ['(a) Male labourer: Holds a contractual, wage-based right', 'labourers'],
                  hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c11_soc_cbse_08_003 (property.',
                  misconception: 'Students often conflate "gendered division of labour" with "biological differences" or "cultural tradition," treating it as a natural.' }
          ],
            remediations: { 'students-often-conflate-gendered-division': { steps: ['If the student holds this misconception, conduct a 3-step "Labour Mapping" activity: (1) Have them list *all*.', '(2) Ask: "Which tasks are paid?', 'Which are recognized as \'work\'?', 'Who decides which tasks are whose?" (3) Show Census/ NSSO data on "main workers" vs "marginal workers" by gender.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate "gendered division of labour" with "biological differences" or "cultural tradition," treating.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Providing individual land titles to women (e.g., through joint pattas) automatically solves their environmental resource access.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'property-centric'],
                  hint: 'Revisit c10_civ_cbse_03_001 (sexual division of labour) and c11_soc_cbse_08_003 (property.',
                  misconception: 'Students often conflate "gendered division of labour" with "biological differences" or "cultural tradition," treating it as a natural.' }
          ],
            remediations: { 'students-often-conflate-gendered-division': { steps: ['If the student holds this misconception, conduct a 3-step "Labour Mapping" activity: (1) Have them list *all*.', '(2) Ask: "Which tasks are paid?', 'Which are recognized as \'work\'?', 'Who decides which tasks are whose?" (3) Show Census/ NSSO data on "main workers" vs "marginal workers" by gender.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_008', difficulty: 'standard',
          question: 'Sustainable development, as defined by the Brundtland Report (1987),.',
          hint: 'If stuck, revisit node c11_soc_cbse_08_006 (Social Inequality and Environmental.',
          misconception: 'Students often equate "sustainable development" with "environmental protection" or "green technology," treating it as.',
          parts: [
                { id: 'a', prompt: 'A state government plans to build a large dam on a river that flows through a tribal district.', answer: 'Step 1: Apply Concept 1 (Needs of the poor)',
                  options: ['Step 1: Apply Concept 1 (Needs of the poor)', 'only counts "number of people benefited vs'],
                  hint: 'If stuck, revisit node c11_soc_cbse_08_006 (Social Inequality and Environmental Vulnerability) and.',
                  misconception: 'Students often equate "sustainable development" with "environmental protection" or "green technology," treating it as a technical add-on.' },
                { id: 'b', prompt: 'Compare the Brundtland definition of sustainable development with the "economic growth" model critiqued by Sunita Narain in the textbook ("aspiration is the.', answer: 'the goal of development, (',
                  options: ['the goal of development, (', 'both want development but Brundtland is greener'],
                  hint: 'If stuck, revisit node c11_soc_cbse_08_006 (Social Inequality and Environmental Vulnerability) and.',
                  misconception: 'Students often equate "sustainable development" with "environmental protection" or "green technology," treating it as a technical add-on.' }
          ],
            remediations: { 'students-often-equate-sustainable-development': { steps: ['If a student conflates sustainability with environmentalism, do this 3-step remediation: (1) Have them re-read the.', '(b) A community-managed forest in Mendha-Lekha (Maharashtra) where tribals harvest bamboo sustainably for livelihood.', 'Ask: "Which meets Brundtland criteria?', 'Why?" (3) Force the distinction: "Sustainability is not a technology; it is a social contract between present and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_009', difficulty: 'standard',
          question: 'Social Ecology, as formulated by Murray Bookchin, is a theoretical framework.',
          hint: 'Revisit c11_soc_cbse_08_003 (Property Relations) and c11_soc_cbse_08_004 (Social.',
          misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it.',
          parts: [
                { id: 'a', prompt: 'The NCERT text quotes Bookchin: "economic, ethnic, cultural, and gender conflicts...', answer: 'Gender conflict creates ecological dislocation',
                  options: ['Gender conflict creates ecological dislocation', 'women are closer to nature', 'women care more about environment', 'environmentalism that cares about poor people'],
                  hint: 'Revisit c11_soc_cbse_08_003 (Property Relations) and c11_soc_cbse_08_004 (Social Stratification).',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' },
                { id: 'b', prompt: 'Apply Bookchin\'s framework to analyse the plastic pollution crisis in the Yamuna River.', answer: 'the property relation governing waste disposal, (',
                  options: ['the property relation governing waste disposal, (', 'littering behaviour', 'lack of dustbins', 'environmentalism that cares about poor people'],
                  hint: 'Revisit c11_soc_cbse_08_003 (Property Relations) and c11_soc_cbse_08_004 (Social Stratification).',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' },
                { id: 'c', prompt: 'Compare how the Forest Department (revenue-maximising) and a tribal basket-weaver (subsistence) view the *same* bamboo forest.', answer: 'The Forest Department\'s relation is mediated by state property and bureaucratic',
                  options: ['The Forest Department\'s relation is mediated by state property and bureaucratic', 'they have different values', 'one is greedy, one is traditional', 'environmentalism that cares about poor people'],
                  hint: 'Revisit c11_soc_cbse_08_003 (Property Relations) and c11_soc_cbse_08_004 (Social Stratification).',
                  misconception: 'Students frequently confuse Bookchin\'s Social Ecology with **Deep Ecology** (Arne Naess) or treat it as "environmentalism that cares about.' }
          ],
            remediations: { 'students-frequently-confuse-bookchin-s': { steps: ['If the student cannot distinguish constitutive vs.', 'conditional roles of inequality, do this 3-step remediation: (1) **Contrast two explanations** side-by-side for the.', '"Rich farmers\' deep tubewells *cause* the poor\'s wells to run dry because property law grants them unlimited extraction.', '(2) **Trace the causal arrow backwards**: Start from the ecological outcome (dry well) → immediate physical cause.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_010', difficulty: 'standard',
          question: 'Environmental conflicts over contested resources arise when different social.',
          hint: 'Revisit Node 003 (Property Relations) to clarify the difference between state ownership.',
          misconception: 'Students often think environmental conflicts are simply "environment vs. development" or "nature vs.',
          parts: [
                { id: 'a', prompt: 'A tribal village in a proposed tiger reserve area practices shifting cultivation (jhum) and collects minor forest produce.', answer: 'Step 1: Identify the two property regimes',
                  options: ['Step 1: Identify the two property regimes', 'who has the paper title', 'environmental conflicts are simply "environment vs'],
                  hint: 'Revisit Node 003 (Property Relations) to clarify the difference between state ownership, private.',
                  misconception: 'Students often think environmental conflicts are simply "environment vs. development" or "nature vs.' },
                { id: 'b', prompt: 'Compare the Narmada Bachao Andolan (NBA) and the Chipko Movement in terms of: (a) the resource contested, (b) the primary social base, (c) the nature of the.', answer: 'and the Chipko Movement in terms of: (',
                  options: ['and the Chipko Movement in terms of: (', 'environmental movements', 'environmental conflicts are simply "environment vs'],
                  hint: 'Revisit Node 003 (Property Relations) to clarify the difference between state ownership, private.',
                  misconception: 'Students often think environmental conflicts are simply "environment vs. development" or "nature vs.' }
          ],
            remediations: { 'environmental-conflicts-are-simply-environment': { steps: ['If a student frames the conflict as "environment vs.', 'development," do this: (1) Draw a 3-column table on board: **Stakeholder | Resource Claim | Power Resource**.', 'Fill for: State (eminent domain, police, law), Corporation (capital, technology, political access), Tribal Community.', '(2) Ask: "Which column has the most power resources?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_011', difficulty: 'standard',
          question: 'The Bhopal Gas Tragedy (1984) exemplifies Ulrich Beck\'s "risk society" thesis.',
          hint: 'Revisit c11_soc_cbse_08_006 (Social Inequality and Environmental Vulnerability).',
          misconception: 'Students treat Bhopal as a "case of corporate crime" or "government failure" — discrete events caused by bad actors.',
          parts: [
                { id: 'a', prompt: 'What was the specific chemical released in the Bhopal Gas Tragedy, and approximately how many people died immediately?', answer: 'Methyl isocyanate (MIC)',
                  options: ['Methyl isocyanate (MIC)', 'chlorine gas', '10,000 deaths'],
                  hint: 'Revisit c11_soc_cbse_08_006 (Social Inequality and Environmental Vulnerability) — specifically the.',
                  misconception: 'Students treat Bhopal as a "case of corporate crime" or "government failure" — discrete events caused by bad actors — rather than.' }
          ],
            remediations: { 'students-treat-bhopal-as-a': { steps: ['Remediation steps: (1) Have student re-read the textbook\'s "Environmental management is, however, a very difficult.', 'We live in risk societies using technologies and products that we do not fully grasp" passage — identify three phrases.', '(2) Map the Bhopal timeline on a whiteboard with three columns: Corporate Decisions, State Actions, Community.', 'Who benefited?" (3) Assign: Compare Bhopal with Chernobyl (nuclear) and 2008 financial crisis (financial risk) using.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
