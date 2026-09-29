import type { SimDef } from '../../engine/types';
import C11_EconomicsMeasuresDispersionDefinitionSim from '../../../simulations/c6_12/C11_EconomicsMeasuresDispersionDefinitionSim';

/** v3 wrapped master — C11_EconomicsMeasuresDispersionDefinitionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsmeasuresdispersiondefinitionsim: SimDef = {
    id: 'v3w_c11_economicsmeasuresdispersiondefinitionsim',
    title: 'State of India\'s Environment: Air Pollution and Quality',
    subtitle: 'Covers: sources and types of air pollutants in India (vehicular, industrial, thermal.',
    classLevel: 11, subject: 'economics', topic: 'State of India\'s Environment: Air Pollution and Quality',
    chapters: [],
    nodeIds: ['c11_eco_cbse_07_004', 'c11_eco_cbse_07_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at a busy Delhi intersection at 8 AM on a November morning — the air smells of.', goal: 'Master State of India\'s Environment: Air Pollution and Quality.' },
    discovery: {
        question: 'Analyze the following two scenarios and identify which violates carrying capacity and which violates absorptive capacity.',
        options: ['Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >', 'pollution', 'renewable resources are unlimited and can never be exhausted'],
        answer: 'Correct analysis: Scenario A violates **carrying capacity** (extraction 15,000 >',
        hook: 'Students often believe "renewable resources are unlimited and can never be exhausted" because they regenerate.',
    },
    teaching: [
        { title: 'Air pollution refers to the contamination of.', text: 'Air pollution refers to the contamination of the atmosphere by harmful substances — including particulate matter (PM2.5, PM10), nitrogen oxides (NOx), sulphur dioxide (SO2), carbon monoxide (CO),.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'dissect', nodeId: 'c11_eco_cbse_07_001', title: 'Identify each idea',
          dissect: { specimen: 'State of India\'s Environment: Air Pollution and Quality', spots: [
            { id: 's1', label: 'Air pollution refers to the', prompt: 'Which idea is this? — Air pollution refers to the contamination of the atmosphere by harmful substances —.', answer: 'Air pollution refers to the', options: ['Air pollution refers to the', 'Environment is the total planetary'] },
            { id: 's2', label: 'Environment is the total planetary', prompt: 'Which idea is this? — Environment is the total planetary inheritance comprising the totality of all biotic.', answer: 'Environment is the total planetary', options: ['Environment is the total planetary', 'Air pollution refers to the'] }
          ] } }
    ],
    explore: { component: C11_EconomicsMeasuresDispersionDefinitionSim, prompt: 'Explore the interactive — State of India\'s Environment: Air Pollution and Quality' },
    challenges: [
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
            remediations: { 'renewable-resources-are-unlimited-and': { steps: ['If a student holds this misconception, conduct a 3-step remediation: 1.', '**Data confrontation**: Show Punjab groundwater data (extraction 35 BCM, recharge 21 BCM, water table falling 0.5–1.', 'Ask: "Is this renewable in practice?" Calculate years to depletion at current rates (use aquifer volume estimates from.', '**Graphical analysis**: Draw regeneration curve (concave, max at MSY) and extraction line.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
