import type { SimDef } from '../../engine/types';
import C11_EconomicsHumanWantsClassificationSim from '../../../simulations/c6_12/C11_EconomicsHumanWantsClassificationSim';

/** v3 wrapped master — C11_EconomicsHumanWantsClassificationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicshumanwantsclassificationsim: SimDef = {
    id: 'v3w_c11_economicshumanwantsclassificationsim',
    title: 'Sustainable Development: Definition and Brundtland Report',
    subtitle: 'This node covers the conceptual definition of sustainable development, the Brundtland.',
    classLevel: 11, subject: 'economics', topic: 'Sustainable Development: Definition and Brundtland Report',
    chapters: [],
    nodeIds: ['c11_eco_cbse_07_008', 'c11_eco_cbse_07_009', 'c11_eco_cbse_07_001', 'c11_eco_cbse_07_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a village sarpanch in Rajasthan deciding whether to allow a water-intensive crop (sugarcane).', goal: 'Master Sustainable Development: Definition and Brundtland Report.' },
    discovery: {
        question: 'Compare the Brundtland definition with Edward Barbier\'s definition ("increasing the material standard of living of the poor at the grass root level...',
        options: ['Brundtland sets the ethical principle (intergenerational equity, needs focus)', 'they are the same', 'needs of the present'],
        answer: 'Brundtland sets the ethical principle (intergenerational equity, needs focus)',
        hook: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only.',
    },
    teaching: [
        { title: 'Sustainable development is a development.', text: 'Sustainable development is a development paradigm that meets the needs of the present generation without compromising the ability of future generations to meet their own needs, as defined by the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_008', title: 'Sustainable development is a.',
          scaffold: { problem: 'The state of Punjab extracts 35 BCM of groundwater annually for irrigation.',
            steps: [
            { text: 'Identify current extraction (35 BCM/yr) and regeneration (22 BCM/yr).' },
            { text: 'Calculate effect of crop switching: reduces extraction by 3 BCM/yr → new extraction = 35 – 3 = 32 BCM/yr.' },
            { text: 'Calculate effect of managed aquifer recharge: adds 2 BCM/yr to regeneration → new regeneration = 22 + 2 = 24 BCM/yr.' },
            { text: 'New deficit = 32 – 24 = 8 BCM/yr. Still positive → extraction > regeneration.' },
            { text: 'Conclusion: Measures reduce the deficit but do not achieve sustainability; further reduction of 8 BCM/yr needed.' },
            { text: 'This applies Daly\'s Rule (iii): renewable resources should be extracted on a sustainable basis, i.e., extraction rate ≤.', faded: true, blankAnswer: 'No, the measures reduce the annual deficit from 13 BCM to 8.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_009', title: 'Sustainable development strategies are.',
          scaffold: { problem: 'A district has 200,000 hectares of forest. Sustainable yield (regeneration) is 3 cubic metres per hectare per year.',
            steps: [
            { text: 'Calculate current total extraction R_current = legal + illegal = 400,000 + 250,000 = 650,000 m³/year.' },
            { text: 'Calculate current regeneration r_current = forest area × yield = 200,000 ha × 3 m³/ha/yr = 600,000 m³/year.' },
            { text: 'Check Principle 3 now: R_current (650,000) > r_current (600,000) → VIOLATED by 50,000 m³/yr.' },
            { text: 'Project Year 5 after plan: Illegal logging reduced 90% → new illegal = 25,000 m³/yr. Legal unchanged = 400,000.' },
            { text: 'Check Principle 3 in Year 5: R_Y5 (425,000) ≤ r_Y5 (800,000) → SATISFIED with surplus 375,000 m³/yr.' },
            { text: 'Economic interpretation: The plan corrects the extraction-regeneration gap within 5 years by simultaneously reducing.', faded: true, blankAnswer: 'Immediately: Principle 3 violated (extraction 650,000 >.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_001', title: 'Environment is the total planetary.',
          scaffold: { problem: 'A village economy depends on a forest for firewood (biotic renewable) and a river for irrigation water (abiotic renewable).',
            steps: [
            { text: 'Identify the two renewable resources and their regeneration rates: Forest biomass R_forest = 500 tonnes/year; Aquifer.' },
            { text: 'Calculate current total extraction rates: Firewood extraction E_forest = 120 households × 5 tonnes = 600 tonnes/year.' },
            { text: 'Compare extraction with regeneration for each resource: Forest: 600 > 500 → exceeds carrying capacity by 100.' },
            { text: 'Compute maximum sustainable households for the binding constraint (forest): Max households = R_forest / per household.' },
            { text: 'Check water at 100 households: 100 × 80,000 = 8,000,000 m³/year < 10,000,000 → still within capacity.' },
            { text: 'Economic interpretation: The forest is the limiting resource. At 120 households, biomass stock declines annually →.', faded: true, blankAnswer: 'Forest carrying capacity exceeded (600 > 500 tonnes/year);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_003', title: 'Water resources in the Indian economic.',
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
        { type: 'dissect', nodeId: 'c11_eco_cbse_07_009', title: 'Identify each idea',
          dissect: { specimen: 'Sustainable Development: Definition and Brundtland Report', spots: [
            { id: 's1', label: 'Sustainable development is a development', prompt: 'Which idea is this? — Sustainable development is a development paradigm that meets the needs of the present.', answer: 'Sustainable development is a development', options: ['Sustainable development is a development', 'Sustainable development strategies are specific', 'Environment is the total planetary', 'Water resources in the Indian'] },
            { id: 's2', label: 'Sustainable development strategies are specific', prompt: 'Which idea is this? — Sustainable development strategies are specific action-oriented approaches (such as.', answer: 'Sustainable development strategies are specific', options: ['Sustainable development strategies are specific', 'Sustainable development is a development', 'Environment is the total planetary', 'Water resources in the Indian'] },
            { id: 's3', label: 'Environment is the total planetary', prompt: 'Which idea is this? — Environment is the total planetary inheritance comprising the totality of all biotic.', answer: 'Environment is the total planetary', options: ['Environment is the total planetary', 'Sustainable development is a development', 'Sustainable development strategies are specific', 'Water resources in the Indian'] },
            { id: 's4', label: 'Water resources in the Indian', prompt: 'Which idea is this? — Water resources in the Indian economic context refer to the stock and flow of freshwater.', answer: 'Water resources in the Indian', options: ['Water resources in the Indian', 'Sustainable development is a development', 'Sustainable development strategies are specific', 'Environment is the total planetary'] }
          ] } }
    ],
    explore: { component: C11_EconomicsHumanWantsClassificationSim, prompt: 'Explore the interactive — Sustainable Development: Definition and Brundtland Report' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_008', difficulty: 'standard',
          question: 'Sustainable development is a development paradigm that meets the needs of the.',
          hint: 'If stuck, revisit Class 9 Chapter 1 "Building Blocks in Economics: The Problem of Choice".',
          misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only.',
          parts: [
                { id: 'a', prompt: 'Compare the Brundtland definition with Edward Barbier\'s definition ("increasing the material standard of living of the poor at the grass root level...', answer: 'Brundtland sets the ethical principle (intergenerational equity, needs focus)',
                  options: ['Brundtland sets the ethical principle (intergenerational equity, needs focus)', 'they are the same', 'needs of the present'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only means reducing.' }
          ],
            remediations: { 'students-often-equate-sustainable-development': { steps: ['Re-read the Brundtland definition slowly; underline "needs," "present generation," "future generation," "compromising."', 'Draw a two-period diagram: Period 1 (today) extracts resources → Period 2 (tomorrow) has less stock.', 'Connect to Class 9 scarcity (c9_eco_ch1_1) and opportunity cost (c9_eco_ch1_3): every unit consumed today has an.', 'Write one sentence explaining why "meeting needs" is not the same as "maximising wants" using a concrete Indian example.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only.',
          parts: [
                { id: 'a', prompt: 'Compare the Brundtland definition with Edward Barbier\'s definition ("increasing the material standard of living of the poor at the grass root level...', answer: 'Brundtland sets the ethical principle (intergenerational equity, needs focus)',
                  options: ['Brundtland sets the ethical principle (intergenerational equity, needs focus)', 'they are the same', 'needs of the present'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "sustainable development" with "environmental protection" or "green growth," thinking it only means reducing.' }
          ],
            remediations: { 'students-often-equate-sustainable-development': { steps: ['Re-read the Brundtland definition slowly; underline "needs," "present generation," "future generation," "compromising."', 'Draw a two-period diagram: Period 1 (today) extracts resources → Period 2 (tomorrow) has less stock.', 'Connect to Class 9 scarcity (c9_eco_ch1_1) and opportunity cost (c9_eco_ch1_3): every unit consumed today has an.', 'Write one sentence explaining why "meeting needs" is not the same as "maximising wants" using a concrete Indian example.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_009', difficulty: 'standard',
          question: 'Sustainable development strategies are specific action-oriented approaches.',
          hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) for carrying capacity and.',
          misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles".',
          parts: [
                { id: 'a', prompt: 'A town has 50,000 people. Each person uses 0.8 tonnes of firewood per year. The surrounding forest regenerates 35,000 tonnes of biomass annually.', answer: 'Calculate the extraction-regeneration gap',
                  options: ['Calculate the extraction-regeneration gap', 'strategies', 'principles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' },
                { id: 'b', prompt: 'Compare the strategy of promoting CNG in urban public transport (Delhi\'s case) with promoting solar photovoltaic cells in remote rural areas.', answer: 'CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel',
                  options: ['CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel', 'strategies', 'principles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' }
          ],
            remediations: { 'students-frequently-confuse-strategies-specific': { steps: ['Revisit c11_eco_cbse_07_001 (environment functions) to re-learn assimilative capacity and carrying capacity as.', 'Write Daly\'s five principles as mathematical inequalities (R ≤ r, d ≤ s, etc.) and test each strategy against them —.', 'Practice classifying 10 interventions (from news articles) into which principle(s) they serve.', 'Solve Worked Example 3 again, focusing on the opportunity cost of chemical vs bio-inputs over a 10-year horizon.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Biocomposting and biopest control are merely traditional farming methods; they cannot scale to meet India\'s food security needs in the.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'strategies', 'principles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' },
                { id: 'b', prompt: 'Compare the strategy of promoting CNG in urban public transport (Delhi\'s case) with promoting solar photovoltaic cells in remote rural areas.', answer: 'CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel',
                  options: ['CNG: Addresses Principle 5 (reduces particulate matter, NOx, CO vs diesel', 'strategies', 'principles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse "strategies" (specific interventions like CNG, solar, biocomposting) with "principles" (Daly\'s five operational.' }
          ],
            remediations: { 'students-frequently-confuse-strategies-specific': { steps: ['Revisit c11_eco_cbse_07_001 (environment functions) to re-learn assimilative capacity and carrying capacity as.', 'Write Daly\'s five principles as mathematical inequalities (R ≤ r, d ≤ s, etc.) and test each strategy against them —.', 'Practice classifying 10 interventions (from news articles) into which principle(s) they serve.', 'Solve Worked Example 3 again, focusing on the opportunity cost of chemical vs bio-inputs over a 10-year horizon.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_001', difficulty: 'standard',
          question: 'Environment is the total planetary inheritance comprising the totality of all.',
          hint: 'Revisit Class 9 "Scarcity" (c9_eco_ch1_1) and "Factors of Production: Land".',
          misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.',
          parts: [
                { id: 'a', prompt: 'Analyze the following two scenarios and identify which violates carrying capacity and which violates absorptive capacity.', answer: 'Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >',
                  options: ['Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >', 'pollution', 'renewable resources are unlimited and can never be exhausted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.' }
          ],
            remediations: { 'renewable-resources-are-unlimited-and': { steps: ['If a student holds this misconception, conduct a 3-step remediation: 1.', '**Data confrontation**: Show Punjab groundwater data (extraction 35 BCM, recharge 21 BCM, water table falling 0.5–1.', 'Ask: "Is this renewable in practice?" Calculate years to depletion at current rates (use aquifer volume estimates from.', '**Graphical analysis**: Draw regeneration curve (concave, max at MSY) and extraction line.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The opportunity cost of negative environmental impacts is low for a developing country like India because environmental protection.', answer: 'Correct evaluation: The statement is **false**',
                  options: ['Correct evaluation: The statement is **false**', 'growth first, environment later', 'renewable resources are unlimited and can never be exhausted', 'the environment can assimilate any waste if given enough time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.' },
                { id: 'b', prompt: 'Analyze the following two scenarios and identify which violates carrying capacity and which violates absorptive capacity.', answer: 'Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >',
                  options: ['Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >', 'pollution', 'renewable resources are unlimited and can never be exhausted', 'the environment can assimilate any waste if given enough time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.' }
          ],
            remediations: { 'renewable-resources-are-unlimited-and': { steps: ['If a student holds this misconception, conduct a 3-step remediation: 1.', '**Data confrontation**: Show Punjab groundwater data (extraction 35 BCM, recharge 21 BCM, water table falling 0.5–1.', 'Ask: "Is this renewable in practice?" Calculate years to depletion at current rates (use aquifer volume estimates from.', '**Graphical analysis**: Draw regeneration curve (concave, max at MSY) and extraction line.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_003', difficulty: 'standard',
          question: 'Water resources in the Indian economic context refer to the stock and flow of.',
          hint: 'Revisit c11_eco_cbse_07_001, specifically the paragraph: "The environment is able to.',
          misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT textbook, what percentage of water in India is polluted, and which two functions of the environment fail when this occurs?', answer: '70% of water in India is polluted',
                  options: ['70% of water in India is polluted', '50% polluted', 'life sustenance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources:.' },
                { id: 'b', prompt: 'The textbook states: "Water has become an economic commodity." Explain why this statement is economically precise, using the concepts of scarcity, rivalry, and.', answer: 'Water became an economic commodity',
                  options: ['Water became an economic commodity', 'water was always an economic good', 'government made it a commodity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources:.' },
                { id: 'c', prompt: 'The CPCB monitors 125 rivers. In a hypothetical stretch, BOD = 8 mg/L, DO = 2 mg/L, and total coliform = 50,000 MPN/100ml.', answer: 'Classification: Polluted (BOD > 3 mg/L and DO < 4 mg/L both violated)',
                  options: ['Classification: Polluted (BOD > 3 mg/L and DO < 4 mg/L both violated)', 'it\'s under my land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources:.' }
          ],
            remediations: { 'groundwater-is-a-private-property': { steps: ['Re-read NCERT Section 7.3 paragraphs on "management of fresh water" and "seventy per cent of water in India is.', 'Draw a 2×2 matrix: rows = surface/groundwater; columns = point-source/non-point-source pollution.', 'Solve this numerical: A village has 100 ha, annual recharge = 300 mm, 50 tubewells each extracting 2,000 m³/year.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are.',
          parts: [
                { id: 'a', prompt: 'Design a 3-step water accounting framework for a 500-ha canal command area in Maharashtra that tracks: (1) surface water delivery, (2) groundwater extraction,.', answer: 'Step 1: Surface delivery',
                  options: ['Step 1: Surface delivery', 'it\'s under my land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe groundwater is a private property resource because "it\'s under my land," ignoring that aquifers are common-pool resources:.' }
          ],
            remediations: { 'groundwater-is-a-private-property': { steps: ['Re-read NCERT Section 7.3 paragraphs on "management of fresh water" and "seventy per cent of water in India is.', 'Draw a 2×2 matrix: rows = surface/groundwater; columns = point-source/non-point-source pollution.', 'Solve this numerical: A village has 100 ha, annual recharge = 300 mm, 50 tubewells each extracting 2,000 m³/year.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
