import type { SimDef } from '../../engine/types';
import C12_GeographyHumanSettlementsSim from '../../../simulations/c6_12/C12_GeographyHumanSettlementsSim';

/** v3 wrapped master — C12_GeographyHumanSettlementsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographyhumansettlementssim: SimDef = {
    id: 'v3w_c12_geographyhumansettlementssim',
    title: 'Human Geography vs Physical Geography: Interrelation',
    subtitle: 'This node covers the conceptual interrelation, historical dualism, and the holistic.',
    classLevel: 12, subject: 'geography', topic: 'Human Geography vs Physical Geography: Interrelation',
    chapters: [],
    nodeIds: ['c12_geo_cbse_01_003', 'c12_geo_cbse_04_001', 'c12_geo_cbse_04_002', 'c12_geo_cbse_04_004', 'c12_geo_cbse_04_009', 'c12_geo_cbse_04_010', 'c12_geo_cbse_10_001', 'c12_geo_cbse_04_003', 'c12_geo_cbse_04_005', 'c12_geo_cbse_04_006', 'c12_geo_cbse_04_007', 'c12_geo_cbse_04_008', 'c12_geo_cbse_01_001', 'c12_geo_cbse_01_002', 'c12_geo_cbse_01_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin by observing your immediate surroundings: note the natural features (trees, slope, soil, temperature).', goal: 'Master Human Geography vs Physical Geography: Interrelation.' },
    discovery: {
        question: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.',
        options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature'],
        answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
        hook: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
    },
    teaching: [
        { title: 'Human geography and physical geography are.', text: 'Human geography and physical geography are inseparable components of geography that study the reciprocal relationship between human societies and the natural environment; physical geography examines.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_01_003', title: 'Human geography and physical geography.',
          scaffold: { problem: 'A student reads that "the Himalayas act as a climatic barrier." Explain the two-way interaction: (a) How does this physical feature shape.',
            steps: [
            { text: 'Identify the physical process — Himalayas block southwest monsoon winds, forcing orographic rainfall on southern.' },
            { text: 'Trace human geography shaped by this — dense agriculture and population in Ganga plains (water, soil), tea plantations.' },
            { text: 'Identify human modifications — deforestation for agriculture/urbanization, road construction, dam building, tourism.' },
            { text: 'Analyze feedback on physical geography — deforestation increases erosion and landslides (geomorphology), reduces.' },
            { text: 'Synthesize — the Himalayas are not a static barrier; they are a dynamic system co-produced by tectonics, climate, and.', faded: true, blankAnswer: '(a) Himalayas → monsoon barrier → rainfall gradient →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_001', title: 'A human settlement is a cluster of.',
          scaffold: { problem: 'Settlement X has population 8,500, area 12 km², and 6,200 male main workers of which 1,550 are in agriculture.',
            steps: [
            { text: 'Calculate density = Population / Area = 8,500 / 12 = 708.3 persons/km². Check: ≥400? **Yes**.' },
            { text: 'Check population threshold: 8,500 ≥ 5,000? **Yes**.' },
            { text: 'Calculate non-primary male workers = Total male main workers - Agricultural workers = 6,200 - 1,550 = 4,650.' },
            { text: 'Calculate % non-primary = (4,650 / 6,200) × 100 = 75%. Check: ≥75%? **Yes** (exactly at threshold).' },
            { text: 'All three criteria met → **Census Town** (provided it is not already a statutory town).', faded: true, blankAnswer: 'Census Town.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_002', title: 'A settlement is a human community with.',
          scaffold: { problem: 'A settlement in Tamil Nadu has the following 2011 Census data: Total population 7,200; Area 12.5 km²; Male main workers = 1,800, of which.',
            steps: [
            { text: 'Check population criterion — 7,200 ≥ 5,000 → PASS.' },
            { text: 'Calculate density — Population/Area = 7,200/12.5 = 576 persons/km² ≥ 400 → PASS.' },
            { text: 'Calculate non-agricultural workforce percentage — Non-agri male main workers / Total male main workers × 100 =.' },
            { text: 'All three criteria satisfied → Classify as Census Town (provided it is not already a statutory town).' },
            { text: 'Verify — if the state had notified it as a Town Panchayat, it would be a Statutory Town instead; Census classification.', faded: true, blankAnswer: 'Census Town (meets all three criteria: population 7,200,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_004', title: 'Rural settlements classified by.',
          scaffold: { problem: 'A village in the Narmada valley (Madhya Pradesh) has 80% workforce in agriculture (wheat-soybean rotation), 15% in sandstone quarrying, 5%.',
            steps: [
            { text: 'Identify dominant economic activity — agriculture (wheat-soybean) employs 80% workforce → functional type = **farming.' },
            { text: 'Observe spatial arrangement — houses in tight cluster around a central water body (temple-tank) → pattern =.' },
            { text: 'Analyse physical setting — Narmada valley has fertile alluvium but seasonal water scarcity; black cotton soil cracks in.' },
            { text: 'Link tank to pattern — temple-tank provides perennial water for drinking, irrigation recharge, and ritual use;.' },
            { text: 'Verify with secondary activity — quarrying (15%) is non-agricultural but does not alter primary function; workers live.', faded: true, blankAnswer: 'Functional type: Farming village (intensive irrigated)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_009', title: 'Problems of rural settlements refer to.',
          scaffold: { problem: 'A Gram Panchayat in the Shiwalik foothills (Himachal Pradesh) has 12 scattered hamlets (total pop. 3,500) on steep slopes (25-35°).',
            steps: [
            { text: 'Identify geographical constraints — steep slopes mean high head for gravity flow but high erosion/landslide risk;.' },
            { text: 'Apply JJM guidelines — 55 lpcd service level, source sustainability mandatory, community management (VWSC).' },
            { text: 'Select source — choose a spring with >2 lps lean season discharge at 1,800 m elevation (highest hamlet at 1,650 m).' },
            { text: 'Locate storage tank — at 1,750 m (between source and highest hamlet) to provide 10-15 m head for distribution.' },
            { text: 'Route pipelines — follow contour lines (not straight down slope) to minimize pressure surges and erosion; use HDPE.' },
            { text: 'Risk & mitigation — Major risk: monsoon landslides sever pipelines.', faded: true, blankAnswer: '(a) Perennial spring >2 lps lean flow, elevation > highest.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_04_010', title: 'Sustainable settlement planning is a.',
          scaffold: { problem: 'The Municipal Corporation of City X (population 1.5 million) plans a Smart City proposal for Area-Based Development (ABD) in a 500-acre.',
            steps: [
            { text: 'Identify the proposal\'s key parameters — land use mix, density (implied by 60% residential on 300 acres ≈ 150 du/acre.' },
            { text: 'Assess Environmental pillar — Positive: 50% water recycling, 25% solar, TOD reduces VKT.' },
            { text: 'Assess Social pillar — Positive: Mixed-income housing suggests inclusion.' },
            { text: 'Assess Economic pillar — Positive: Commercial component generates revenue.' },
            { text: 'Synthesise and propose improvements — Improvement 1: Mandate in-situ slum rehabilitation with tenure security and.', faded: true, blankAnswer: 'The proposal scores moderate on environment.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_04_001', title: 'Identify each idea',
          dissect: { specimen: 'Human Geography vs Physical Geography: Interrelation', spots: [
            { id: 's1', label: 'Human geography and physical geography', prompt: 'Which idea is this? — Human geography and physical geography are inseparable components of geography that study.', answer: 'Human geography and physical geography', options: ['Human geography and physical geography', 'A human settlement is a', 'A settlement is a human', 'Rural settlements classified by function'] },
            { id: 's2', label: 'A human settlement is a', prompt: 'Which idea is this? — A human settlement is a cluster of dwellings where people live and interact,.', answer: 'A human settlement is a', options: ['A human settlement is a', 'Human geography and physical geography', 'A settlement is a human', 'Rural settlements classified by function'] },
            { id: 's3', label: 'A settlement is a human', prompt: 'Which idea is this? — A settlement is a human community with a defined spatial extent where people live, work,.', answer: 'A settlement is a human', options: ['A settlement is a human', 'Human geography and physical geography', 'A human settlement is a', 'Rural settlements classified by function'] },
            { id: 's4', label: 'Rural settlements classified by function', prompt: 'Which idea is this? — Rural settlements classified by function are categorized according to their dominant.', answer: 'Rural settlements classified by function', options: ['Rural settlements classified by function', 'Human geography and physical geography', 'A human settlement is a', 'A settlement is a human'] },
            { id: 's5', label: 'Problems of rural settlements refer', prompt: 'Which idea is this? — Problems of rural settlements refer to the persistent deficits in physical infrastructure.', answer: 'Problems of rural settlements refer', options: ['Problems of rural settlements refer', 'Human geography and physical geography', 'A human settlement is a', 'A settlement is a human'] },
            { id: 's6', label: 'Sustainable settlement planning is a', prompt: 'Which idea is this? — Sustainable settlement planning is a holistic approach to designing and managing human.', answer: 'Sustainable settlement planning is a', options: ['Sustainable settlement planning is a', 'Human geography and physical geography', 'A human settlement is a', 'A settlement is a human'] }
          ] } }
    ],
    explore: { component: C12_GeographyHumanSettlementsSim, prompt: 'Explore the interactive — Human Geography vs Physical Geography: Interrelation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_003', difficulty: 'standard',
          question: 'Human geography and physical geography are inseparable components of geography.',
          hint: 'Revisit c11_geo_cbse_01_004 and c11_geo_cbse_01_005 to recall the sub-branches, and.',
          misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
          parts: [
                { id: 'a', prompt: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.', answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
                  options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' }
          ],
            remediations: { 'humanisation-of-nature-means-only': { steps: ['Re-read the Benda (Abujh Maad) and Kari (Trondheim) boxes in NCERT.', 'For your own city/village, list three ways you are naturalised (e.g., depend on rain, fear heatwave, use local building.', 'Identify one "red light" your area faces (e.g., groundwater depletion, flood risk, landslide zone).', 'Explain how technology both helps and hits the red light. Re-do Diagnostic Question 4 with this personal example.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the sustainability of the following human–environment interaction: Conversion of the Sundarbans mangrove forest (physical geography: tidal delta,.', answer: 'Unsustainable',
                  options: ['Unsustainable', 'development', 'necessary for economy', 'humanisation of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' },
                { id: 'b', prompt: 'Analyze the neo-determinism (stop-and-go determinism) concept using the traffic light analogy.', answer: 'Neo-determinism: humans can create possibilities (green light) but must respect',
                  options: ['Neo-determinism: humans can create possibilities (green light) but must respect', 'technology solves everything', 'we are helpless before nature', 'humanisation of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "humanisation of nature" means only modern, high-tech societies (like Trondheim), and "naturalisation of humans" means.' }
          ],
            remediations: { 'humanisation-of-nature-means-only': { steps: ['Re-read the Benda (Abujh Maad) and Kari (Trondheim) boxes in NCERT.', 'For your own city/village, list three ways you are naturalised (e.g., depend on rain, fear heatwave, use local building.', 'Identify one "red light" your area faces (e.g., groundwater depletion, flood risk, landslide zone).', 'Explain how technology both helps and hits the red light. Re-do Diagnostic Question 4 with this personal example.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_001', difficulty: 'standard',
          question: 'A human settlement is a cluster of dwellings where people live and interact,.',
          hint: 'If stuck, re-read Class 11 NCERT "India: Physical Environment" Chapter 10 (Human.',
          misconception: '**Exact error:** "Any settlement with >5,000 people is urban." **Why it\'s wrong:** Students ignore the **density.',
          parts: [
                { id: 'a', prompt: 'Explain why a settlement with 10,000 population, 500 persons/km² density, and 74% male workforce in non-primary activities is **not** a census town, while.', answer: '**Answer:** Census town status requires **all three** thresholds to be met',
                  options: ['**Answer:** Census town status requires **all three** thresholds to be met', '≥75% non-primary', '≤25% primary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** "Any settlement with >5,000 people is urban." **Why it\'s wrong:** Students ignore the **density (≥400/km²)** and.' }
          ],
            remediations: { 'exact-error-any-settlement-with': { steps: ['**Revisit Class 11 node c11_geo_cbse_17_001** (Human Settlements: Definition and Classification) — focus on the table.', '**Draw a 2×2 matrix**: Rows = Population (≥5,000 / <5,000), Columns = Workforce (% non-primary ≥75% / <75%).', 'Place 4 hypothetical settlements in cells.', 'Identify which cell = Census Town.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_002', difficulty: 'standard',
          question: 'A settlement is a human community with a defined spatial extent where people.',
          hint: 'If stuck, review c11_geo_cbse_17_001\'s table comparing rural and urban characteristics,.',
          misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the.',
          parts: [
                { id: 'a', prompt: 'State the three quantitative criteria used by the Census of India 2011 to define a census town (statutory towns are defined differently).', answer: 'The three criteria are: (1) minimum population of 5,000',
                  options: ['The three criteria are: (1) minimum population of 5,000', 'simply means'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' },
                { id: 'b', prompt: 'A settlement has 6,200 people, density 450 persons/km², and 80% of male workers in manufacturing.', answer: 'It will be classified as a census town',
                  options: ['It will be classified as a census town', 'simply means'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' }
          ],
            remediations: { 'urban-simply-means-large-population': { steps: ['Revisit c11_geo_cbse_17_001 (Class 11 rural/urban definition) and create a 3-column table: Criterion | Threshold | Why.', 'Take the Census 2011 Primary Census Abstract for your district (available on censusindia.gov.in) and classify 5.', 'Identify any census towns in your district and compare their workforce data with nearby statutory towns — note the.', 'Re-attempt Diagnostic Questions 3 and 4 with fresh data.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The rural-urban dichotomy is outdated; India should adopt a rural-urban continuum model for policy-making." Use Census 2011 data on.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'simply means'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' },
                { id: 'b', prompt: 'Design a decision-flowchart that a district planner could use to classify any settlement in their district using Census 2011 criteria, including the statutory.', answer: 'A good flowchart starts: "Is the settlement notified as',
                  options: ['A good flowchart starts: "Is the settlement notified as', 'simply means'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "urban" simply means "large population" and classify any settlement above 5,000 as urban, ignoring the workforce and.' }
          ],
            remediations: { 'urban-simply-means-large-population': { steps: ['Revisit c11_geo_cbse_17_001 (Class 11 rural/urban definition) and create a 3-column table: Criterion | Threshold | Why.', 'Take the Census 2011 Primary Census Abstract for your district (available on censusindia.gov.in) and classify 5.', 'Identify any census towns in your district and compare their workforce data with nearby statutory towns — note the.', 'Re-attempt Diagnostic Questions 3 and 4 with fresh data.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_004', difficulty: 'standard',
          question: 'Rural settlements classified by function are categorized according to their.',
          hint: 'If confused between shape and pattern, revisit c12_geo_cbse_04_003 and draw: shape =.',
          misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming.',
          parts: [
                { id: 'a', prompt: 'Name the four settlement pattern types recognized in NCERT Class 12 Geography for rural India and give one characteristic feature of each.', answer: 'The four types are: (1) Clustered/Nucleated',
                  options: ['The four types are: (1) Clustered/Nucleated', 'circular, rectangular'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming villages are clustered,.' },
                { id: 'b', prompt: 'A village in the Thar Desert has houses clustered around a stepwell (baoli) with narrow winding lanes.', answer: 'Functional type: **pastoral/agro-pastoral village**',
                  options: ['Functional type: **pastoral/agro-pastoral village**', 'dispersed because population is low'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **functional type** with **pattern** — e.g., assuming all fishing villages are linear, all farming villages are clustered,.' }
          ],
            remediations: { 'students-equate-functional-type-with': { steps: ['Revisit c12_geo_cbse_04_003 (shape types) and explicitly list: shape = geometric outline; pattern = spatial.', 'Use Survey of India 1:50,000 toposheets (c11_geo_cbse_24_006) — identify 3 villages of different patterns, trace their.', 'Create a 2×4 matrix: rows = function (farming, fishing, pastoral, mining); columns = pattern (clustered,.', 'Fill with Indian examples from NCERT Fig.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_009', difficulty: 'standard',
          question: 'Problems of rural settlements refer to the persistent deficits in physical.',
          hint: 'If stuck on settlement patterns → revisit c11_geo_cbse_17_002 (Rural Settlement Types).',
          misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like.',
          parts: [
                { id: 'a', prompt: 'Name any three physical infrastructure deficits commonly found in rural settlements of the Himalayan region (e.g., Uttarakhand, Himachal Pradesh) and state the.', answer: '(1) All-weather road connectivity',
                  options: ['Correct answer: (1) All-weather road connectivity', 'lack of hospitals', 'lack of funds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like "villages lack.' },
                { id: 'b', prompt: 'A village in Bundelkhand (Central India, hard rock terrain) has 1,200 population. It receives 800 mm annual rainfall (June-Sept).', answer: '(a) Demand = 1,200 × 70 lpcd = 84,000 litres/day = 84 m³/day',
                  options: ['(a) Demand = 1,200 × 70 lpcd = 84,000 litres/day = 84 m³/day', 'rural problems are the same everywhere in India', 'villages lack roads, hospitals, schools'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like "villages lack.' }
          ],
            remediations: { 'rural-problems-are-the-same': { steps: ['Revisit c11_geo_cbse_17_007 (Class 11 Problems of Rural Settlements) — list the 5 problem categories (infrastructure,.', 'Take a blank outline map of India; mark 5 villages (one per region) and annotate the dominant physical constraint.', 'For each, write one infrastructure deficit caused by that constraint.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, review c11_geo_cbse_10_004 (Rainfall Distribution) and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Pradhan Mantri Gram Sadak Yojana (PMGSY) has solved rural connectivity in India." Use three specific geographical or outcome-based.', answer: 'Correct evaluation: Claim is partially true but overstated',
                  options: ['Correct evaluation: Claim is partially true but overstated', 'roads built = problem solved', 'rural problems are the same everywhere in India', 'villages lack roads, hospitals, schools'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "rural problems are the same everywhere in India — just lack of money." They write generic answers like "villages lack.' }
          ],
            remediations: { 'rural-problems-are-the-same': { steps: ['Revisit c11_geo_cbse_17_007 (Class 11 Problems of Rural Settlements) — list the 5 problem categories (infrastructure,.', 'Take a blank outline map of India; mark 5 villages (one per region) and annotate the dominant physical constraint.', 'For each, write one infrastructure deficit caused by that constraint.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, review c11_geo_cbse_10_004 (Rainfall Distribution) and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_010', difficulty: 'standard',
          question: 'Sustainable settlement planning is a holistic approach to designing and.',
          hint: 'If stuck on sustainability pillars, revisit c11_soc_cbse_08_008 (Sustainable Development:.',
          misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
          parts: [
                { id: 'a', prompt: 'Explain why "compact city" form is considered more sustainable than "sprawl" for Indian metropolitan regions, linking land use, transport, and energy.', answer: 'Compact city form',
                  options: ['Compact city form', 'saving land', 'analyse the relationship'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'b', prompt: 'A city of 2 million people currently supplies 110 lpcd water. The Smart Cities Mission targets 135 lpcd with 24×7 supply.', answer: 'Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd',
                  options: ['Step 1: Current effective supply per capita = 110 lpcd × (1 – 0.40) = 66 lpcd', 'calculate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' },
                { id: 'c', prompt: 'Compare the RURBAN Mission (Shyama Prasad Mukherji Rurban Mission) and the Smart Cities Mission in terms of: (a) spatial unit of intervention, (b) core.', answer: 'spatial unit of intervention, (',
                  options: ['spatial unit of intervention, (', 'urban missions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' }
          ],
            remediations: { 'students-equate-smart-city-with': { steps: ['Revisit c11_geo_cbse_17_006 (Urban Problems) and c11_geo_cbse_17_008 (Smart Cities Mission) — list 5 urban problems.', 'Draw a systems diagram: water-energy-waste-food-mobility flows for a 1 km² neighbourhood — mark where technology.', 'Take the CUET 2023/2024 geography case-based question on Smart Cities (available on NTA website) and write a 150-word.', 'Verify with teacher using the marking scheme — check if you addressed equity, ecology, and economy, not just tech.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Smart Cities Mission is primarily a technology mission, not a sustainability mission." Use three specific arguments grounded in the.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'discuss', 'assertion-reason'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Smart City" with "high-tech city" (flying cars, AI everywhere) and assume sustainability is automatic.' }
          ],
            remediations: { 'students-equate-smart-city-with': { steps: ['Revisit c11_geo_cbse_17_006 (Urban Problems) and c11_geo_cbse_17_008 (Smart Cities Mission) — list 5 urban problems.', 'Draw a systems diagram: water-energy-waste-food-mobility flows for a 1 km² neighbourhood — mark where technology.', 'Take the CUET 2023/2024 geography case-based question on Smart Cities (available on NTA website) and write a 150-word.', 'Verify with teacher using the marking scheme — check if you addressed equity, ecology, and economy, not just tech.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
