import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch07_p1: SimDef = {
    id: 'v3_c11_eco_ch07_p1',
    title: 'Environment and Sustainable Development · Part 1/2',
    subtitle: 'Test what \'renewable\' really means and cost the land India is losing.',
    classLevel: 11, subject: 'economics', topic: 'Environment and Sustainable Development · Part 1/2',
    chapters: ['c11_eco_ch07'],
    nodeIds: ['c11_eco_cbse_07_001', 'c11_eco_cbse_07_002', 'c11_eco_cbse_07_003', 'c11_eco_cbse_07_004', 'c11_eco_cbse_07_005', 'c11_eco_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an environmental auditor reading a farm\'s white crust', intro: 'A Punjab farmer finds salt crusting his fields after decades of canal irrigation. Trace how affluence and poverty each degrade the same land.', goal: 'Classify resources by regeneration rate and analyse the drivers and costs of land degradation.' },
    discovery: {
        question: 'Punjab\'s aquifers refill every monsoon — groundwater is renewable, so it can never run out. True?',
        options: ['False — tubewells extract roughly 35 BCM a year against about 21 BCM of recharge, making it non-renewable in practice', 'True — anything the rain replaces is by definition renewable', 'False — groundwater was never renewable', 'True — only coal and ores can be exhausted'],
        answer: 'False — tubewells extract roughly 35 BCM a year against about 21 BCM of recharge, making it non-renewable in practice',
        hook: 'Renewable is a rate, not a category — extract faster than nature regenerates and \'renewable\' is just a label.',
    },
    teaching: [
        { title: 'Environment: Definition, Functions and Components', text: 'Environment is the total planetary inheritance comprising the totality of all biotic (living: forests, fisheries, animals) and abiotic (non-living: air, water, land, sunlight, minerals) resources and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify six resources as renewable or not under real extraction rates, then price the nutrients India\'s eroding soil loses each year.',
        labels: ['Environment: Definition, Functions', 'State of India\'s Environment', 'Environmental Degradation: Causes (Population,', 'Environmental Degradation: Deforestation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_001', title: 'Environment: Definition, Functions and Components',
          caseStudy: { intro: 'Imagine you wake up in a typical Indian household: you brush your teeth using groundwater (abiotic), eat breakfast made from wheat and milk (biotic), breathe.',
            decisions: [{ prompt: 'Define "environment" in economics and distinguish between biotic and abiotic components with two examples each.', options: [
                { text: 'Correct answer: Environment is the total planetary inheritance and totality of all', outcome: 'Correct answer: Environment is the total planetary inheritance and totality of all resources.' },
                { text: 'trees, water, air', outcome: 'Not quite — Students often believe "renewable resources are unlimited and can never be exhausted" because they.', reveals: 'renewable-resources-are-unlimited-and' },
                { text: 'total planetary inheritance', outcome: 'Not quite — Students often believe "renewable resources are unlimited and can never be exhausted" because they.', reveals: 'renewable-resources-are-unlimited-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_002', title: 'State of India\'s Environment: Land Resources and Degradation',
          caseStudy: { intro: 'Imagine you are a farmer in Punjab\'s Malwa region noticing white crust forming on your fields — this is salinization from decades of canal irrigation without.',
            decisions: [{ prompt: 'What is the per capita forest land availability in India according to the NCERT data, and how does it compare to the estimated requirement.', options: [
                { text: 'Per capita forest land is 0.06 hectare against a requirement of 0.47 hectare, creating a', outcome: 'Per capita forest land is 0.06 hectare against a requirement of 0.47 hectare, creating a deficit.' },
                { text: 'overpopulation', outcome: 'Not quite — Students believe land degradation is primarily caused by "overpopulation" in a generic Malthusian.', reveals: 'land-degradation-is-primarily-caused' },
                { text: '0.47 ha as availability', outcome: 'Not quite — Students believe land degradation is primarily caused by "overpopulation" in a generic Malthusian.', reveals: 'land-degradation-is-primarily-caused' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_003', title: 'State of India\'s Environment: Water Resources and Pollution',
          scaffold: { problem: 'A block in Punjab has 20,000 ha net sown area. Annual groundwater recharge = 400 mm. Natural discharge = 10% of recharge.',
            steps: [
            { text: 'Compute annual recharge volume = 20,000 ha × 0.4 m = 8,000 ha-m = 80 MCM (1 ha-m = 10,000 m³).' },
            { text: 'Compute natural discharge = 10% × 80 MCM = 8 MCM.' },
            { text: 'Annual extractable resource = Recharge - Natural discharge = 80 - 8 = 72 MCM.' },
            { text: 'Electric tubewell extraction = 1,200 × 1,800 × 30 = 64,800,000 m³ = 64.8 MCM.' },
            { text: 'Diesel tubewell extraction = 200 × 1,200 × 25 = 6,000,000 m³ = 6 MCM.' },
            { text: 'Total extraction = 64.8 + 6 + 5 (domestic/industrial) = 75.8 MCM.' },
            { text: 'Stage of extraction = (75.8 / 72) × 100 = 105.28%.' },
            { text: 'Classification: >100% → Over-exploited block.', faded: true, blankAnswer: 'Stage of groundwater extraction = 105.3% (Over-exploited.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_004', title: 'State of India\'s Environment: Air Pollution and Quality',
          scaffold: { problem: 'A CPCB monitoring station in Delhi records 24-hour average concentrations: PM2.5 = 180 µg/m³, PM10 = 320 µg/m³, NO2 = 95 µg/m³, SO2 = 45.',
            steps: [
            { text: 'Identify the concentration bracket for each pollutant. PM2.5=180 → Very Poor bracket (121-250).' },
            { text: 'Calculate sub-index for PM2.5 using linear interpolation formula. I_HI=400, I_LO=301, C_HI=250, C_LO=121, C_p=180.' },
            { text: 'Calculate sub-index for PM10. Bracket: Poor (251-350 → 201-300). I_HI=300, I_LO=201, C_HI=350, C_LO=251, C_p=320.' },
            { text: 'Calculate sub-index for NO2. Bracket: Moderate (81-180 → 101-200). I_HI=200, I_LO=101, C_HI=180, C_LO=81, C_p=95.' },
            { text: 'Compare all sub-indices: PM2.5=346, PM10=270, NO2=115, others <100. Maximum is 346 (PM2.5).' },
            { text: 'Overall AQI = 346 → "Very Poor" category. Critical pollutant = PM2.5.', faded: true, blankAnswer: 'AQI = 346 (Very Poor); Critical pollutant = PM2.5' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_005', title: 'Environmental Degradation: Causes (Population, Poverty, Affluence)',
          caseStudy: { intro: 'Imagine a small Himalayan village where 50 families collect fuelwood from the surrounding forest.',
            decisions: [{ prompt: 'Define "carrying capacity of the environment" in the context of sustainable development.', options: [
                { text: 'Carrying capacity is the maximum population size that an environment can sustain', outcome: 'Carrying capacity is the maximum population size that an environment can sustain indefinitely.' },
                { text: 'carrying capacity is the total resources available', outcome: 'Not quite — Students believe "poverty is the main cause of environmental degradation in India" because they see.', reveals: 'poverty-is-the-main-cause' },
                { text: 'poverty is the main cause of environmental degradation in India', outcome: 'Not quite — Students believe "poverty is the main cause of environmental degradation in India" because they see.', reveals: 'poverty-is-the-main-cause' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_006', title: 'Environmental Degradation: Deforestation and Biodiversity Loss',
          scaffold: { problem: 'The Forest Department of Chhattisgarh proposes diverting 800 hectares of Very Dense Forest (VMDF, canopy >70%) in Hasdeo Arand for coal.',
            steps: [
            { text: 'Identify all ecosystem services and their annual values per hectare from TEEB India 2018: Carbon = ₹12,000/ha/yr (at.' },
            { text: 'Calculate annual flow for 800 ha = 800 × ₹59,000 = ₹4.72 crore/year.' },
            { text: 'Compute NPV of this perpetual flow over 30 years at 5% discount rate: NPV = Annual Flow × [1 - (1+r)^-n] / r = ₹4.72.' },
            { text: 'Add one-time carbon stock loss: VMDF stores ~150 tC/ha in biomass + 100 tC/ha in soil = 250 tC/ha.' },
            { text: 'Total economic cost = NPV of flows (₹72.56 crore) + Carbon stock loss (₹734 crore) = ₹806.56 crore.' },
            { text: 'Compare with mine revenue: ₹2,500 crore over 30 years. NPV of mine revenue at 5% (assuming even annual flow): ₹2,500.' },
            { text: 'Net benefit = Mine NPV - Forest NPV = ₹1,281 - ₹806.56 = ₹474.44 crore positive.' },
            { text: 'But this ignores: (a) Biodiversity loss is irreversible (no substitute for Schedule-I habitat), (b) Tribal livelihoods.' },
            { text: 'Apply precautionary principle: when irreversible loss of critical natural capital (Schedule-I habitat, watershed).', faded: true, blankAnswer: 'NPV of ecosystem services lost = ₹806.56 crore; NPV of mine.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school\'s eco-club audits groundwater use in the neighbourhood. A member\'s report concludes: \'Groundwater is renewable — rain recharges it every monsoon — so pumping rates don\'t matter. Same for air: given enough time, the atmosphere absorbs any pollution.\'',
            decisions: [{ prompt: 'Where does this reasoning fail?', options: [
                { text: 'On the rate condition: a renewable resource behaves as de facto non-renewable once extraction exceeds recharge — Punjab\'s tubewells draw ~35 BCM/year against ~21 BCM recharge, so the water table falls yearly. Likewise the atmosphere\'s absorptive capacity is bounded on economic timescales; geological assimilation over millennia doesn\'t help today\'s AQI.', outcome: '\'Renewable\' and \'assimilative\' are capacities with thresholds, not infinite buckets — exceed the rate and the function collapses.' },
                { text: 'The report is right — renewable means it regenerates, so use is unlimited by definition.', outcome: 'Regeneration is a rate, not a magic refill; pumping faster than recharge converts a renewable aquifer into a depleting stock.', reveals: 'renewable-means-unlimited' },
                { text: 'Air pollution is self-correcting — the environment assimilates any waste given time.', outcome: 'Time is the catch: assimilation relevant to economic cycles has a capacity limit; \'eventual\' absorption over centuries doesn\'t make PM2.5 free today.', reveals: 'time-assimilates-anything' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'The environment is a supplier, a sink and a life-support at once — degrade it and the bill lands on health, output and the next generation.',
            decisions: [{ prompt: 'What comes next? Environment and Sustainable Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Environment and Sustainable Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_001', difficulty: 'standard',
          question: 'Environment is the total planetary inheritance comprising the totality of all.',
          hint: 'Revisit Class 9 "Scarcity" (c9_eco_ch1_1) and "Factors of Production: Land".',
          misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.',
          parts: [
                { id: 'a', prompt: 'Analyze the following two scenarios and identify which violates carrying capacity and which violates absorptive capacity.', answer: 'Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >',
                  options: ['Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >', 'pollution', 'renewable resources are unlimited and can never be exhausted', 'the environment can assimilate any waste if given enough time'],
                  hint: 'Revisit Class 9 "Scarcity" (c9_eco_ch1_1) and "Factors of Production: Land" (c9_eco_ch1_7).',
                  misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.' }
          ],
            remediations: { 'renewable-resources-are-unlimited-and': { steps: ['If a student holds this misconception, conduct a 3-step remediation: 1.', '**Data confrontation**: Show Punjab groundwater data (extraction 35 BCM, recharge 21 BCM, water table falling 0.5–1.', 'Ask: "Is this renewable in practice?" Calculate years to depletion at current rates (use aquifer volume estimates from.', '**Graphical analysis**: Draw regeneration curve (concave, max at MSY) and extraction line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The opportunity cost of negative environmental impacts is low for a developing country like India because environmental protection.', answer: 'Correct evaluation: The statement is **false**',
                  options: ['Correct evaluation: The statement is **false**', 'growth first, environment later', 'renewable resources are unlimited and can never be exhausted', 'the environment can assimilate any waste if given enough time'],
                  hint: 'Revisit Class 9 "Scarcity" (c9_eco_ch1_1) and "Factors of Production: Land" (c9_eco_ch1_7).',
                  misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.' }
          ],
            remediations: { 'renewable-resources-are-unlimited-and': { steps: ['If a student holds this misconception, conduct a 3-step remediation: 1.', '**Data confrontation**: Show Punjab groundwater data (extraction 35 BCM, recharge 21 BCM, water table falling 0.5–1.', 'Ask: "Is this renewable in practice?" Calculate years to depletion at current rates (use aquifer volume estimates from.', '**Graphical analysis**: Draw regeneration curve (concave, max at MSY) and extraction line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_002', difficulty: 'standard',
          question: 'Land degradation in India refers to the decline in productive capacity of land.',
          hint: 'Revisit c11_eco_cbse_07_001 Section 7.2 (Functions of Environment) and the carrying.',
          misconception: 'Students believe land degradation is primarily caused by "overpopulation" in a generic Malthusian sense, leading them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Land degradation in India refers to the decline in productive capacity of land resources',
                  options: ['Land degradation in India refers to the decline in productive capacity of land resources', 'Environment is the total planetary inheritance comprising the totality of all biotic', 'Water resources in the Indian economic context refer to the stock and flow of freshwater', 'Air pollution refers to the contamination of the atmosphere by harmful substances'],
                  hint: 'Revisit c11_eco_cbse_07_001 Section 7.2 (Functions of Environment) and the carrying capacity.',
                  misconception: 'Students believe land degradation is primarily caused by "overpopulation" in a generic Malthusian sense, leading them to cite total.' }
          ],
            remediations: { 'land-degradation-is-primarily-caused': { steps: ['Re-read NCERT Box 7.3 (Chipko/Appiko) and identify three distinct actor groups: contractors (commercial), forest.', 'Map each group\'s land-use demand to a specific degradation factor from the 12-factor list (e.g., contractors →.', 'Calculate livestock density for your state using Census 2019 data (available online) and compare to the national 20%.', 'Write a 100-word explanation of why "population pressure" is an incomplete explanation without specifying *which*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_003', difficulty: 'standard',
          question: 'Water resources in the Indian economic context refer to the stock and flow.',
          hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able.',
          misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT textbook, what percentage of water in India is polluted, and which two functions of the environment fail when this occurs?', answer: '70% of water in India is polluted',
                  options: ['70% of water in India is polluted', '50% polluted', 'life sustenance', 'it\'s under my land'],
                  hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able to perform these.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources.' },
                { id: 'b', prompt: 'The textbook states: "Water has become an economic commodity." Explain why this statement is economically precise, using the concepts of scarcity, rivalry, and.', answer: 'Water became an economic commodity',
                  options: ['Water became an economic commodity', 'water was always an economic good', 'government made it a commodity', 'it\'s under my land'],
                  hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able to perform these.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources.' },
                { id: 'c', prompt: 'The CPCB monitors 125 rivers. In a hypothetical stretch, BOD = 8 mg/L, DO = 2 mg/L, and total coliform = 50,000 MPN/100ml.', answer: 'Classification: Polluted (BOD > 3 mg/L and DO < 4 mg/L both violated)',
                  options: ['Classification: Polluted (BOD > 3 mg/L and DO < 4 mg/L both violated)', 'it\'s under my land'],
                  hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able to perform these.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources.' },
                { id: 'd', prompt: 'Compare the pollution dynamics of the Ganga (main stem) and the Yamuna (tributary) using these stylised facts: Ganga receives 60% domestic sewage, 30%.', answer: 'Yamuna\'s Delhi stretch (80% domestic) is more amenable to decentralised STPs',
                  options: ['Yamuna\'s Delhi stretch (80% domestic) is more amenable to decentralised STPs', 'it\'s under my land'],
                  hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able to perform these.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources.' }
          ],
            remediations: { 'groundwater-is-a-private-property': { steps: ['Re-read NCERT Section 7.3 paragraphs on "management of fresh water" and "seventy per cent of water in India.', 'Draw a 2×2 matrix: rows = surface/groundwater; columns = point-source/non-point-source pollution.', 'Solve this numerical: A village has 100 ha, annual recharge = 300 mm, 50 tubewells each extracting 2,000 m³/year.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_004', difficulty: 'standard',
          question: 'Air pollution refers to the contamination of the atmosphere by harmful.',
          hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the.',
          misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November.',
          parts: [
                { id: 'a', prompt: 'In 2022, India had 35 crore registered vehicles, of which 85% were two-wheelers and cars.', answer: 'Step 1: Total vehicles = 35 crore = 350 million',
                  options: ['Step 1: Total vehicles = 35 crore = 350 million', 'air pollution is only a winter problem in North India'],
                  hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the assimilative capacity.',
                  misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November smog.' }
          ],
            remediations: { 'air-pollution-is-only-a': { steps: ['Pull up CPCB\'s "National Air Quality Monitoring Programme (NAMP) data" for any 5 non-Delhi cities (e.g., Kanpur.', 'Identify months where PM2.5 > 60 µg/m³ (moderate) — students will see exceedances in summer/monsoon too.', 'Cross-reference with SAFAR/IMD bulletins for O3 exceedance days in April-June.', 'Re-read NCERT Box 7.4 (Pollution Control Boards) and NCAP framework to understand that 102 non-attainment cities have.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_005', difficulty: 'standard',
          question: 'Environmental degradation refers to the deterioration of environmental quality.',
          hint: 'Revisit c11_eco_cbse_07_001\'s four functions, especially "resource extraction not above.',
          misconception: 'Students believe "poverty is the main cause of environmental degradation in India" because they see visible rural.',
          parts: [
                { id: 'a', prompt: 'Define "carrying capacity of the environment" in the context of sustainable development. How does it function like a plimsoll line on a ship?', answer: 'Carrying capacity is the maximum population size that an environment can sustain',
                  options: ['Carrying capacity is the maximum population size that an environment can sustain', 'carrying capacity is the total resources available', 'poverty is the main cause of environmental degradation in India'],
                  hint: 'Revisit c11_eco_cbse_07_001\'s four functions, especially "resource extraction not above rate.',
                  misconception: 'Students believe "poverty is the main cause of environmental degradation in India" because they see visible rural resource extraction.' },
                { id: 'b', prompt: 'Compare and contrast poverty-induced environmental degradation (e.g., fuelwood collection in Uttarakhand) with affluence-induced degradation (e.g., SUV.', answer: 'Similarities: (1) Both exceed local carrying capacity',
                  options: ['Similarities: (1) Both exceed local carrying capacity', 'poverty causes more damage', 'poverty is the main cause of environmental degradation in India'],
                  hint: 'Revisit c11_eco_cbse_07_001\'s four functions, especially "resource extraction not above rate.',
                  misconception: 'Students believe "poverty is the main cause of environmental degradation in India" because they see visible rural resource extraction.' }
          ],
            remediations: { 'poverty-is-the-main-cause': { steps: ['Show World Bank data — India\'s top decile per capita CO₂ = 4.4 tCO₂/yr vs bottom 50% = 0.5 tCO₂/yr.', 'Calculate aggregate: top 10% (140M people) × 4.4 = 616 MtCO₂; bottom 50% (700M) × 0.5 = 350 MtCO₂.', 'Discuss why rural fuelwood collection (visible, photographed) gets more policy attention than urban AC usage.', 'Assign students to estimate their household\'s monthly carbon footprint using an online calculator — they discover their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_006', difficulty: 'standard',
          question: 'Deforestation is the permanent conversion of forest land to non-forest uses.',
          hint: 'If confused about why "planting trees" ≠ "replacing forests", revisit.',
          misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".',
          parts: [
                { id: 'a', prompt: 'Compare the biodiversity loss from two scenarios: (A) Clearing 1,000 hectares of contiguous primary forest for a highway, vs (B) Clearing 1,000 hectares of the.', answer: 'Scenario B causes significantly greater biodiversity loss',
                  options: ['Scenario B causes significantly greater biodiversity loss', 'same area cleared = same impact', 'poor people cutting trees for survival'],
                  hint: 'If confused about why "planting trees" ≠ "replacing forests", revisit **c11_eco_cbse_07_001**.',
                  misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".' }
          ],
            remediations: { 'deforestation-and-biodiversity-loss-are': { steps: ['Revisit **c11_eco_cbse_07_005** (Causes of Environmental Degradation) — specifically the distinction between.', 'Study **Forest Survey of India (FSI) 2021 Report, Chapter 2** — note that "Recorded Forest Area" (legal status) ≠.', 'Read the **Chipko Movement case (Box 7.3 in NCERT)** and answer: "Why did commercial contractors, not villagers, cause.', 'Apply **opportunity cost framework from c9_eco_ch1_3** to a real forest diversion case (e.g., Hasdeo Arand coal mining).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
