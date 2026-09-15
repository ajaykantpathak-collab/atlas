import type { SimDef } from '../../engine/types';
import C11_EconomicsAyurvedaHealthSim from '../../../simulations/c6_12/C11_EconomicsAyurvedaHealthSim';

/** v3 wrapped master — C11_EconomicsAyurvedaHealthSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsayurvedahealthsim: SimDef = {
    id: 'v3w_c11_economicsayurvedahealthsim',
    title: 'Ayurveda Health',
    subtitle: 'Covers major Central and State-level policies explicitly mentioned in NCERT Class 11.',
    classLevel: 11, subject: 'economics', topic: 'Sustainable Development in India: Policies and Programmes',
    chapters: [],
    nodeIds: ['c11_eco_cbse_07_010', 'c11_eco_cbse_07_003', 'c11_eco_cbse_07_004', 'c11_eco_cbse_07_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a policy advisor in 1998 Delhi, where the Supreme Court has just mandated conversion of all.', goal: 'Master Ayurveda Health.' },
    discovery: {
        question: 'Name the three specific clean fuel programmes for rural and urban households mentioned in the NCERT Class 11 textbook as strategies for sustainable development.',
        options: ['The three programmes are: (1) Subsidised LPG for rural households to replace', 'electric vehicles', 'hydrogen fuel'],
        answer: 'The three programmes are: (1) Subsidised LPG for rural households to replace',
        hook: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees,.',
    },
    teaching: [
        { title: 'Sustainable Development Policies and.', text: 'Sustainable Development Policies and Programmes in India refer to the specific government interventions, regulatory frameworks, and promotional schemes designed to achieve the Brundtland goal of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_010', title: 'Sustainable Development Policies and.',
          scaffold: { problem: 'The Government of India launches a subsidised LPG programme for 10 million rural BPL households currently using fuelwood.',
            steps: [
            { text: 'Calculate useful energy from fuelwood: 12 kg × 15 MJ/kg × 10% efficiency = 18 MJ/day.' },
            { text: 'Calculate LPG required for same useful energy: Let x kg LPG. x × 46 MJ/kg × 60% = 18 MJ → x = 18 / (46 × 0.6) = 0.652.' },
            { text: 'Fuelwood saved per household = 12 kg/day. Annual saving per household = 12 × 365 = 4,380 kg = 4.38 tonnes.' },
            { text: 'Total annual saving for 10 million households = 4.38 × 10^7 tonnes = 43.8 million tonnes.' },
            { text: 'Pre-programme extraction per household: 12 kg/day × 365 = 4.38 tonnes/year from 2 ha → 2.19 tonnes/ha/year.' },
            { text: 'But aggregate extraction: 10 million × 4.38 tonnes = 43.8 million tonnes/year.', faded: true, blankAnswer: '(a) Fuelwood: 18 MJ/day; LPG equivalent: 0.652 kg/day. (b).' }
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
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_004', title: 'Air pollution refers to the.',
          scaffold: { problem: 'A CPCB monitoring station in Delhi records 24-hour average concentrations: PM2.5 = 180 µg/m³, PM10 = 320 µg/m³, NO2 = 95 µg/m³, SO2 = 45.',
            steps: [
            { text: 'Identify the concentration bracket for each pollutant. PM2.5=180 → Very Poor bracket (121-250).' },
            { text: 'Calculate sub-index for PM2.5 using linear interpolation formula. I_HI=400, I_LO=301, C_HI=250, C_LO=121, C_p=180.' },
            { text: 'Calculate sub-index for PM10. Bracket: Poor (251-350 → 201-300). I_HI=300, I_LO=201, C_HI=350, C_LO=251, C_p=320.' },
            { text: 'Calculate sub-index for NO2. Bracket: Moderate (81-180 → 101-200). I_HI=200, I_LO=101, C_HI=180, C_LO=81, C_p=95.' },
            { text: 'Compare all sub-indices: PM2.5=346, PM10=270, NO2=115, others <100. Maximum is 346 (PM2.5).' },
            { text: 'Overall AQI = 346 → "Very Poor" category. Critical pollutant = PM2.5.', faded: true, blankAnswer: 'AQI = 346 (Very Poor); Critical pollutant = PM2.5' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_007', title: 'Environmental degradation refers to the.',
          scaffold: { problem: 'A thermal power plant in Singrauli (MP) emits 120 tonnes/day of SO2 and 80 tonnes/day of PM2.5. The affected airshed has 2 lakh population.',
            steps: [
            { text: 'Identify the concentration-response coefficients: ΔPM2.5 = 35 μg/m³ → 3.5 increments of 10 μg/m³.' },
            { text: 'Calculate attributable cases: Excess deaths/day = 8 × 2.1% = 0.168 deaths/day.' },
            { text: 'Annualise: Excess deaths/year = 0.168 × 365 = 61.32 ≈ 61 deaths.' },
            { text: 'Monetise mortality: 61 deaths × ₹5 crore/VSL = ₹305 crore/year.' },
            { text: 'Monetise morbidity: 230 admissions × ₹25,000 = ₹57.5 lakh/year.' },
            { text: 'Total annual health cost = ₹305 crore + ₹0.575 crore = ₹305.575 crore ≈ ₹306 crore/year.', faded: true, blankAnswer: '₹306 crore per year (mortality: ₹305 crore, morbidity:.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_07_003', title: 'Identify each idea',
          dissect: { specimen: 'Ayurveda Health', spots: [
            { id: 's1', label: 'Sustainable Development Policies and Programmes', prompt: 'Which idea is this? — Sustainable Development Policies and Programmes in India refer to the specific government.', answer: 'Sustainable Development Policies and Programmes', options: ['Sustainable Development Policies and Programmes', 'Water resources in the Indian', 'Air pollution refers to the', 'Environmental degradation refers to the'] },
            { id: 's2', label: 'Water resources in the Indian', prompt: 'Which idea is this? — Water resources in the Indian economic context refer to the stock and flow of freshwater.', answer: 'Water resources in the Indian', options: ['Water resources in the Indian', 'Sustainable Development Policies and Programmes', 'Air pollution refers to the', 'Environmental degradation refers to the'] },
            { id: 's3', label: 'Air pollution refers to the', prompt: 'Which idea is this? — Air pollution refers to the contamination of the atmosphere by harmful substances —.', answer: 'Air pollution refers to the', options: ['Air pollution refers to the', 'Sustainable Development Policies and Programmes', 'Water resources in the Indian', 'Environmental degradation refers to the'] },
            { id: 's4', label: 'Environmental degradation refers to the', prompt: 'Which idea is this? — Environmental degradation refers to the deterioration of environmental quality through.', answer: 'Environmental degradation refers to the', options: ['Environmental degradation refers to the', 'Sustainable Development Policies and Programmes', 'Water resources in the Indian', 'Air pollution refers to the'] }
          ] } }
    ],
    explore: { component: C11_EconomicsAyurvedaHealthSim, prompt: 'Explore the interactive — Ayurveda Health' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_010', difficulty: 'standard',
          question: 'Sustainable Development Policies and Programmes in India refer to the specific.',
          hint: 'Revisit c11_eco_cbse_07_001 (Functions of Environment) and c11_eco_cbse_07_007 (Effects.',
          misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees,.',
          parts: [
                { id: 'a', prompt: 'Name the three specific clean fuel programmes for rural and urban households mentioned in the NCERT Class 11 textbook as strategies for sustainable development.', answer: 'The three programmes are: (1) Subsidised LPG for rural households to replace',
                  options: ['The three programmes are: (1) Subsidised LPG for rural households to replace', 'electric vehicles', 'hydrogen fuel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' },
                { id: 'b', prompt: 'Explain why the Central Pollution Control Board (CPCB) was established in 1974 and why state-level boards followed, using the concept of "absorptive capacity.', answer: 'The CPCB was established',
                  options: ['The CPCB was established', 'pollution control', 'sustainable development policies in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' },
                { id: 'c', prompt: 'A village of 500 households currently uses fuelwood for cooking. Each household collects 15 kg/day from nearby forests.', answer: 'Step 1: Total extraction = 500 households × 15 kg = 7,500 kg/day',
                  options: ['Step 1: Total extraction = 500 households × 15 kg = 7,500 kg/day', 'sustainable development policies in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' }
          ],
            remediations: { 'sustainable-development-policies-in-india': { steps: ['Revisit c11_eco_cbse_07_007 (Effects on Health and Economy) and calculate the health cost of air pollution: if 70%.', 'Take one NCERT policy (e.g., Gobar gas plant). Identify the market failure: dung cake burning causes indoor air.', 'Write a 100-word explanation using terms: externality, absorptive capacity, private vs social cost, incentive alignment.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The shift from chemical fertilisers to biocomposting and from chemical pesticides to neem-based biopest control represents a win-win.', answer: 'The statement is false',
                  options: ['The statement is false', 'sustainable development policies in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sustainable development policies in India" are only about environmental protection (planting trees, banning plastic).' }
          ],
            remediations: { 'sustainable-development-policies-in-india': { steps: ['Revisit c11_eco_cbse_07_007 (Effects on Health and Economy) and calculate the health cost of air pollution: if 70%.', 'Take one NCERT policy (e.g., Gobar gas plant). Identify the market failure: dung cake burning causes indoor air.', 'Write a 100-word explanation using terms: externality, absorptive capacity, private vs social cost, incentive alignment.'] } } },
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
            remediations: { 'groundwater-is-a-private-property': { steps: ['Re-read NCERT Section 7.3 paragraphs on "management of fresh water" and "seventy per cent of water in India is.', 'Draw a 2×2 matrix: rows = surface/groundwater; columns = point-source/non-point-source pollution.', 'Solve this numerical: A village has 100 ha, annual recharge = 300 mm, 50 tubewells each extracting 2,000 m³/year.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_004', difficulty: 'standard',
          question: 'Air pollution refers to the contamination of the atmosphere by harmful.',
          hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the.',
          misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November.',
          parts: [
                { id: 'a', prompt: 'In 2022, India had 35 crore registered vehicles, of which 85% were two-wheelers and cars.', answer: 'Step 1: Total vehicles = 35 crore = 350 million',
                  options: ['Step 1: Total vehicles = 35 crore = 350 million', 'air pollution is only a winter problem in North India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November smog.' }
          ],
            remediations: { 'air-pollution-is-only-a': { steps: ['Pull up CPCB\'s "National Air Quality Monitoring Programme (NAMP) data" for any 5 non-Delhi cities (e.g., Kanpur,.', 'Identify months where PM2.5 > 60 µg/m³ (moderate) — students will see exceedances in summer/monsoon too.', 'Cross-reference with SAFAR/IMD bulletins for O3 exceedance days in April-June.', 'Re-read NCERT Box 7.4 (Pollution Control Boards) and NCAP framework to understand that 102 non-attainment cities have.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Switching Delhi\'s public transport to CNG solved the city\'s air pollution problem." Use data trends (PM2.5 levels pre-2002 vs.', answer: 'The statement is false',
                  options: ['The statement is false', 'air pollution is only a winter problem in North India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "air pollution is only a winter problem in North India" because media highlights Delhi\'s November smog.' }
          ],
            remediations: { 'air-pollution-is-only-a': { steps: ['Pull up CPCB\'s "National Air Quality Monitoring Programme (NAMP) data" for any 5 non-Delhi cities (e.g., Kanpur,.', 'Identify months where PM2.5 > 60 µg/m³ (moderate) — students will see exceedances in summer/monsoon too.', 'Cross-reference with SAFAR/IMD bulletins for O3 exceedance days in April-June.', 'Re-read NCERT Box 7.4 (Pollution Control Boards) and NCAP framework to understand that 102 non-attainment cities have.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'standard',
          question: 'Environmental degradation refers to the deterioration of environmental quality.',
          hint: 'If stuck, revisit c11_eco_cbse_07_001 (environment functions) and c11_eco_cbse_07_005.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT states "70% of water in India is polluted" leads to "increased incidence of water-borne diseases" AND "rising health expenditure" — trace.', answer: 'Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate',
                  options: ['Pollutants (industrial effluents, sewage, agricultural runoff) → contaminate', 'diseases increase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The opportunity cost of environmental degradation is zero for a poor household that relies on firewood for cooking because they have.', answer: 'The statement is false',
                  options: ['The statement is false', 'no monetary payment', 'zero opportunity cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe environmental health costs are ONLY direct medical expenses (hospital bills, medicines).' }
          ],
            remediations: { 'environmental-health-costs-are-only': { steps: ['Re-read NCERT Box 7.1 (Global Warming) and Box 7.2 (Ozone Depletion) — list every health outcome mentioned (skin.', 'For each outcome, ask: "What does this cost the individual? The household? The government?', 'Use the "Work These Out" table in NCERT (p.117) — fill in Air/Water/Noise pollution diseases, then assign a cost type.', 'Calculate the total cost of YOUR household\'s averting expenditure last month (RO water, masks, medicines for.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
