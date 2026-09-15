import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch04_p1: SimDef = {
    id: 'v3_c12_geo_ch04_p1',
    title: 'Human Settlements · Part 1/2',
    subtitle: '10,000 people and still \'rural\' — the Census has three gates',
    classLevel: 12, subject: 'geography', topic: 'Human Settlements · Part 1/2',
    chapters: ['c12_geo_ch04'],
    nodeIds: ['c12_geo_cbse_04_001', 'c12_geo_cbse_04_002', 'c12_geo_cbse_04_003', 'c12_geo_cbse_04_004', 'c12_geo_cbse_04_005', 'c12_geo_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Settlement classifier', intro: 'Where does a village end and a town begin? India\'s Census answers with three simultaneous tests — and fails anyone who misses by one percent.', goal: 'Apply the Census of India\'s three criteria and distinguish statutory towns, census towns and rural settlements.' },
    discovery: {
        question: 'A settlement of 10,000 people at 500 persons/km² — but only 74% of male workers are in non-farm jobs. Urban or rural?',
        options: ['Rural — all three Census criteria must pass together, and 74% misses the 75% non-primary cut-off by a single point', 'Urban — it\'s big and dense', 'Urban — amenities decide', 'Depends on the state'],
        answer: 'Rural — all three Census criteria must pass together, and 74% misses the 75% non-primary cut-off by a single point',
        hook: 'Size is a decoy — the Census asks what people DO: ≥5,000 people, ≥400/km², ≥75% male workforce in non-primary work, all at once. And a notified Nagar Panchayat can be urban by law yet rural by Census — two lists, two truths, one settlement.',
    },
    teaching: [
        { title: 'Human Settlements: Definition and Classification', text: 'A human settlement is a cluster of dwellings where people live and interact, characterized by a permanent or semi-permanent physical infrastructure and a distinct socio-economic organization.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play Census officer: classify real settlements through the three-gate filter, untangle statutory towns from census towns, and ask why India alone insists on counting what workers do.',
        labels: ['Human Settlements: Definition', 'Types of Settlements: Rural', 'Rural Settlements: Types Based', 'Urban Settlements: Classification by'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_002', title: 'Types of Settlements: Rural vs Urban (Criteria and Distinction)',
          caseStudy: { intro: 'Begin by asking students to observe their own neighbourhood: is it governed by a Gram Panchayat or a Municipal Council?',
            decisions: [{ prompt: 'State the three quantitative criteria used by the Census of India 2011 to define a census town (statutory towns are defined differently).', options: [
                { text: 'The three criteria are: (1) minimum population of 5,000', outcome: 'The three criteria are: (1) minimum population of 5,000; (2) at least 75% of male main workers.' },
                { text: 'simply means', outcome: 'Not quite — Students believe "urban" simply means "large population" and classify any settlement above 5,000.', reveals: 'urban-simply-means-large-population' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_003', title: 'Rural Settlements: Types Based on Shape (Linear, Rectangular, Circular)',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to open Google Maps satellite view of their own village or a familiar rural area in India (e.g., a village.',
            decisions: [{ prompt: 'Name the three shape-based types of rural settlements and give one typical Indian location for each.', options: [
                { text: 'Correct answer: Linear (e.g., villages along the Jhelum river in Kashmir or NH-44 in', outcome: 'Correct answer: Linear (e.g., villages along the Jhelum river in Kashmir or NH-44 in Punjab).' },
                { text: 'nucleated, dispersed, linear', outcome: 'Not quite — Students often confuse **settlement pattern** (nucleated, dispersed, linear — which describes.', reveals: 'students-often-confuse-settlement-pattern' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_004', title: 'Rural Settlements: Types Based on Function and Pattern',
          caseStudy: { intro: 'Observe a satellite image of your own district: notice how villages in the alluvial plains (e.g., Ganga-Yamuna doab) appear as tight clusters near.',
            decisions: [{ prompt: 'Name the four settlement pattern types recognized in NCERT Class 12 Geography for rural India and give one characteristic feature of each.', options: [
                { text: 'The four types are: (1) Clustered/Nucleated', outcome: 'The four types are: (1) Clustered/Nucleated — houses grouped closely around a central feature.' },
                { text: 'circular, rectangular', outcome: 'Not quite — Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are.', reveals: 'students-equate-functional-type-with' },
                { text: 'circular, rectangular" as patterns', outcome: 'Not quite — Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are.', reveals: 'students-equate-functional-type-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_005', title: 'Urban Settlements: Classification by Size Class',
          caseStudy: { intro: 'Look at the skyline of your nearest city — count the high-rises, the crowded markets, the sprawling suburbs.',
            decisions: [{ prompt: 'What are the six population size classes used by the Census of India to classify urban settlements, and what is the population range for.', options: [
                { text: 'The six classes are: Class I (≥100,000), Class II (50,000–99,999), Class III', outcome: 'The six classes are: Class I (≥100,000), Class II (50,000–99,999), Class III (20,000–49,999), Class.' },
                { text: 'Class I = metropolitan city', outcome: 'Not quite — Students often think "Class I = metropolitan city" and "Class VI = village".', reveals: 'class-i-metropolitan-city-and' },
                { text: 'Class VI = village', outcome: 'Not quite — Students often think "Class I = metropolitan city" and "Class VI = village".', reveals: 'class-i-metropolitan-city-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_006', title: 'Urban Settlements: Classification by Function (Administrative, Industrial, Commercial)',
          caseStudy: { intro: 'Start by observing your nearest city — is it a state capital like Bhopal (administrative), a factory hub like Jamshedpur (industrial), or a trading center like.',
            decisions: [{ prompt: 'Which of the following cities is BEST classified as an administrative town based on its dominant function?', options: [
                { text: 'Correct: (b) Chandigarh', outcome: 'Correct: (b) Chandigarh. It is a planned capital city housing Punjab & Haryana governments, Union.' },
                { text: 'commercial', outcome: 'Not quite — Students think **every large city is "commercial" because it has markets**.', reveals: 'every-large-city-is-commercial' },
                { text: '**every large city is "commercial"', outcome: 'Not quite — Students think **every large city is "commercial" because it has markets**.', reveals: 'every-large-city-is-commercial' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Groundwater lets farmers grow water-hungry crops in dry regions — a lifeline that\'s emptying aquifers faster than rain refills them. Today\'s harvest borrows from tomorrow\'s water.',
            decisions: [{ prompt: 'Should the government restrict what farmers pump?', options: [
                { text: 'Yes — an empty aquifer helps nobody', outcome: 'The sustainability answer; restrictions without alternatives punish farmers who have no other water source.' },
                { text: 'No — farmers\' livelihoods aren\'t negotiable', outcome: 'The livelihood answer; but \'no restriction\' is also a decision — to let the resource end.' },
                { text: 'Restrict new borewells, support the shift to dry crops', outcome: 'The transition answer — honest that some farmers will farm differently or not at all; the support decides whether that\'s fair or cruel.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a district planning internship, a fast-growing settlement of 6,000 people with paved streets and dense housing is up for classification. Your supervisor calls it \'obviously urban now\' — but the data shows 80% of its male main workers still work in agriculture and it has no municipal notification.',
            decisions: [{ prompt: 'How does the Census of India classify it?', options: [
                { text: 'Rural — it passes the 5,000 population and 400/km² density tests but fails the strict third test: at least 75% of male main workers in non-agricultural work; all three criteria apply conjunctively, so urban looks don\'t make it urban.', outcome: 'The chapter\'s point is that the rural-urban line is multi-dimensional: morphological urbanism (concrete, crowding) with an agrarian workforce stays rural in Census terms until it clears every threshold.' },
                { text: 'Urban — 6,000 people and urban morphology settle it; workforce composition is a secondary detail.', outcome: 'That\'s the classic board-exam error: rounding \'mostly\' to urban while ignoring the exact 75% non-agricultural cut-off; a big farming village is still a village to the Census.', reveals: 'size-equals-urban' },
                { text: 'It\'s a census town, since any settlement crossing 5,000 qualifies statistically.', outcome: 'Census town status needs all three criteria — population, density, and the 75% non-agricultural workforce; crossing only the population bar is not enough.', reveals: 'five-thousand-means-census-town' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now classify any settlement by India\'s exact rules — and explain why the workforce test exists to keep dense farm villages honest.',
            decisions: [{ prompt: 'What comes next? Human Settlements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Settlements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_001', difficulty: 'standard',
          question: 'A human settlement is a cluster of dwellings where people live and interact.',
          hint: 'If stuck, re-read Class 11 NCERT "India: Physical Environment" Chapter 10 (Human.',
          misconception: '**Exact error:** "Any settlement with >5,000 people is urban." **Why it\'s wrong:** Students ignore the **density.',
          parts: [
                { id: 'a', prompt: 'Explain why a settlement with 10,000 population, 500 persons/km² density, and 74% male workforce in non-primary activities is **not** a census town, while.', answer: '**Answer:** Census town status requires **all three** thresholds to be met',
                  options: ['**Answer:** Census town status requires **all three** thresholds to be met', '≥75% non-primary', '≤25% primary'],
                  hint: 'If stuck, re-read Class 11 NCERT "India: Physical Environment" Chapter 10 (Human Settlements) Table.',
                  misconception: '**Exact error:** "Any settlement with >5,000 people is urban." **Why it\'s wrong:** Students ignore the **density (≥400/km²)** and.' }
          ],
            remediations: { 'exact-error-any-settlement-with': { steps: ['**Revisit Class 11 node c11_geo_cbse_17_001** (Human Settlements: Definition and Classification) — focus on the table.', '**Draw a 2×2 matrix**: Rows = Population (≥5,000 / <5,000), Columns = Workforce (% non-primary ≥75% / <75%).', 'Place 4 hypothetical settlements in cells.', 'Identify which cell = Census Town.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_002', difficulty: 'standard',
          question: 'A settlement is a human community with a defined spatial extent where people.',
          hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics.',
          misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the.',
          parts: [
                { id: 'a', prompt: 'State the three quantitative criteria used by the Census of India 2011 to define a census town (statutory towns are defined differently).', answer: 'The three criteria are: (1) minimum population of 5,000',
                  options: ['The three criteria are: (1) minimum population of 5,000', 'simply means'],
                  hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics, then list.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' },
                { id: 'b', prompt: 'A settlement has 6,200 people, density 450 persons/km², and 80% of male workers in manufacturing.', answer: 'It will be classified as a census town',
                  options: ['It will be classified as a census town', 'simply means'],
                  hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics, then list.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' }
          ],
            remediations: { 'urban-simply-means-large-population': { steps: ['Revisit c11_geo_cbse_17_001 (Class 11 rural/urban definition) and create a 3-column table: Criterion | Threshold | Why.', 'Take the Census 2011 Primary Census Abstract for your district (available on censusindia.gov.in) and classify 5.', 'Identify any census towns in your district and compare their workforce data with nearby statutory towns — note the.', 'Re-attempt Diagnostic Questions 3 and 4 with fresh data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The rural-urban dichotomy is outdated; India should adopt a rural-urban continuum model for policy-making." Use Census 2011 data.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'simply means'],
                  hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics, then list.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' },
                { id: 'b', prompt: 'Design a decision-flowchart that a district planner could use to classify any settlement in their district using Census 2011 criteria, including the statutory.', answer: 'A good flowchart starts: "Is the settlement notified as',
                  options: ['A good flowchart starts: "Is the settlement notified as', 'simply means'],
                  hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics, then list.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' }
          ],
            remediations: { 'urban-simply-means-large-population': { steps: ['Revisit c11_geo_cbse_17_001 (Class 11 rural/urban definition) and create a 3-column table: Criterion | Threshold | Why.', 'Take the Census 2011 Primary Census Abstract for your district (available on censusindia.gov.in) and classify 5.', 'Identify any census towns in your district and compare their workforce data with nearby statutory towns — note the.', 'Re-attempt Diagnostic Questions 3 and 4 with fresh data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_003', difficulty: 'standard',
          question: 'Rural settlements are classified by their geometric shape or layout pattern.',
          hint: 'If unclear on pattern vs shape, revisit c11_geo_cbse_17_002 and practice classifying 10.',
          misconception: 'Students often confuse **settlement pattern** (nucleated, dispersed, linear — which describes *spacing* of dwellings).',
          parts: [
                { id: 'a', prompt: 'On a 1:50,000 topographical sheet, you see a settlement symbol (red square) with houses aligned along a contour line at 1,200 m elevation, following a narrow.', answer: 'Correct answer: **Linear settlement** (ridge-line type)',
                  options: ['Correct answer: **Linear settlement** (ridge-line type)', 'circular', 'rectangular'],
                  hint: 'If unclear on pattern vs shape, revisit c11_geo_cbse_17_002 and practice classifying 10 Indian.',
                  misconception: 'Students often confuse **settlement pattern** (nucleated, dispersed, linear — which describes *spacing* of dwellings) with **settlement.' },
                { id: 'b', prompt: 'Compare the land-use efficiency and expansion potential of rectangular vs. circular rural settlements in the context of increasing population pressure.', answer: 'Correct answer: Rectangular settlements have higher land-use efficiency',
                  options: ['Correct answer: Rectangular settlements have higher land-use efficiency', 'more compact', 'both adapt equally'],
                  hint: 'If unclear on pattern vs shape, revisit c11_geo_cbse_17_002 and practice classifying 10 Indian.',
                  misconception: 'Students often confuse **settlement pattern** (nucleated, dispersed, linear — which describes *spacing* of dwellings) with **settlement.' }
          ],
            remediations: { 'students-often-confuse-settlement-pattern': { steps: ['Revisit **c11_geo_cbse_17_002** (Class 11 Rural Settlement Patterns) — specifically the distinction between *pattern*.', 'Practice on **Survey of India 1:50,000 toposheets**: identify 5 villages, trace their built-up area boundary, classify.', 'Re-diagnostic: Use Diagnostic Question 3 again with a new toposheet extract; if still incorrect, review contour.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_004', difficulty: 'standard',
          question: 'Rural settlements classified by function are categorized according to their.',
          hint: 'If confused between shape and pattern, revisit c12_geo_cbse_04_003 and draw: shape.',
          misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming.',
          parts: [
                { id: 'a', prompt: 'Name the four settlement pattern types recognized in NCERT Class 12 Geography for rural India and give one characteristic feature of each.', answer: 'The four types are: (1) Clustered/Nucleated',
                  options: ['The four types are: (1) Clustered/Nucleated', 'circular, rectangular', 'circular, rectangular" as patterns'],
                  hint: 'If confused between shape and pattern, revisit c12_geo_cbse_04_003 and draw: shape = outline.',
                  misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming villages are clustered.' },
                { id: 'b', prompt: 'A village in the Thar Desert has houses clustered around a stepwell (baoli) with narrow winding lanes.', answer: 'Functional type: **pastoral/agro-pastoral village**',
                  options: ['Functional type: **pastoral/agro-pastoral village**', 'dispersed because population is low'],
                  hint: 'If confused between shape and pattern, revisit c12_geo_cbse_04_003 and draw: shape = outline.',
                  misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming villages are clustered.' }
          ],
            remediations: { 'students-equate-functional-type-with': { steps: ['Revisit c12_geo_cbse_04_003 (shape types) and explicitly list: shape = geometric outline; pattern = spatial.', 'Use Survey of India 1:50,000 toposheets (c11_geo_cbse_24_006) — identify 3 villages of different patterns, trace their.', 'Create a 2×4 matrix: rows = function (farming, fishing, pastoral, mining); columns = pattern (clustered.', 'Fill with Indian examples from NCERT Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_005', difficulty: 'standard',
          question: 'Urban settlements in India are classified into six size classes based.',
          hint: 'If unsure about Census urban criteria, revisit c11_geo_cbse_17_001 (Human Settlements.',
          misconception: 'Students often think "Class I = metropolitan city" and "Class VI = village".',
          parts: [
                { id: 'a', prompt: 'What are the six population size classes used by the Census of India to classify urban settlements, and what is the population range for Class III towns?', answer: 'The six classes are: Class I (≥100,000), Class II (50,000–99,999), Class III',
                  options: ['The six classes are: Class I (≥100,000), Class II (50,000–99,999), Class III', 'Class I = metropolitan city', 'Class VI = village', 'India has 468 metropolitan cities'],
                  hint: 'If unsure about Census urban criteria, revisit c11_geo_cbse_17_001 (Human Settlements: Definition.',
                  misconception: 'Students often think "Class I = metropolitan city" and "Class VI = village".' },
                { id: 'b', prompt: 'A town has a population of 48,500 according to the 2011 Census. Which size class does it belong to?', answer: 'At 48,500 it is Class III (20,000–49,999)',
                  options: ['At 48,500 it is Class III (20,000–49,999)', 'Class I = metropolitan city', 'Class VI = village', 'India has 468 metropolitan cities'],
                  hint: 'If unsure about Census urban criteria, revisit c11_geo_cbse_17_001 (Human Settlements: Definition.',
                  misconception: 'Students often think "Class I = metropolitan city" and "Class VI = village".' },
                { id: 'c', prompt: 'Using the 2011 Census data below, calculate the percentage of India\'s total urban population living in Class I towns. Show your working.', answer: 'Step 1: Identify total urban population = 372.8 million',
                  options: ['Step 1: Identify total urban population = 372.8 million', 'Class I = metropolitan city', 'Class VI = village', 'India has 468 metropolitan cities'],
                  hint: 'If unsure about Census urban criteria, revisit c11_geo_cbse_17_001 (Human Settlements: Definition.',
                  misconception: 'Students often think "Class I = metropolitan city" and "Class VI = village".' }
          ],
            remediations: { 'class-i-metropolitan-city-and': { steps: ['Revisit c11_geo_cbse_17_003 (Urban Settlements: Classification by Size and Function) — focus on the table with.', 'Draw a ladder diagram with 6 rungs labelled Class I to VI, write the exact population range on each rung, and add.', 'Take your district\'s Census 2011 town list (available on censusindia.gov.in) and classify each town into its size class.', 'Re-attempt Diagnostic Question 2 and 3. If still stuck, watch the 10-min NCERT video "Urban Settlement Hierarchy".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_006', difficulty: 'standard',
          question: 'Urban settlements classified by function are cities or towns whose dominant.',
          hint: 'If stuck on classification, revisit Class 11 Census data interpretation.',
          misconception: 'Students think **every large city is "commercial" because it has markets**.',
          parts: [
                { id: 'a', prompt: 'Which of the following cities is BEST classified as an administrative town based on its dominant function?', answer: 'Correct: (b) Chandigarh',
                  options: ['Correct: (b) Chandigarh', 'commercial', '**every large city is "commercial"'],
                  hint: 'If stuck on classification, revisit Class 11 Census data interpretation (c11_geo_cbse_16_005) and.',
                  misconception: 'Students think **every large city is "commercial" because it has markets**.' },
                { id: 'b', prompt: 'Using the 2011 Census data below, classify the town\'s dominant function. Show your reasoning.', answer: 'Correct: Industrial town',
                  options: ['Correct: Industrial town', 'largest sector', 'largest absolute number', 'commercial'],
                  hint: 'If stuck on classification, revisit Class 11 Census data interpretation (c11_geo_cbse_16_005) and.',
                  misconception: 'Students think **every large city is "commercial" because it has markets**.' },
                { id: 'c', prompt: 'Compare the locational factors that led to the emergence of Jamshedpur (industrial) and Mumbai (commercial).', answer: 'Correct: Jamshedpur: located near iron ore (Noamundi), coal (Jharia), water',
                  options: ['Correct: Jamshedpur: located near iron ore (Noamundi), coal (Jharia), water', 'commercial', '**every large city is "commercial"'],
                  hint: 'If stuck on classification, revisit Class 11 Census data interpretation (c11_geo_cbse_16_005) and.',
                  misconception: 'Students think **every large city is "commercial" because it has markets**.' }
          ],
            remediations: { 'every-large-city-is-commercial': { steps: ['Remediation: (1) Revisit **c12_geo_cbse_04_005** (size classification) to separate size from function.', '(2) Open Census 2011 "Primary Census Abstract" for any 5 cities — calculate secondary vs tertiary worker percentages.', '(3) Plot them on a ternary diagram (primary/secondary/tertiary axes) — see clustering.', '(4) Re-attempt Diagnostic Q3 with new data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
