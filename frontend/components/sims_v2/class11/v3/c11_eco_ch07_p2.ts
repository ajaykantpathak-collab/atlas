import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch07_p2: SimDef = {
    id: 'v3_c11_eco_ch07_p2',
    title: 'Environment and Sustainable Development · Part 2/2',
    subtitle: 'Test what \'renewable\' really means and cost the land India is losing.',
    classLevel: 11, subject: 'economics', topic: 'Environment and Sustainable Development · Part 2/2',
    chapters: ['c11_eco_ch07'],
    nodeIds: ['c11_eco_cbse_07_007', 'c11_eco_cbse_07_008', 'c11_eco_cbse_07_009', 'c11_eco_cbse_07_010', 'c11_eco_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an environmental auditor reading a farm\'s white crust', intro: 'A Punjab farmer finds salt crusting his fields after decades of canal irrigation. Trace how affluence and poverty each degrade the same land.', goal: 'Classify resources by regeneration rate and analyse the drivers and costs of land degradation.' },
    discovery: {
        question: 'Punjab\'s aquifers refill every monsoon — groundwater is renewable, so it can never run out. True?',
        options: ['False — tubewells extract roughly 35 BCM a year against about 21 BCM of recharge, making it non-renewable in practice', 'True — anything the rain replaces is by definition renewable', 'False — groundwater was never renewable', 'True — only coal and ores can be exhausted'],
        answer: 'False — tubewells extract roughly 35 BCM a year against about 21 BCM of recharge, making it non-renewable in practice',
        hook: 'Renewable is a rate, not a category — extract faster than nature regenerates and \'renewable\' is just a label.',
    },
    teaching: [
        { title: 'Environmental Degradation: Effects on Health and Economy', text: 'Environmental degradation refers to the deterioration of environmental quality through depletion of natural resources (air, water, soil), destruction of ecosystems, and loss of biodiversity, which.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify six resources as renewable or not under real extraction rates, then price the nutrients India\'s eroding soil loses each year.',
        labels: ['Environmental Degradation: Effects', 'Sustainable Development: Definition', 'Sustainable Development: Strategies', 'Sustainable Development in India', 'Global Environmental Issues: Climate'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_007', title: 'Environmental Degradation: Effects on Health and Economy',
          scaffold: { problem: 'A thermal power plant in Singrauli (MP) emits 120 tonnes/day of SO2 and 80 tonnes/day of PM2.5. The affected airshed has 2 lakh population.',
            steps: [
            { text: 'Identify the concentration-response coefficients: ΔPM2.5 = 35 μg/m³ → 3.5 increments of 10 μg/m³.' },
            { text: 'Calculate attributable cases: Excess deaths/day = 8 × 2.1% = 0.168 deaths/day.' },
            { text: 'Annualise: Excess deaths/year = 0.168 × 365 = 61.32 ≈ 61 deaths.' },
            { text: 'Monetise mortality: 61 deaths × ₹5 crore/VSL = ₹305 crore/year.' },
            { text: 'Monetise morbidity: 230 admissions × ₹25,000 = ₹57.5 lakh/year.' },
            { text: 'Total annual health cost = ₹305 crore + ₹0.575 crore = ₹305.575 crore ≈ ₹306 crore/year.', faded: true, blankAnswer: '₹306 crore per year (mortality: ₹305 crore, morbidity.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_008', title: 'Sustainable Development: Definition and Brundtland Report',
          caseStudy: { intro: 'Imagine you are a village sarpanch in Rajasthan deciding whether to allow a water-intensive crop (sugarcane) or promote millets and rainwater harvesting.',
            decisions: [{ prompt: 'State the exact definition of sustainable development given by the Brundtland Commission in *Our Common Future* (1987).', options: [
                { text: 'Correct answer: "Development that meets the needs of the present generation without', outcome: 'Correct answer: "Development that meets the needs of the present generation without compromising.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often equate "sustainable development" with "environmental protection" or "green growth,".', reveals: 'students-often-equate-sustainable-development' },
                { text: 'development that lasts long', outcome: 'Not quite — Students often equate "sustainable development" with "environmental protection" or "green growth,".', reveals: 'students-often-equate-sustainable-development' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_009', title: 'Sustainable Development: Strategies and Principles',
          scaffold: { problem: 'A district has 200,000 hectares of forest. Sustainable yield (regeneration) is 3 cubic metres per hectare per year.',
            steps: [
            { text: 'Calculate current total extraction R_current = legal + illegal = 400,000 + 250,000 = 650,000 m³/year.' },
            { text: 'Calculate current regeneration r_current = forest area × yield = 200,000 ha × 3 m³/ha/yr = 600,000 m³/year.' },
            { text: 'Check Principle 3 now: R_current (650,000) > r_current (600,000) → VIOLATED by 50,000 m³/yr.' },
            { text: 'Project Year 5 after plan: Illegal logging reduced 90% → new illegal = 25,000 m³/yr. Legal unchanged = 400,000.' },
            { text: 'Check Principle 3 in Year 5: R_Y5 (425,000) ≤ r_Y5 (800,000) → SATISFIED with surplus 375,000 m³/yr.' },
            { text: 'Economic interpretation: The plan corrects the extraction-regeneration gap within 5 years by simultaneously reducing.', faded: true, blankAnswer: 'Immediately: Principle 3 violated (extraction 650,000 >.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_010', title: 'Sustainable Development in India: Policies and Programmes',
          caseStudy: { intro: 'Imagine you are a policy advisor in 1998 Delhi, where the Supreme Court has just mandated conversion of all public transport to CNG because air pollution has.',
            decisions: [{ prompt: 'Name the three specific clean fuel programmes for rural and urban households mentioned in the NCERT Class 11 textbook as strategies for.', options: [
                { text: 'The three programmes are: (1) Subsidised LPG for rural households to replace', outcome: 'The three programmes are: (1) Subsidised LPG for rural households to replace fuelwood/dung cakes.' },
                { text: 'electric vehicles', outcome: 'Not quite — Students believe "sustainable development policies in India" are only about environmental.', reveals: 'sustainable-development-policies-in-india' },
                { text: 'hydrogen fuel', outcome: 'Not quite — Students believe "sustainable development policies in India" are only about environmental.', reveals: 'sustainable-development-policies-in-india' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_011', title: 'Global Environmental Issues: Climate Change and India\'s Response',
          scaffold: { problem: 'India\'s 2005 emission intensity was 0.35 kg CO2/₹ (2011-12 series).',
            steps: [
            { text: 'Compute 2022-23 emission intensity = Total emissions / Real GDP = 2.9 Gt CO2e / ₹160.7 lakh crore.' },
            { text: 'Compute 2005 base intensity in same units: 0.35 kg CO2/₹ = 350 g CO2/₹.' },
            { text: 'Compare current (18.04 g) vs target (192.5 g) — current intensity is ALREADY far below target.' },
            { text: 'Recalculate with consistent series. Assume 2005 intensity = 35 g/₹ (more plausible). Target = 35 × 0.55 = 19.25 g/₹.' },
            { text: 'Project 2030 GDP = 160.7 × (1.065)^7 = 160.7 × 1.554 = ₹249.7 lakh crore.' },
            { text: 'Required annual intensity improvement rate from 2023-2030: (18.04/19.25)^(1/7) - 1 = -0.9% per year (i.e., intensity.', faded: true, blankAnswer: '(a) 18.04 g CO2/₹ (using 2011-12 series); (b) Already.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school\'s eco-club audits groundwater use in the neighbourhood. A member\'s report concludes: \'Groundwater is renewable — rain recharges it every monsoon — so pumping rates don\'t matter. Same for air: given enough time, the atmosphere absorbs any pollution.\'',
            decisions: [{ prompt: 'Where does this reasoning fail?', options: [
                { text: 'On the rate condition: a renewable resource behaves as de facto non-renewable once extraction exceeds recharge — Punjab\'s tubewells draw ~35 BCM/year against ~21 BCM recharge, so the water table falls yearly. Likewise the atmosphere\'s absorptive capacity is bounded on economic timescales; geological assimilation over millennia doesn\'t help today\'s AQI.', outcome: '\'Renewable\' and \'assimilative\' are capacities with thresholds, not infinite buckets — exceed the rate and the function collapses.' },
                { text: 'The report is right — renewable means it regenerates, so use is unlimited by definition.', outcome: 'Regeneration is a rate, not a magic refill; pumping faster than recharge converts a renewable aquifer into a depleting stock.', reveals: 'renewable-means-unlimited' },
                { text: 'Air pollution is self-correcting — the environment assimilates any waste given time.', outcome: 'Time is the catch: assimilation relevant to economic cycles has a capacity limit; \'eventual\' absorption over centuries doesn\'t make PM2.5 free today.', reveals: 'time-assimilates-anything' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'The environment is a supplier, a sink and a life-support at once — degrade it and the bill lands on health, output and the next generation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'standard',
          question: 'Environmental degradation refers to the deterioration of environmental quality.',
          hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) and c11_eco_cbse_07_005.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT states "70% of water in India is polluted" leads to "increased incidence of water-borne diseases" AND "rising health expenditure" — trace.', answer: 'Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate',
                  options: ['Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate', 'diseases increase'],
                  hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) and c11_eco_cbse_07_005 (carrying.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The opportunity cost of environmental degradation is zero for a poor household that relies on firewood for cooking because they have.', answer: 'The statement is false',
                  options: ['The statement is false', 'no monetary payment', 'zero opportunity cost'],
                  hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) and c11_eco_cbse_07_005 (carrying.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_008', difficulty: 'standard',
          question: 'Sustainable development is a development paradigm that meets the needs of the.',
          hint: 'If stuck, revisit Class 9 Chapter 1 "Building Blocks in Economics: The Problem of Choice".',
          misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only.',
          parts: [
                { id: 'a', prompt: 'Compare the Brundtland definition with Edward Barbier\'s definition ("increasing the material standard of living of the poor at the grass root level...', answer: 'Brundtland sets the ethical principle (intergenerational equity, needs focus)',
                  options: ['Brundtland sets the ethical principle (intergenerational equity, needs focus)', 'they are the same', 'needs of the present'],
                  hint: 'If stuck, revisit Class 9 Chapter 1 "Building Blocks in Economics: The Problem of Choice".',
                  misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only means reducing.' }
          ],
            remediations: { 'students-often-equate-sustainable-development': { steps: ['Re-read the Brundtland definition slowly; underline "needs," "present generation," "future generation," "compromising."', 'Draw a two-period diagram: Period 1 (today) extracts resources → Period 2 (tomorrow) has less stock.', 'Connect to Class 9 scarcity (c9_eco_ch1_1) and opportunity cost (c9_eco_ch1_3): every unit consumed today has.', 'Write one sentence explaining why "meeting needs" is not the same as "maximising wants" using a concrete Indian example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_009', difficulty: 'standard',
          question: 'Sustainable development strategies are specific action-oriented approaches.',
          hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) for carrying capacity and.',
          misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles".',
          parts: [
                { id: 'a', prompt: 'A town has 50,000 people. Each person uses 0.8 tonnes of firewood per year. The surrounding forest regenerates 35,000 tonnes of biomass annually.', answer: 'Calculate the extraction-regeneration gap',
                  options: ['Calculate the extraction-regeneration gap', 'strategies', 'principles'],
                  hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) for carrying capacity and.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' },
                { id: 'b', prompt: 'Compare the strategy of promoting CNG in urban public transport (Delhi\'s case) with promoting solar photovoltaic cells in remote rural areas.', answer: 'CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel',
                  options: ['CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel', 'strategies', 'principles'],
                  hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) for carrying capacity and.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' }
          ],
            remediations: { 'students-frequently-confuse-strategies-specific': { steps: ['Revisit c11_eco_cbse_07_001 (environment functions) to re-learn assimilative capacity and carrying capacity.', 'Write Daly\'s five principles as mathematical inequalities (R ≤ r, d ≤ s, etc.) and test each strategy against them.', 'Practice classifying 10 interventions (from news articles) into which principle(s) they serve.', 'Solve Worked Example 3 again, focusing on the opportunity cost of chemical vs bio-inputs over a 10-year horizon.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_010', difficulty: 'standard',
          question: 'Sustainable Development Policies and Programmes in India refer to the specific.',
          hint: 'Revisit c11_eco_cbse_07_001 (Functions of Environment) and c11_eco_cbse_07_007 (Effects.',
          misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees.',
          parts: [
                { id: 'a', prompt: 'Name the three specific clean fuel programmes for rural and urban households mentioned in the NCERT Class 11 textbook as strategies for sustainable development.', answer: 'The three programmes are: (1) Subsidised LPG for rural households to replace',
                  options: ['The three programmes are: (1) Subsidised LPG for rural households to replace', 'electric vehicles', 'hydrogen fuel', 'sustainable development policies in India'],
                  hint: 'Revisit c11_eco_cbse_07_001 (Functions of Environment) and c11_eco_cbse_07_007 (Effects on Health.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' },
                { id: 'b', prompt: 'Explain why the Central Pollution Control Board (CPCB) was established in 1974 and why state-level boards followed, using the concept of "absorptive capacity.', answer: 'The CPCB was established',
                  options: ['The CPCB was established', 'pollution control', 'sustainable development policies in India'],
                  hint: 'Revisit c11_eco_cbse_07_001 (Functions of Environment) and c11_eco_cbse_07_007 (Effects on Health.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' },
                { id: 'c', prompt: 'A village of 500 households currently uses fuelwood for cooking. Each household collects 15 kg/day from nearby forests.', answer: 'Step 1: Total extraction = 500 households × 15 kg = 7,500 kg/day',
                  options: ['Step 1: Total extraction = 500 households × 15 kg = 7,500 kg/day', 'sustainable development policies in India'],
                  hint: 'Revisit c11_eco_cbse_07_001 (Functions of Environment) and c11_eco_cbse_07_007 (Effects on Health.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' }
          ],
            remediations: { 'sustainable-development-policies-in-india': { steps: ['Revisit c11_eco_cbse_07_007 (Effects on Health and Economy) and calculate the health cost of air pollution: if 70%.', 'Take one NCERT policy (e.g., Gobar gas plant). Identify the market failure: dung cake burning causes indoor air.', 'Write a 100-word explanation using terms: externality, absorptive capacity, private vs social cost, incentive alignment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_011', difficulty: 'standard',
          question: 'Global environmental issues refer to planetary-scale ecological.',
          hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the statement.',
          misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").',
          parts: [
                { id: 'a', prompt: 'Analyze the following statement: "India\'s International Solar Alliance (ISA) is primarily a climate mitigation initiative." Identify two dimensions where ISA.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'we fixed ozone, we can fix climate the same way'],
                  hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the statement: "wastes.',
                  misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").' }
          ],
            remediations: { 'students-conflate-global-warming-and': { steps: ['Draw two side-by-side diagrams. Left: "Greenhouse Effect" — Sun → shortwave → surface → longwave → GHGs.', 'Create a comparison table with rows: Primary human cause, Key chemicals, Atmospheric layer affected, Main environmental.', 'Calculate radiative forcing: CFC-12 = +0.17 W/m² (GHG effect) vs.', 'Read NCERT Box 7.1 and 7.2 aloud, highlighting "greenhouse gases" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
