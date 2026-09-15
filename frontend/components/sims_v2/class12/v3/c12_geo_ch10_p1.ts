import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch10_p1: SimDef = {
    id: 'v3_c12_geo_ch10_p1',
    title: 'Human Settlements in India · Part 1/2',
    subtitle: 'Same village count, three shapes — the map of who gets water',
    classLevel: 12, subject: 'geography', topic: 'Human Settlements in India · Part 1/2',
    chapters: ['c12_geo_ch10'],
    nodeIds: ['c12_geo_cbse_10_001', 'c12_geo_cbse_10_002', 'c12_geo_cbse_10_003', 'c12_geo_cbse_10_004', 'c12_geo_cbse_10_005', 'c12_geo_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Settlement geographer', intro: 'Why does one village huddle and another scatter? The answer is written in terrain, water and caste.', goal: 'Classify rural settlement patterns and connect their forms to terrain, resources and social structure.' },
    discovery: {
        question: 'A village in the Ganga plain is one tight rectangle of homes; a Nagaland hillside holds scattered lone huts; a Thar cluster spreads thin around wells. Same country — three architectures. Why?',
        options: ['Form follows resource logic — fertile flat plains cluster for security and land efficiency; fragmented slopes and scarce water force dispersion', 'Random chance', 'Government design', 'Climate alone'],
        answer: 'Form follows resource logic — fertile flat plains cluster for security and land efficiency; fragmented slopes and scarce water force dispersion',
        hook: '\'Broken\' villages aren\'t all alike: semi-clustered means one village segregated by caste — dominant centre, marginal flanks; hamleted means a large village split into named units (panna, para, dhani). Same scattered look, different social machinery. And single-function towns can\'t stay single — metropolises always go multifunctional.',
    },
    teaching: [
        { title: 'Human Settlements in India: Definition and Classification', text: 'A human settlement is a cluster of dwellings of any type or size where human beings live, involving the grouping of people and the apportioning of territory as their economic support-base.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_10_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read settlement morphology like a field scientist: classify clustered, semi-clustered, hamleted and dispersed patterns, then trace how a mining town\'s fate proves why functions must multiply.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_001', title: 'Human Settlements in India: Definition and Classification',
          scaffold: { problem: 'A settlement in Maharashtra has 6,200 people, density 520 persons/km², and 80% of male main workers in non-agricultural jobs.',
            steps: [
            { text: 'Recall the three Census criteria: population ≥5,000; density ≥400 persons/km²; ≥75% male main workers.' },
            { text: 'Check population: 6,200 > 5,000 → criterion 1 satisfied.' },
            { text: 'Check density: 520 > 400 → criterion 2 satisfied.' },
            { text: 'Check workforce: 80% > 75% → criterion 3 satisfied.' },
            { text: 'All three met → settlement is urban (statutory or Census town depending on municipal status).', faded: true, blankAnswer: 'Urban settlement (meets all three Census 2011 criteria).' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_002', title: 'Rural Settlements in India: Types and Patterns',
          caseStudy: { intro: 'Look at a satellite view of your own village or a nearby village on Google Earth — notice whether houses are packed together in a tight cluster, strung out.',
            decisions: [{ prompt: 'Name the four types of rural settlement patterns identified in the NCERT Class 12 textbook for India, and give one characteristic region.', options: [
                { text: 'The four types are: (1) Clustered (nucleated)', outcome: 'The four types are: (1) Clustered (nucleated) — characteristic of fertile alluvial plains (northern.' },
                { text: 'linear, rectangular, radial', outcome: 'Not quite — Students often believe **"clustered settlements only occur in fertile plains"** because the.', reveals: 'clustered-settlements-only-occur-in' },
                { text: 'clustered settlements only occur in fertile plains', outcome: 'Not quite — Students often believe **"clustered settlements only occur in fertile plains"** because the.', reveals: 'clustered-settlements-only-occur-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_003', title: 'Rural Settlements: Factors Influencing Settlement Patterns',
          caseStudy: { intro: 'Look at a satellite image of your own district or a familiar region — notice how villages in the flat plains appear as tight clusters while those in hilly.',
            decisions: [{ prompt: 'Name the three broad categories of factors that influence rural settlement patterns in India as identified in the NCERT textbook.', options: [
                { text: 'The three categories are: (i) physical features', outcome: 'The three categories are: (i) physical features — nature of terrain, altitude, climate, and.' },
                { text: 'economic factors', outcome: 'Not quite — Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered.', reveals: 'each-settlement-type-has-a' },
                { text: 'government policy', outcome: 'Not quite — Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered.', reveals: 'each-settlement-type-has-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_004', title: 'Urban Settlements in India: Census Classification',
          caseStudy: { intro: 'Start by asking students to look at their own neighbourhood: does it have a municipal corporation?',
            decisions: [{ prompt: 'A settlement has a population of 6,200, density of 550 persons/km², but 80% of male main workers are engaged in agriculture.', options: [
                { text: 'No, it is not an urban settlement', outcome: 'No, it is not an urban settlement because it fails the occupational criterion (75% male main.' },
                { text: 'Census town', outcome: 'Not quite — Students believe "Census town" and "statutory town" are two types of urban settlements with.', reveals: 'census-town-and-statutory-town' },
                { text: 'statutory town', outcome: 'Not quite — Students believe "Census town" and "statutory town" are two types of urban settlements with.', reveals: 'census-town-and-statutory-town' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_005', title: 'Urbanisation in India: Trends, Causes and Consequences',
          scaffold: { problem: 'The urban population of Maharashtra was 50.8 million in 2011 (45.2% urbanisation level). If the state\'s total population grows at 1.5% p.a.',
            steps: [
            { text: 'Calculate 2011 total population = Urban Pop / Urbanisation Level = 50.8 / 0.452 = 112.39 million.' },
            { text: 'Project 2021 total population = 112.39 × (1.015)^10 = 112.39 × 1.1605 = 130.42 million.' },
            { text: 'Project 2021 urban population = 50.8 × (1.023)^10 = 50.8 × 1.2553 = 63.77 million.' },
            { text: '2021 urbanisation level = (63.77 / 130.42) × 100 = 48.9%.' },
            { text: 'Interpret: Urbanisation rises by 3.7 percentage points in a decade, consistent with national trend of ~1% point per.', faded: true, blankAnswer: 'Estimated urbanisation level in 2021 ≈ 48.9%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_10_006', title: 'Classification of Urban Settlements: Town, City, Metropolitan, Megacity',
          scaffold: { problem: 'Using Census 2011 data, classify the following urban agglomerations: (a) Shimla UA (pop. 1,69,578), (b) Bhopal UA (pop.',
            steps: [
            { text: 'Recall the four population thresholds: Town (≥5,000), City (≥1,00,000), Metropolitan (≥10,00,000), Megacity.' },
            { text: 'For each UA, compare its population to the thresholds.' },
            { text: '(a) Shimla: 1,69,578 → ≥1 lakh but <10 lakh → City (also a Municipal Corporation).' },
            { text: '(b) Bhopal: 19,17,051 → ≥10 lakh but <1 crore → Metropolitan city (Municipal Corporation + Metropolitan Planning.' },
            { text: '(c) Pune: 50,49,968 → ≥10 lakh but <1 crore → Metropolitan city.' },
            { text: '(d) Delhi: 1,63,49,831 → ≥1 crore → Megacity (multiple municipal corporations, NCT governance).' },
            { text: 'Verify each meets density and occupational criteria (they do, as established UAs).', faded: true, blankAnswer: '(a) City, (b) Metropolitan city, (c) Metropolitan city, (d).' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field survey in the lower Himalayan valleys, your team finds a revenue village made of five small hut-clusters 200–500 m apart across terraces, each with its own name. A teammate writes in the report: \'no real village here — just scattered isolated houses.\'',
            decisions: [{ prompt: 'How should the settlement actually be classified?', options: [
                { text: 'Hamleted — physically separate, separately named units that still share one village identity and administration; such units are locally called panna, para, palli, nagla, dhani or tola in different regions, so the fragmentation isn\'t absence of a settlement.', outcome: 'The chapter\'s distinction is precise: hamleted villages break into named sub-units but keep common revenue identity, while truly dispersed settlement lacks nucleation altogether — the teammate conflated the two.' },
                { text: 'Dispersed — five separated clusters on terraces fits \'scattered huts\' by definition.', outcome: 'Dispersed means isolated dwellings without shared nucleation — Kerala homesteads or Meghalaya jhum clearings; named clusters under one village administration is the signature of hamleted, not dispersed.', reveals: 'separation-equals-dispersal' },
                { text: 'Clustered — since people still group into huts rather than living alone, the core pattern is nucleation.', outcome: 'Clustered means one compact nucleus; five distinct named groups separated by cultivated terraces is precisely the in-between form the hamleted category exists to describe.', reveals: 'any-grouping-is-clustered' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a village\'s shape as a record of its land, water and social order — settlement form is geography made visible.',
            decisions: [{ prompt: 'What comes next? Human Settlements in India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Settlements in India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_001', difficulty: 'standard',
          question: 'A human settlement is a cluster of dwellings of any type or size where human.',
          hint: 'If stuck, revisit c11_geo_cbse_17_001 (rural/urban definition) and.',
          misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters.".',
          parts: [
                { id: 'a', prompt: 'A village in the Ganga plain has houses tightly packed in a rectangular pattern with distinct separation from surrounding farmland.', answer: 'This is a clustered (nucleated) settlement',
                  options: ['This is a clustered (nucleated) settlement', 'semi-clustered', 'hamleted', 'broken clusters'],
                  hint: 'If stuck, revisit c11_geo_cbse_17_001 (rural/urban definition) and c6_geography_ch01_003/004.',
                  misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters." In NCERT, semi-clustered.' },
                { id: 'b', prompt: 'Using the Census 2011 data in Table 2.1, calculate the decennial growth rate of urban population between 2001 and 2011. Show your working.', answer: 'Urban population 2001 = 2,85,355 thousand',
                  options: ['Urban population 2001 = 2,85,355 thousand', 'semi-clustered', 'hamleted', 'broken clusters'],
                  hint: 'If stuck, revisit c11_geo_cbse_17_001 (rural/urban definition) and c6_geography_ch01_003/004.',
                  misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters." In NCERT, semi-clustered.' },
                { id: 'c', prompt: 'Compare the factors leading to dispersed settlements in the north-eastern hills (e.g., Nagaland) with those in the Thar Desert of Rajasthan.', answer: 'In Nagaland (Fig',
                  options: ['In Nagaland (Fig', 'hilly terrain', 'low rainfall', 'semi-clustered'],
                  hint: 'If stuck, revisit c11_geo_cbse_17_001 (rural/urban definition) and c6_geography_ch01_003/004.',
                  misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters." In NCERT, semi-clustered.' }
          ],
            remediations: { 'students-often-confuse-semi-clustered': { steps: ['Re-read NCERT paragraphs on semi-clustered and hamleted settlements side-by-side.', 'On an outline map of India, mark Gujarat plain (semi-clustered) and middle Ganga plain (hamleted) with different.', 'Write one sentence for each: "Semi-clustered = segregation within village" vs. "Hamleted = segmentation of village."', 'Attempt Diagnostic Question 2 again, explicitly naming the social process.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters.".',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "A town performing only one function (e.g., only mining) can exist indefinitely in India." Use the concept of functional multiplicity.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'semi-clustered', 'hamleted', 'broken clusters'],
                  hint: 'If stuck, revisit c11_geo_cbse_17_001 (rural/urban definition) and c6_geography_ch01_003/004.',
                  misconception: 'Students often confuse "semi-clustered" with "hamleted" settlements, thinking both are just "broken clusters." In NCERT, semi-clustered.' }
          ],
            remediations: { 'students-often-confuse-semi-clustered': { steps: ['Re-read NCERT paragraphs on semi-clustered and hamleted settlements side-by-side.', 'On an outline map of India, mark Gujarat plain (semi-clustered) and middle Ganga plain (hamleted) with different.', 'Write one sentence for each: "Semi-clustered = segregation within village" vs. "Hamleted = segmentation of village."', 'Attempt Diagnostic Question 2 again, explicitly naming the social process.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_002', difficulty: 'standard',
          question: 'Rural settlements in India are clusters of dwellings where the majority of the.',
          hint: 'If stuck, revisit Class 11 **c11_geo_cbse_17_002** (Rural Settlements: Types and.',
          misconception: 'Students often believe **"clustered settlements only occur in fertile plains"** because the textbook first illustrates.',
          parts: [
                { id: 'a', prompt: 'Name the four types of rural settlement patterns identified in the NCERT Class 12 textbook for India, and give one characteristic region for each.', answer: 'The four types are: (1) Clustered (nucleated)',
                  options: ['The four types are: (1) Clustered (nucleated)', 'linear, rectangular, radial', 'clustered settlements only occur in fertile plains', 'linear, rectangular, radial" as the four types'],
                  hint: 'If stuck, revisit Class 11 **c11_geo_cbse_17_002** (Rural Settlements: Types and Patterns) and.',
                  misconception: 'Students often believe **"clustered settlements only occur in fertile plains"** because the textbook first illustrates them in the northern.' },
                { id: 'b', prompt: 'A village in the Gujarat plain shows a tight central cluster of large houses surrounded by smaller, loosely arranged huts on the outer edges.', answer: 'This represents a **semi-clustered (fragmented) settlement**',
                  options: ['This represents a **semi-clustered (fragmented) settlement**', 'clustered', 'dispersed', 'clustered settlements only occur in fertile plains'],
                  hint: 'If stuck, revisit Class 11 **c11_geo_cbse_17_002** (Rural Settlements: Types and Patterns) and.',
                  misconception: 'Students often believe **"clustered settlements only occur in fertile plains"** because the textbook first illustrates them in the northern.' }
          ],
            remediations: { 'clustered-settlements-only-occur-in': { steps: ['Re-read the NCERT paragraphs on clustered settlements in Rajasthan and Bundelkhand (water scarcity) vs.', 'northern plains (fertile alluvium).', 'On a physical map of India, mark **two clusters of dots**: one in Punjab-Haryana (label "water surplus → nucleation").', 'Write a 3-sentence explanation in your own words: "Same pattern, opposite causes." 4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_003', difficulty: 'standard',
          question: 'Rural settlement patterns in India are shaped by the interplay of physical.',
          hint: 'If unable to distinguish hamleted from semi-clustered, review c12_geo_cbse_10_002 worked.',
          misconception: 'Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered = fertile plains,".',
          parts: [
                { id: 'a', prompt: 'Name the three broad categories of factors that influence rural settlement patterns in India as identified in the NCERT textbook.', answer: 'The three categories are: (i) physical features',
                  options: ['The three categories are: (i) physical features', 'economic factors', 'government policy', 'clustered = fertile plains'],
                  hint: 'If unable to distinguish hamleted from semi-clustered, review c12_geo_cbse_10_002 worked examples.',
                  misconception: 'Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered = fertile plains," "dispersed = hills,".' },
                { id: 'b', prompt: 'A village in the Gujarat plain shows a distinct pattern: the land-owning dominant community occupies the central core, while lower-caste groups and menial.', answer: 'This is a **semi-clustered (fragmented) settlement**',
                  options: ['This is a **semi-clustered (fragmented) settlement**', 'A wrong answer identifying it as', 'misses the fragmentation', 'clustered = fertile plains'],
                  hint: 'If unable to distinguish hamleted from semi-clustered, review c12_geo_cbse_10_002 worked examples.',
                  misconception: 'Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered = fertile plains," "dispersed = hills,".' },
                { id: 'c', prompt: 'Compare the origin of hamleted settlements in the middle/lower Ganga plain with that of semi-clustered settlements in Gujarat.', answer: '**Hamleted settlements** (Ganga plain, Chhattisgarh, lower Himalayas) arise from',
                  options: ['**Hamleted settlements** (Ganga plain, Chhattisgarh, lower Himalayas) arise from', 'fragmentation into separate named units', 'internal segregation within one settlement', 'clustered = fertile plains'],
                  hint: 'If unable to distinguish hamleted from semi-clustered, review c12_geo_cbse_10_002 worked examples.',
                  misconception: 'Students often believe **each settlement type has a single, exclusive cause** — e.g., "clustered = fertile plains," "dispersed = hills,".' }
          ],
            remediations: { 'each-settlement-type-has-a': { steps: ['**Revisit c12_geo_cbse_10_002** (Rural Settlement Types) — draw a 2×2 table: rows = 4 settlement types, columns = 3.', 'Fill each cell with a specific Indian example from NCERT (e.g., clustered/Bundelkhand/security.', '**Re-diagnostic**: Take a topographical map extract (SOI 1:50,000) of a hilly region (e.g., Uttarakhand) and a plain.', 'Identify 3 settlements in each and write a 3-sentence explanation for each pattern using **at least two factor.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_004', difficulty: 'standard',
          question: 'Urban settlements in India are officially defined by the Census of India.',
          hint: 'If stuck on the three criteria, revisit c11_geo_cbse_17_003 and list the functional.',
          misconception: 'Students believe "Census town" and "statutory town" are two types of urban settlements with different criteria.',
          parts: [
                { id: 'a', prompt: 'A settlement has a population of 6,200, density of 550 persons/km², but 80% of male main workers are engaged in agriculture.', answer: 'No, it is not an urban settlement',
                  options: ['No, it is not an urban settlement', 'Census town', 'statutory town'],
                  hint: 'If stuck on the three criteria, revisit c11_geo_cbse_17_003 and list the functional differences.',
                  misconception: 'Students believe "Census town" and "statutory town" are two types of urban settlements with different criteria.' },
                { id: 'b', prompt: 'Why does the Census definition require 75% of *male main workers* specifically to be in non-agricultural work, rather than 75% of *total workers* or *total.', answer: 'The Census historically used male main workers',
                  options: ['The Census historically used male main workers', 'tradition', 'Census town', 'statutory town'],
                  hint: 'If stuck on the three criteria, revisit c11_geo_cbse_17_003 and list the functional differences.',
                  misconception: 'Students believe "Census town" and "statutory town" are two types of urban settlements with different criteria.' },
                { id: 'c', prompt: 'Town X has a municipal council (statutory status), population 4,800, density 380 persons/km², and 85% male main workers in non-agriculture.', answer: 'Town X: Statutory town (has municipal council)',
                  options: ['Town X: Statutory town (has municipal council)', 'neither', 'statutory', 'Census town'],
                  hint: 'If stuck on the three criteria, revisit c11_geo_cbse_17_003 and list the functional differences.',
                  misconception: 'Students believe "Census town" and "statutory town" are two types of urban settlements with different criteria.' }
          ],
            remediations: { 'census-town-and-statutory-town': { steps: ['Revisit c11_geo_cbse_17_003 (Urban Settlements: Classification by Size and Function) to recall the broad urban-rural.', 'Create a two-column table: left column "Statutory Town" — write "urban by government notification"; right column.', 'Practice with 5 settlements from your district: classify each using the table.', 'Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_005', difficulty: 'standard',
          question: 'Urbanisation in India refers to the process of increasing proportion of.',
          hint: 'If stuck, review the Census urban definition flowchart in node c12_geo_cbse_10_004 and.',
          misconception: 'Students often think "urbanisation" means only the growth of big metropolitan cities like Delhi or Mumbai.',
          parts: [
                { id: 'a', prompt: 'Using Table 2.1, calculate the average annual exponential growth rate (AEGR) of urban population for the decade 1991–2001.', answer: 'Step 1: Ratio = 285,355 / 217,611 = 1.3113',
                  options: ['Step 1: Ratio = 285,355 / 217,611 = 1.3113', 'urbanisation'],
                  hint: 'If stuck, review the Census urban definition flowchart in node c12_geo_cbse_10_004 and the.',
                  misconception: 'Students often think "urbanisation" means only the growth of big metropolitan cities like Delhi or Mumbai.' }
          ],
            remediations: { 'urbanisation-means-only-the-growth': { steps: ['Revisit node c12_geo_cbse_10_004 to relearn the Census definition distinguishing statutory vs census towns.', 'Open Census 2011 PCA (Primary Census Abstract) for your state — identify how many new census towns emerged in 2001–2011.', 'Plot a simple bar graph: statutory towns vs census towns growth rate.', 'Re-attempt Diagnostic Question 5 with this data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_10_006', difficulty: 'standard',
          question: 'Urban settlements in India are classified by population size into four.',
          hint: 'If stuck, review the Census 2011 urban definition in node c12_geo_cbse_10_004 and the.',
          misconception: 'Students often think any settlement with a municipality is a \'City\', and any large city is a \'Megacity\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urban settlements in India are classified by population size into four hierarchical',
                  options: ['Urban settlements in India are classified by population size into four hierarchical', 'A human settlement is a cluster of dwellings of any type or size where human beings live,', 'Rural settlements in India are clusters of dwellings where the majority of the population', 'Rural settlement patterns in India are shaped by the interplay of physical factors'],
                  hint: 'If stuck, review the Census 2011 urban definition in node c12_geo_cbse_10_004 and the Class 11.',
                  misconception: 'Students often think any settlement with a municipality is a \'City\', and any large city is a \'Megacity\'.' }
          ],
            remediations: { 'any-settlement-with-a-municipality': { steps: ['1) Revisit node c12_geo_cbse_10_004 (Census definition of urban settlements) to reinforce the three criteria.', '2) Create a table with four columns (Town, City, Metropolitan, Megacity) and rows for population threshold.', '3) Practice with 5 real settlements from Census 2011 data (e.g., Alappuzha, Kota, Surat, Kolkata) classifying each.', '4) Re-diagnostic: Use Diagnostic Question 3 again with new data.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
