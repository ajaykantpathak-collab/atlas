import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch17_p1: SimDef = {
    id: 'v3_c11_geo_ch17_p1',
    title: 'Human Settlements · Part 1/2',
    subtitle: 'Apply the real urban test — and read why villages take the shapes they do.',
    classLevel: 11, subject: 'geography', topic: 'Human Settlements · Part 1/2',
    chapters: ['c11_geo_ch17'],
    nodeIds: ['c11_geo_cbse_17_001', 'c11_geo_cbse_17_002', 'c11_geo_cbse_17_003', 'c11_geo_cbse_17_004', 'c11_geo_cbse_17_005', 'c11_geo_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a census classifier judging borderline settlements', intro: 'Big village or small town? The Census has a checklist, and headcount is only one line on it.', goal: 'Apply the Census of India\'s urban criteria and interpret rural settlement patterns.' },
    discovery: {
        question: 'A UP village holds 12,000 people and calls itself rural. Surely a settlement that big is urban?',
        options: ['No — Census needs all three tests: 5,000+ people, 75%+ male workers in non-farm jobs, and 400+/km² density — or a statutory town status', 'Yes — population size alone decides urban', 'Yes — anything over 10,000 is a town', 'No — only because it lacks a railway station'],
        answer: 'No — Census needs all three tests: 5,000+ people, 75%+ male workers in non-farm jobs, and 400+/km² density — or a statutory town status',
        hook: 'A statutory town of 4,800 counts as urban while a farming village of 12,000 stays rural — governance and occupation outrank headcount.',
    },
    teaching: [
        { title: 'Human Settlements: Definition and Classification (Rural vs Urban)', text: 'A human settlement is a cluster of dwellings where human beings live and interact, characterized by a distinct spatial pattern, social organization, and economic function.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_17_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run the three census tests on two settlements, then read village shapes — linear along a contour, circular around a fort or spring — as adaptive design.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_001', title: 'Human Settlements: Definition and Classification (Rural vs Urban)',
          caseStudy: { intro: 'Observe your own neighbourhood: some students live in a village with farms and a panchayat, others in a city with traffic signals and a municipal corporation.',
            decisions: [{ prompt: 'State the three defining attributes of a human settlement as per geographical definition.', options: [
                { text: 'The three attributes are: (1) a distinct spatial pattern of dwellings, (2) a social', outcome: 'The three attributes are: (1) a distinct spatial pattern of dwellings, (2) a social organization.' },
                { text: 'houses', outcome: 'Not quite — Students believe "urban = big population, rural = small population." They classify a large village.', reveals: 'urban-big-population' },
                { text: 'population', outcome: 'Not quite — Students believe "urban = big population, rural = small population." They classify a large village.', reveals: 'urban-big-population' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_002', title: 'Rural Settlements: Types and Patterns (Linear, Rectangular, Circular)',
          caseStudy: { intro: 'Imagine you are travelling by train from Delhi to Kolkata: in the Ganga plain you see villages strung out along the highway (linear), in the Malwa plateau you.',
            decisions: [{ prompt: 'Name the three main rural settlement patterns discussed in this chapter and give one physical factor that influences each.', options: [
                { text: 'The three main patterns are linear, rectangular, and circular', outcome: 'The three main patterns are linear, rectangular, and circular.' },
                { text: 'nucleated', outcome: 'Not quite — Students often believe that settlement pattern is determined *only* by physical geography (e.g.', reveals: 'settlement-pattern-is-determined-only' },
                { text: 'dispersed', outcome: 'Not quite — Students often believe that settlement pattern is determined *only* by physical geography (e.g.', reveals: 'settlement-pattern-is-determined-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_17_003', title: 'Urban Settlements: Classification by Size and Function',
          scaffold: { problem: 'Classify the following settlements using Census 2011 criteria: (a) Settlement X: Population 8,500, area 15 sq km, 65% male main workers.',
            steps: [
            { text: 'For each settlement, check statutory status first. Settlement Y is notified Municipal Council → Statutory Town (urban.' },
            { text: 'For non-statutory settlements (X, Z), apply Census town criteria: Population ≥5,000? X: 8,500 yes. Z: 45,000 yes.' },
            { text: 'Check density ≥400 persons/sq km. X: 8,500/15 = 567 → yes. Z: 45,000/10 = 4,500 → yes.' },
            { text: 'Check non-agricultural male main workers ≥75%. X: 65% → no. Z: 80% → yes.' },
            { text: 'Conclusion: X fails workforce criterion → Rural (unless statutory). Y → Statutory Town, urban.' },
            { text: 'Size classification for urban ones: Y (1,20,000) → Class I. Z (45,000) → Class III (20,000-49,999).', faded: true, blankAnswer: 'X = Rural (fails workforce criterion). Y = Statutory Town.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_17_004', title: 'Urbanisation in India: Trends, Causes and Problems',
          scaffold: { problem: 'Maharashtra\'s urban population grew from 41.1 million (2001) to 50.8 million (2011).',
            steps: [
            { text: 'Identify formula for urbanisation level: UL = (Urban Pop / Total Pop) × 100.' },
            { text: 'Calculate UL 2001 = (41.1 / 96.9) × 100 = 42.4%. UL 2011 = (50.8 / 112.4) × 100 = 45.2%.' },
            { text: 'Identify formula for annual exponential growth rate: r = (1/t) × ln(Pt/P0) × 100, with t=10.' },
            { text: 'Urban r = (1/10) × ln(50.8/41.1) × 100 = (0.1) × ln(1.236) × 100 = 0.1 × 0.212 × 100 = 2.12% per annum.' },
            { text: 'Total r = (1/10) × ln(112.4/96.9) × 100 = (0.1) × ln(1.160) × 100 = 0.1 × 0.148 × 100 = 1.48% per annum.' },
            { text: 'URGD = 2.12 - 1.48 = 0.64 percentage points. Interpretation: Urban population grows faster than total, so urbanisation.', faded: true, blankAnswer: '(a) UL 2001=42.4%, UL 2011=45.2%. (b) Urban r=2.12%, Total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_17_005', title: 'Metropolitan Cities and Million-Plus Cities in India',
          scaffold: { problem: 'Using 2011 Census data, calculate the Urban Primacy Index for West Bengal and interpret what it reveals about Kolkata\'s dominance.',
            steps: [
            { text: 'Identify the largest and second-largest urban agglomerations in West Bengal from Census 2011 data.' },
            { text: 'Recall the Urban Primacy Index formula: UPI = Population of Largest City / Population of Second Largest City.' },
            { text: 'Substitute values: UPI = 14.1 / 1.24 = 11.37.' },
            { text: 'Interpret: UPI > 2 indicates primate city pattern; UPI > 5 indicates extreme primacy.' },
            { text: 'Geographical reasoning: Kolkata\'s primacy stems from historical capital status (British India until 1911), port.' },
            { text: 'Contrast with Maharashtra (Mumbai UA: 18.4M, Pune UA: 5.0M, UPI = 3.7) - lower primacy due to dual growth poles.', faded: true, blankAnswer: 'Urban Primacy Index for West Bengal = 11.37, indicating.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_006', title: 'Problems of Urban Settlements: Slums, Congestion, Pollution',
          caseStudy: { intro: 'Begin by asking the student to recall their morning commute in any Indian metro — the sight of a dense settlement with blue tarpaulin roofs alongside.',
            decisions: [{ prompt: 'According to the Census of India 2011, what is the minimum population size and the key criterion used to define a "slum" in a statutory.', options: [
                { text: 'A slum is defined as a compact area of at least 300 population or about 60-70 households', outcome: 'A slum is defined as a compact area of at least 300 population or about 60-70 households of poorly.' },
                { text: 'any area with poor people', outcome: 'Not quite — Students often believe slums, congestion, and pollution are three *separate* problems that can.', reveals: 'slums' },
                { text: 'population 5000', outcome: 'Not quite — Students often believe slums, congestion, and pollution are three *separate* problems that can.', reveals: 'slums' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is categorising settlements from census data. A student flags Gahmar in UP — over 25,000 residents — as \'obviously urban, it\'s bigger than many towns.\' He also claims village shapes are decided purely by physical geography: \'linear means river, circular means lake.\'',
            decisions: [{ prompt: 'What rules actually classify settlements and shape village patterns?', options: [
                { text: 'Apply the full criteria: a census town needs population ≥5,000 AND ≥75% non-agricultural workers AND density ≥400/km², plus administrative status — Gahmar stays rural because most residents farm and it has a Gram Panchayat. And patterns aren\'t physical only: British revenue grids, defence needs, caste segregation and new highways reshape villages — many \'rectangular\' Ganga-plain villages went linear via ribbon development along a road.', outcome: 'Both instincts corrected: size alone doesn\'t make a town, and settlement patterns are adaptive responses where human agency can override the landscape.' },
                { text: 'Agree Gahmar is urban — any settlement with tens of thousands of people is a town.', outcome: 'Census definition is economic and administrative, not just numerical: 25,000 farmers under a panchayat remain a rural village.', reveals: 'big-village-is-urban' },
                { text: 'Accept the pattern rules — rivers make linear villages, lakes make circular ones, relief decides.', outcome: 'Physical setting proposes but society disposes: defence forts, land-revenue grids, caste hamlets and new transport corridors all reshape the geometry.', reveals: 'patterns-are-physical-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'Villages string along roads, huddle round water, or ring a fort — the pattern is an answer to the land and the society, never an accident.',
            decisions: [{ prompt: 'What comes next? Human Settlements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Settlements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_001', difficulty: 'standard',
          question: 'A human settlement is a cluster of dwellings where human beings live and.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of Indian Economy) for.',
          misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people.',
          parts: [
                { id: 'a', prompt: 'A village has a population of 6,500, 85% of male workers engaged in agriculture, and is governed by a Gram Panchayat.', answer: 'The village is rural',
                  options: ['The village is rural', 'urban = big population, rural = small population', '"urban = big population, rural = small population'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of Indian Economy) for.',
                  misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people in Uttar Pradesh.' },
                { id: 'b', prompt: 'Given the data below for two settlements, apply the Census of India 2011 urban criteria to classify each. Show your working.', answer: '**Settlement X**: Fails two criteria',
                  options: ['**Settlement X**: Fails two criteria', 'statutory town', 'urban = big population, rural = small population', '"urban = big population, rural = small population'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of Indian Economy) for.',
                  misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people in Uttar Pradesh.' }
          ],
            remediations: { 'urban-big-population': { steps: ['Give the student the Census 2011 definition card: "Urban = (Statutory Town) OR (Census Town: Pop≥5000 + NonAgri≥75%.', 'Have them classify 5 real settlements from their district using Census data (available on censusindia.gov.in).', 'Ask them to explain why a large village like Gahmar (UP) or Basti (Bihar) remains rural.', 'Use a Venn diagram: one circle "Statutory Town", another "Meets 3 Criteria" — overlap = Census Town; outside both.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A settlement with 10,000 people and 80% non-agricultural workers must be classified as urban." Is this always true in the Indian.', answer: '**Not always true**',
                  options: ['**Not always true**', 'always true', 'urban = big population, rural = small population', '"urban = big population, rural = small population'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of Indian Economy) for.',
                  misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people in Uttar Pradesh.' },
                { id: 'b', prompt: 'Design a decision flowchart (text-based) that a Census enumerator could use to classify any settlement in India as Rural, Statutory Town, or Census Town.', answer: '``` START → Does the settlement have a statutory urban local body (Municipal',
                  options: ['``` START → Does the settlement have a statutory urban local body (Municipal', 'urban = big population, rural = small population', '"urban = big population, rural = small population'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 2 (Sectors of Indian Economy) for.',
                  misconception: 'Students believe "urban = big population, rural = small population." They classify a large village (e.g., 12,000 people in Uttar Pradesh.' }
          ],
            remediations: { 'urban-big-population': { steps: ['Give the student the Census 2011 definition card: "Urban = (Statutory Town) OR (Census Town: Pop≥5000 + NonAgri≥75%.', 'Have them classify 5 real settlements from their district using Census data (available on censusindia.gov.in).', 'Ask them to explain why a large village like Gahmar (UP) or Basti (Bihar) remains rural.', 'Use a Venn diagram: one circle "Statutory Town", another "Meets 3 Criteria" — overlap = Census Town; outside both.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_002', difficulty: 'standard',
          question: 'Rural settlement patterns refer to the geometric arrangement of dwellings.',
          hint: 'Revisit Class 9 \'Physical Features of India\' (landforms) and Class 10 \'Agriculture\'.',
          misconception: 'Students often believe that settlement pattern is determined *only* by physical geography (e.g., "linear because.',
          parts: [
                { id: 'a', prompt: 'Name the three main rural settlement patterns discussed in this chapter and give one physical factor that influences each.', answer: 'The three main patterns are linear, rectangular, and circular',
                  options: ['The three main patterns are linear, rectangular, and circular', 'nucleated', 'dispersed', 'linear because of river'],
                  hint: 'Revisit Class 9 \'Physical Features of India\' (landforms) and Class 10 \'Agriculture\' (farming types.',
                  misconception: 'Students often believe that settlement pattern is determined *only* by physical geography (e.g., "linear because of river", "circular.' },
                { id: 'b', prompt: 'Given a 1:50,000 topographical map extract showing a village aligned along a contour line at 300 m with a river in the valley below, identify the settlement.', answer: 'Step 1: Observe the alignment of houses along the 300 m contour → linear pattern',
                  options: ['Step 1: Observe the alignment of houses along the 300 m contour → linear pattern', 'linear because of river', 'circular because of lake', 'settlement pattern is determined *only* by physical geography (e'],
                  hint: 'Revisit Class 9 \'Physical Features of India\' (landforms) and Class 10 \'Agriculture\' (farming types.',
                  misconception: 'Students often believe that settlement pattern is determined *only* by physical geography (e.g., "linear because of river", "circular.' },
                { id: 'c', prompt: 'Compare the rectangular settlement pattern of the Punjab-Haryana plain with the linear pattern of the Konkan coast.', answer: 'Physical factors: (1) Punjab-Haryana has vast, flat, featureless alluvial plains',
                  options: ['Physical factors: (1) Punjab-Haryana has vast, flat, featureless alluvial plains', 'linear because of river', 'circular because of lake', 'cites only "flat vs'],
                  hint: 'Revisit Class 9 \'Physical Features of India\' (landforms) and Class 10 \'Agriculture\' (farming types.',
                  misconception: 'Students often believe that settlement pattern is determined *only* by physical geography (e.g., "linear because of river", "circular.' }
          ],
            remediations: { 'settlement-pattern-is-determined-only': { steps: ['Open Google Earth and search for "village near Ludhiana, Punjab" (rectangular), "village near Ratnagiri, Maharashtra".', 'Overlay the contour layer and note the relationship between house alignment and topography.', 'Use the measurement tool to check street angles—rectangular villages show 90° intersections; linear villages show.', 'Read the village history on Wikipedia or a district gazetteer to identify the human factor (canal colony, fishing port.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_003', difficulty: 'standard',
          question: 'Urban settlements are concentrated human habitations with a minimum population.',
          hint: 'Review c11_geo_cbse_17_001 for rural-urban definition and c11_geo_cbse_17_002 for primary.',
          misconception: 'Students think "Class I city" means "metropolitan city" (million-plus).',
          parts: [
                { id: 'a', prompt: 'State the three Census of India criteria used to define a statutory town and a census town.', answer: 'Statutory town: notified under law by state government (municipal corporation,',
                  options: ['Statutory town: notified under law by state government (municipal corporation,', 'Class I city', 'metropolitan city', 'cantonment town'],
                  hint: 'Review c11_geo_cbse_17_001 for rural-urban definition and c11_geo_cbse_17_002 for primary activity.',
                  misconception: 'Students think "Class I city" means "metropolitan city" (million-plus).' },
                { id: 'b', prompt: 'A town has a population of 85,000. According to Census 2011 size classification, which class does it belong to?', answer: 'Class III (50,000-99,999)',
                  options: ['Class III (50,000-99,999)', 'Class I city', 'metropolitan city', 'cantonment town'],
                  hint: 'Review c11_geo_cbse_17_001 for rural-urban definition and c11_geo_cbse_17_002 for primary activity.',
                  misconception: 'Students think "Class I city" means "metropolitan city" (million-plus).' },
                { id: 'c', prompt: 'Given the workforce data for three towns: Town A - 60% in manufacturing, 20% services, 20% agriculture; Town B - 10% manufacturing, 70% government services.', answer: 'Town A: Industrial town (manufacturing dominant)',
                  options: ['Town A: Industrial town (manufacturing dominant)', 'Class I city', 'metropolitan city', 'cantonment town'],
                  hint: 'Review c11_geo_cbse_17_001 for rural-urban definition and c11_geo_cbse_17_002 for primary activity.',
                  misconception: 'Students think "Class I city" means "metropolitan city" (million-plus).' },
                { id: 'd', prompt: 'Compare the functional characteristics of a mining town (e.g., Jharia, Dhanbad) and a cantonment town (e.g., Ambala, Meerut).', answer: 'Mining town: located near mineral deposits, irregular layout following seams,',
                  options: ['Mining town: located near mineral deposits, irregular layout following seams,', 'Class I city', 'metropolitan city', 'cantonment town'],
                  hint: 'Review c11_geo_cbse_17_001 for rural-urban definition and c11_geo_cbse_17_002 for primary activity.',
                  misconception: 'Students think "Class I city" means "metropolitan city" (million-plus).' }
          ],
            remediations: { 'class-i-city-means-metropolitan': { steps: ['Create a two-column table: Left column = Census size classes (I-VI) with population ranges.', 'Right column = examples from your state (e.g., Class I: Lucknow, Kanpur; Class II: Sitapur; Class III: Shahjahanpur).', 'For functional classification, use the "dominant non-agricultural sector" rule: make a pie chart of workforce for 3.', 'Visit Census of India website → "Urban Agglomerations and Cities" data → filter by population size and verify class.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_004', difficulty: 'standard',
          question: 'Urbanisation in India is the process of increasing proportion of a country\'s.',
          hint: 'Revisit c11_geo_cbse_17_001 (statutory vs census town criteria) and Class 10 migration.',
          misconception: 'Students equate "urbanisation" with "metropolitanisation" — thinking India\'s urbanisation is only about Mumbai, Delhi.',
          parts: [
                { id: 'a', prompt: 'Define "urbanisation level" and state its value for India according to Census 2011.', answer: 'Urbanisation level = (Urban Population / Total Population) × 100',
                  options: ['Urbanisation level = (Urban Population / Total Population) × 100', 'urban growth rate', '31.1 million'],
                  hint: 'Revisit c11_geo_cbse_17_001 (statutory vs census town criteria) and Class 10 migration concepts.',
                  misconception: 'Students equate "urbanisation" with "metropolitanisation" — thinking India\'s urbanisation is only about Mumbai, Delhi, Kolkata growing.' },
                { id: 'b', prompt: 'Explain why the decade 1941-1951 showed a sharp decline in urban growth rate despite Partition-related migration.', answer: 'The 1941-51 decade saw negative urban growth (-0.37%)',
                  options: ['The 1941-51 decade saw negative urban growth (-0.37%)', 'Partition violence'],
                  hint: 'Revisit c11_geo_cbse_17_001 (statutory vs census town criteria) and Class 10 migration concepts.',
                  misconception: 'Students equate "urbanisation" with "metropolitanisation" — thinking India\'s urbanisation is only about Mumbai, Delhi, Kolkata growing.' },
                { id: 'c', prompt: 'Compare the push factors driving migration from Bihar\'s Kosi belt to Delhi with pull factors attracting migrants to Surat\'s textile sector.', answer: 'Kosi belt: Push = recurrent floods, landlessness, caste oppression',
                  options: ['Kosi belt: Push = recurrent floods, landlessness, caste oppression', 'poverty'],
                  hint: 'Revisit c11_geo_cbse_17_001 (statutory vs census town criteria) and Class 10 migration concepts.',
                  misconception: 'Students equate "urbanisation" with "metropolitanisation" — thinking India\'s urbanisation is only about Mumbai, Delhi, Kolkata growing.' }
          ],
            remediations: { 'students-equate-urbanisation-with-metropolitanis': { steps: ['Open Census 2011 PCA (Primary Census Abstract) for your state.', 'Filter towns by size class (Class I to VI).', 'Plot % urban population in each class — observe the "missing middle" (Class II-VI).', 'Cross-reference with AMRUT city list — note how many non-Class-I towns are excluded.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_005', difficulty: 'standard',
          question: 'A Metropolitan City in India is an urban agglomeration with a population of 1.',
          hint: 'Review Census 2011 definitions: "Urban Agglomeration" (continuous urban spread).',
          misconception: 'Students think "Metropolitan City" and "Municipal Corporation" are synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Metropolitan City in India is an urban agglomeration with a population of 1 million (10',
                  options: ['A Metropolitan City in India is an urban agglomeration with a population of 1 million (10', 'A human settlement is a cluster of dwellings where human beings live and interact,', 'Rural settlement patterns refer to the geometric arrangement of dwellings, streets, and', 'Urban settlements are concentrated human habitations with a minimum population of 5,000,'],
                  hint: 'Review Census 2011 definitions: "Urban Agglomeration" (continuous urban spread), "Outgrowth".',
                  misconception: 'Students think "Metropolitan City" and "Municipal Corporation" are synonyms.' }
          ],
            remediations: { 'metropolitan-city-and-municipal-corporation': { steps: ['Open Census 2011 PCA (Primary Census Abstract) for any metropolitan city (e.g., Hyderabad).', 'Compare "Municipal Corporation" population (6.7 million) vs "Urban Agglomeration" population (7.7 million) - note the 1.', 'On Google Earth, trace the continuous built-up area - observe it crosses municipal boundaries.', 'List the constituent units of the UA from Census data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_006', difficulty: 'standard',
          question: 'Problems of urban settlements refer to the adverse conditions arising from.',
          hint: 'If stuck, revisit the "Problems of Urbanisation" section in node 17_004 and the.',
          misconception: 'Students often believe slums, congestion, and pollution are three *separate* problems that can be solved independently.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Problems of urban settlements refer to the adverse conditions arising from rapid,',
                  options: ['Problems of urban settlements refer to the adverse conditions arising from rapid,', 'A human settlement is a cluster of dwellings where human beings live and interact,', 'Rural settlement patterns refer to the geometric arrangement of dwellings, streets, and', 'Urban settlements are concentrated human habitations with a minimum population of 5,000,'],
                  hint: 'If stuck, revisit the "Problems of Urbanisation" section in node 17_004 and the "Metropolitan.',
                  misconception: 'Students often believe slums, congestion, and pollution are three *separate* problems that can be solved independently (e.g., "relocate.' }
          ],
            remediations: { 'slums': { steps: ['Draw a system diagram on paper with three boxes (Slums, Congestion, Pollution) and arrows showing feedback loops (e.g.', 'Overlay this on a city map (Delhi/Mumbai) using different coloured pins for slum clusters, traffic bottlenecks, and AQI.', 'Identify at least two locations where all three overlap (e.g., Seelampur in Delhi, Dharavi in Mumbai).', 'Write a 100-word explanation of why a single-sector solution fails at these overlaps.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
