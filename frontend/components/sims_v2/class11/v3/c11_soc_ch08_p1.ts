import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch08_p1: SimDef = {
    id: 'v3_c11_soc_ch08_p1',
    title: 'Environment and Society · Part 1/2',
    subtitle: 'Follow the arrow that bends back on itself.',
    classLevel: 11, subject: 'sociology', topic: 'Environment and Society · Part 1/2',
    chapters: ['c11_soc_ch08'],
    nodeIds: ['c11_soc_cbse_08_001', 'c11_soc_cbse_08_002', 'c11_soc_cbse_08_003', 'c11_soc_cbse_08_004', 'c11_soc_cbse_08_005', 'c11_soc_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an environmental sociologist tracing a two-way street', intro: 'The \'untouched wilderness\' was often someone\'s farm or forest management once — society and ecology have been co-authoring all along.', goal: 'Model the society–environment relationship as dialectical, not one-directional.' },
    discovery: {
        question: 'Climate change is a purely natural phenomenon — human society isn\'t meaningfully implicated. Sound?',
        options: ['No — the relation is a feedback loop: society reshapes ecology, and the altered ecology then reshapes society', 'Yes — nature runs on its own', 'Yes — humans are too small to matter', 'No — because ecology stops where cities begin'],
        answer: 'No — the relation is a feedback loop: society reshapes ecology, and the altered ecology then reshapes society',
        hook: 'Even the \'pristine\' is manufactured — Delhi\'s Ridge and Corbett\'s meadows are products of past human intervention wearing a natural costume.',
    },
    teaching: [
        { title: 'Ecology: Definition and the Interconnected Web of Natural Systems', text: 'Ecology is the web of physical and biological systems and processes — including mountains, rivers, plains, oceans, flora, and fauna — of which humans are one element, shaped by the interaction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace one deforestation loop — society to soil erosion to forced migration back into society — then judge whether better tech alone can manage the environment.',
        labels: ['Ecology: Definition and', 'Two-Way Relationship Between Environment', 'Property Relations and Control', 'Social Stratification and Differential', 'Major Categories of Environmental', 'Social Inequality and Environmental'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_001', title: 'Ecology: Definition and the Interconnected Web of Natural Systems',
          caseStudy: { intro: 'Look at the chair you are sitting on right now. Trace it backward: the wood came from a tree, the tree grew in soil shaped by rainfall and geology, the logger.',
            decisions: [{ prompt: 'Define "ecology" as used in the sociological study of environment and society, and explain why humans are considered an element within.', options: [
                { text: 'Ecology is the web of physical and biological systems and processes', outcome: 'Ecology is the web of physical and biological systems and processes — mountains, rivers, plains.' },
                { text: 'the natural environment untouched by humans', outcome: 'Not quite — Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They.', reveals: 'students-treat-ecology-and-environment' },
                { text: 'ecology is the natural surroundings of human society', outcome: 'Not quite — Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They.', reveals: 'students-treat-ecology-and-environment' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_003', title: 'Property Relations and Control Over Natural Resources',
          caseStudy: { intro: 'Imagine you live in a village where the nearby forest was declared a "Reserved Forest" by the government in 1980, but your community has collected firewood.',
            decisions: [{ prompt: 'Define "property relations" in the context of natural resources and explain how it differs from the everyday meaning of "property.', options: [
                { text: 'Property relations are the socially constructed rules and power structures governing who', outcome: 'Property relations are the socially constructed rules and power structures governing who can.' },
                { text: 'property relations', outcome: 'Not quite — Students often think "property relations" simply means "who owns the land legally" (private vs.', reveals: 'property-relations-simply-means-who' },
                { text: 'who owns the land legally', outcome: 'Not quite — Students often think "property relations" simply means "who owns the land legally" (private vs.', reveals: 'property-relations-simply-means-who' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_004', title: 'Social Stratification and Differential Access to Environmental Resources',
          caseStudy: { intro: 'Imagine you are standing in a village in Kutch, Gujarat during a severe drought.',
            decisions: [{ prompt: 'Define "differential access to environmental resources" in the context of social stratification.', options: [
                { text: 'Differential access to environmental resources means that different social groups have', outcome: 'Differential access to environmental resources means that different social groups have.' },
                { text: 'some people have more resources than others', outcome: 'Not quite — Students often believe "differential access" simply means "some people have more money to buy.', reveals: 'differential-access-simply-means-some' },
                { text: 'differential access', outcome: 'Not quite — Students often believe "differential access" simply means "some people have more money to buy.', reveals: 'differential-access-simply-means-some' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_005', title: 'Major Categories of Environmental Problems: Resource Depletion, Pollution, Global Warming, GMOs, Disasters',
          caseStudy: { intro: 'Imagine you\'re reading news headlines: "Groundwater vanishing in Punjab," "Delhi\'s air quality turns hazardous," "Maharashtra farmers protest seed prices,".',
            decisions: [{ prompt: 'List the five major categories of environmental problems as identified in the NCERT textbook for Class 11 Sociology.', options: [
                { text: 'The five categories are: (A) Resource Depletion, (B) Pollution, (C) Global Warming, (D)', outcome: 'The five categories are: (A) Resource Depletion, (B) Pollution, (C) Global Warming, (D) Genetically.' },
                { text: 'deforestation', outcome: 'Not quite — Students often treat the five categories as separate, technical "science problems" — e.g., "global.', reveals: 'students-often-treat-the-five' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_006', title: 'Social Inequality and Environmental Vulnerability: Who Bears the Burden',
          caseStudy: { intro: 'Imagine you live in a Delhi slum settlement near the Yamuna floodplain.',
            decisions: [{ prompt: 'Define "environmental vulnerability" in sociological terms and explain how it differs from a purely physical or geographical understanding.', options: [
                { text: 'Environmental vulnerability in sociology refers to the socially structured susceptibility', outcome: 'Environmental vulnerability in sociology refers to the socially structured susceptibility.' },
                { text: 'living in a flood-prone area', outcome: 'Not quite — Students often believe environmental vulnerability is primarily about geographic location — "poor.', reveals: 'environmental-vulnerability-is-primarily-about' },
                { text: 'poor people live in risky areas', outcome: 'Not quite — Students often believe environmental vulnerability is primarily about geographic location — "poor.', reveals: 'environmental-vulnerability-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For an environment project, a student writes: \'Ecology is nature untouched by humans — society then impacts it. The relationship is two arrows: nature affects us, we affect nature.\'',
            decisions: [{ prompt: 'What does the ecology–society relationship actually look like?', options: [
                { text: 'Draw the dialectic: humans are an element INSIDE ecology, not visitors to a pristine outside — the Delhi Ridge and Corbett chaurs look \'natural\' but bear millennia of cultural shaping (agriculture, fire, domestication). And the arrows form a feedback loop: deforestation causes erosion (society→nature), which then forces new farming practice, migration and state policy (nature→society), which reshape the ecology again.', outcome: 'The project gains process: not two one-way arrows but a loop — each shaping of nature changes the conditions that shape society next.' },
                { text: 'Keep \'untouched nature\' — ecology is what\'s there before people arrive.', outcome: 'That erases co-constitution: the landscape itself records past human action — there\'s no clean \'before\' for society to impact.', reveals: 'ecology-is-pristine-nature' },
                { text: 'Keep the two separate arrows — each direction is real on its own.', outcome: 'Listing two arrows misses the dialectic: the arrows connect — society\'s mark on ecology returns as new constraints on society.', reveals: 'two-independent-arrows' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Humans aren\'t nature\'s visitors — we\'re inside the ecology we keep editing, and the edits answer back.',
            decisions: [{ prompt: 'What comes next? Environment and Society · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Environment and Society · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_001', difficulty: 'standard',
          question: 'Ecology is the web of physical and biological systems and processes — including.',
          hint: 'Revisit Class 7 History Chapter 5 (Sacred Geography) — specifically the concept.',
          misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine.',
          parts: [
                { id: 'a', prompt: 'Define "ecology" as used in the sociological study of environment and society, and explain why humans are considered an element within it rather than external.', answer: 'Ecology is the web of physical and biological systems and processes',
                  options: ['Ecology is the web of physical and biological systems and processes', 'the natural environment untouched by humans', 'ecology is the natural surroundings of human society'],
                  hint: 'Revisit Class 7 History Chapter 5 (Sacred Geography) — specifically the concept of tirthas and.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' },
                { id: 'b', prompt: 'The Delhi Ridge forest is dominated by *Prosopis juliflora* (vilayati kikar), introduced from South America by the British around 1915.', answer: 'Step 1: Identify the biophysical feature (lake, water body)',
                  options: ['Step 1: Identify the biophysical feature (lake, water body)', 'ecology is the natural surroundings of human society'],
                  hint: 'Revisit Class 7 History Chapter 5 (Sacred Geography) — specifically the concept of tirthas and.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' }
          ],
            remediations: { 'students-treat-ecology-and-environment': { steps: ['Ask the student to list five things in the room they are sitting in and trace each back to a biophysical source (wood →.', 'For each, ask: "At what point did this stop being \'ecology\' and become \'society\'?" — they will find no clear boundary.', 'Show the Delhi Ridge and Corbett examples again; ask: "If you saw these without being told their history, would you.', 'Have them rewrite the definition in their own words using the phrase "web of physical and biological systems and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Environmental management is a purely technical problem — if we had better science and technology, we could predict and control biophysical.', answer: 'The claim is false',
                  options: ['The claim is false', 'ecology is the natural surroundings of human society'],
                  hint: 'Revisit Class 7 History Chapter 5 (Sacred Geography) — specifically the concept of tirthas and.',
                  misconception: 'Students treat "ecology" and "environment" as synonyms for "nature untouched by humans." They imagine a pristine wilderness that society.' }
          ],
            remediations: { 'students-treat-ecology-and-environment': { steps: ['Ask the student to list five things in the room they are sitting in and trace each back to a biophysical source (wood →.', 'For each, ask: "At what point did this stop being \'ecology\' and become \'society\'?" — they will find no clear boundary.', 'Show the Delhi Ridge and Corbett examples again; ask: "If you saw these without being told their history, would you.', 'Have them rewrite the definition in their own words using the phrase "web of physical and biological systems and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_002', difficulty: 'standard',
          question: 'The two-way relationship between environment and society refers to the.',
          hint: 'Revisit the definition of ecology in node c11_soc_cbse_08_001 and the Activity 1 examples.',
          misconception: 'Students often think the two-way relationship means \'nature affects society AND society affects nature\' as two.',
          parts: [
                { id: 'a', prompt: 'The textbook states: \'What appears to be a natural feature of the environment — aridity or flood-proneness, for example, is often produced by human.', answer: 'Correct answer: Example – the frequent flooding of the Kosi River in Bihar',
                  options: ['Correct answer: Example – the frequent flooding of the Kosi River in Bihar', 'cites only \'deforestation causes floods\' without specifying the social driver (e'],
                  hint: 'Revisit the definition of ecology in node c11_soc_cbse_08_001 and the Activity 1 examples (Delhi.',
                  misconception: 'Students often think the two-way relationship means \'nature affects society AND society affects nature\' as two separate, independent.' }
          ],
            remediations: { 'the-two-way-relationship-means': { steps: ['If a student gives a static, one-way answer: (1) Draw a simple feedback loop diagram on paper: Ecological Condition →.', '(2) Walk through the Punjab groundwater case together, labelling each arrow with the specific social actor (state.', '(3) Ask the student to re-tell the Green Revolution story as a *cycle* starting from the alluvial soil, not as a list.', '(4) Assign a mini-task: pick any local environmental issue (e.g., city air pollution) and map the feedback loop in 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_003', difficulty: 'standard',
          question: 'Property relations refer to the socially constructed rules, norms, and power.',
          hint: 'Revisit the "Social organisation influences how different social groups relate to their.',
          misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).',
          parts: [
                { id: 'a', prompt: 'A state government leases a stretch of river to a private company for bottled water extraction.', answer: 'The property regime shifted from a common property/resource access regime (where',
                  options: ['The property regime shifted from a common property/resource access regime (where', 'privatization', 'property relations', 'who owns the land legally'],
                  hint: 'Revisit the "Social organisation influences how different social groups relate to their.',
                  misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).' },
                { id: 'b', prompt: 'Compare how a capitalist property regime and a socialist property regime would differently define "control over forests." Use the concepts of commodification.', answer: 'Under a capitalist property regime, forests are commodified',
                  options: ['Under a capitalist property regime, forests are commodified', 'government control', 'property relations', 'who owns the land legally'],
                  hint: 'Revisit the "Social organisation influences how different social groups relate to their.',
                  misconception: 'Students often think "property relations" simply means "who owns the land legally" (private vs. government).' }
          ],
            remediations: { 'property-relations-simply-means-who': { steps: ['If the student conflates property relations with legal ownership: (1) Give them the "bundle of rights" framework.', '(2) Apply it to a familiar resource — e.g., a village pond.', 'Who can sell the pond?" (3) Show how each right can be held by a different person/group.', '(4) Then introduce the NCERT text\'s point: "Private ownership of land and water sources will affect whether others can.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_004', difficulty: 'standard',
          question: 'Social stratification and differential access to environmental resources refers.',
          hint: 'Revisit c11_soc_cbse_08_003 — specifically the distinction between use rights and control.',
          misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast how a Forest Department geared to revenue maximization and a tribal artisan harvesting bamboo would view and use the same forest.', answer: 'The Forest Department views the forest as a revenue-generating asset',
                  options: ['The Forest Department views the forest as a revenue-generating asset', 'different uses', 'differential access', 'some people have more money to buy resources'],
                  hint: 'Revisit c11_soc_cbse_08_003 — specifically the distinction between use rights and control rights.',
                  misconception: 'Students often believe "differential access" simply means "some people have more money to buy resources." They miss that property relations.' }
          ],
            remediations: { 'differential-access-simply-means-some': { steps: ['If a student reduces differential access to purchasing power: (1) Ask them to explain why a landless laborer with cash.', '(2) Have them trace the Kutch example: rich farmers don\'t just "buy" water — they access subsidized electricity.', '(3) Assign the NCERT passage on "Property relations determine how and by whom natural resources can be used" and ask.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_005', difficulty: 'standard',
          question: 'Major categories of environmental problems refer to the five globally.',
          hint: 'Revisit the "Water in Kutch" example (c11_soc_cbse_08_004) and the Bhopal case study.',
          misconception: 'Students often treat the five categories as separate, technical "science problems" — e.g., "global warming = CO2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Major categories of environmental problems refer to the five globally recognized types of',
                  options: ['Major categories of environmental problems refer to the five globally recognized types of', 'Ecology is the web of physical and biological systems and processes', 'The two-way relationship between environment and society refers to the dialectical', 'Property relations refer to the socially constructed rules, norms, and power structures'],
                  hint: 'Revisit the "Water in Kutch" example (c11_soc_cbse_08_004) and the Bhopal case study.',
                  misconception: 'Students often treat the five categories as separate, technical "science problems" — e.g., "global warming = CO2 emissions" or "GMOs = gene.' }
          ],
            remediations: { 'students-often-treat-the-five': { steps: ['If a student cannot link a category to social structure, do this 3-step remediation: (1) Return to c11_soc_cbse_08_003.', '(2) For the specific category they\'re stuck on, ask: "Who decides how this resource is used?', 'What law or custom enables this?" (3) Have them draw a 3-column table: Biophysical Process | Social Decision | Unequal.', 'Fill it for their weak category using the textbook examples as templates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_08_006', difficulty: 'standard',
          question: 'Social inequality and environmental vulnerability refers to the sociological.',
          hint: 'Revisit c11_soc_cbse_08_004 (Social Stratification and Differential Access.',
          misconception: 'Students often believe environmental vulnerability is primarily about geographic location — "poor people live in risky.',
          parts: [
                { id: 'a', prompt: 'Compare the Bhopal gas tragedy and the Kutch water crisis as instances of environmental injustice.', answer: 'Similarities: (1) In both, powerful actors (Union Carbide + state government',
                  options: ['Similarities: (1) In both, powerful actors (Union Carbide + state government', 'poor people suffered', 'poor people live in risky areas'],
                  hint: 'Revisit c11_soc_cbse_08_004 (Social Stratification and Differential Access to Environmental.',
                  misconception: 'Students often believe environmental vulnerability is primarily about geographic location — "poor people live in risky areas because.' }
          ],
            remediations: { 'environmental-vulnerability-is-primarily-about': { steps: ['If a student holds this misconception, do this 3-step remediation: (1) Have them map a specific Indian city (e.g.', '(2) Give them the NCERT Kutch example and ask: "Did the poor *choose* to have shallow wells?', 'Or did the state\'s electricity subsidies and lack of groundwater regulation enable the rich to drill deeper first?" (3).', 'What social processes make it cheaper?" This forces them to move from spatial description to structural analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
