import type { SimDef } from '../../engine/types';
import C11_EconomicsPresentationDataTabularSim from '../../../simulations/c6_12/C11_EconomicsPresentationDataTabularSim';

/** v3 wrapped master — C11_EconomicsPresentationDataTabularSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicspresentationdatatabularsim: SimDef = {
    id: 'v3w_c11_economicspresentationdatatabularsim',
    title: 'Environmental Degradation: Deforestation and Biodiversity Loss',
    subtitle: 'Covers: Causes of deforestation (commercial logging, shifting cultivation, encroachment,.',
    classLevel: 11, subject: 'economics', topic: 'Environmental Degradation: Deforestation and Biodiversity Loss',
    chapters: [],
    nodeIds: ['c11_eco_cbse_07_006', 'c11_eco_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a policy analyst in Madhya Pradesh where a mining company seeks clearance to divert 500.', goal: 'Master Environmental Degradation: Deforestation and Biodiversity Loss.' },
    discovery: {
        question: 'Compare the biodiversity loss from two scenarios: (A) Clearing 1,000 hectares of contiguous primary forest for a highway, vs (B) Clearing 1,000 hectares of the.',
        options: ['Scenario B causes significantly greater biodiversity loss', 'same area cleared = same impact', 'poor people cutting trees for survival'],
        answer: 'Scenario B causes significantly greater biodiversity loss',
        hook: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".',
    },
    teaching: [
        { title: 'Deforestation is the permanent conversion of.', text: 'Deforestation is the permanent conversion of forest land to non-forest uses (agriculture, infrastructure, mining, settlements) resulting in a reduction of forest cover below the ecological threshold.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_006', title: 'Deforestation is the permanent.',
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
            { text: 'Apply precautionary principle: when irreversible loss of critical natural capital (Schedule-I habitat, watershed) is.', faded: true, blankAnswer: 'NPV of ecosystem services lost = ₹806.56 crore; NPV of mine.' }
            ] } },
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
        { type: 'dissect', nodeId: 'c11_eco_cbse_07_010', title: 'Identify each idea',
          dissect: { specimen: 'Environmental Degradation: Deforestation and Biodiversity Loss', spots: [
            { id: 's1', label: 'Deforestation is the permanent conversion', prompt: 'Which idea is this? — Deforestation is the permanent conversion of forest land to non-forest uses (agriculture,.', answer: 'Deforestation is the permanent conversion', options: ['Deforestation is the permanent conversion', 'Sustainable Development Policies and Programmes'] },
            { id: 's2', label: 'Sustainable Development Policies and Programmes', prompt: 'Which idea is this? — Sustainable Development Policies and Programmes in India refer to the specific government.', answer: 'Sustainable Development Policies and Programmes', options: ['Sustainable Development Policies and Programmes', 'Deforestation is the permanent conversion'] }
          ] } }
    ],
    explore: { component: C11_EconomicsPresentationDataTabularSim, prompt: 'Explore the interactive — Environmental Degradation: Deforestation and Biodiversity Loss' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_006', difficulty: 'standard',
          question: 'Deforestation is the permanent conversion of forest land to non-forest uses.',
          hint: 'If confused about why "planting trees" ≠ "replacing forests", revisit.',
          misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".',
          parts: [
                { id: 'a', prompt: 'Compare the biodiversity loss from two scenarios: (A) Clearing 1,000 hectares of contiguous primary forest for a highway, vs (B) Clearing 1,000 hectares of the.', answer: 'Scenario B causes significantly greater biodiversity loss',
                  options: ['Scenario B causes significantly greater biodiversity loss', 'same area cleared = same impact', 'poor people cutting trees for survival'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".' }
          ],
            remediations: { 'deforestation-and-biodiversity-loss-are': { steps: ['Revisit **c11_eco_cbse_07_005** (Causes of Environmental Degradation) — specifically the distinction between.', 'Study **Forest Survey of India (FSI) 2021 Report, Chapter 2** — note that "Recorded Forest Area" (legal status) ≠.', 'Read the **Chipko Movement case (Box 7.3 in NCERT)** and answer: "Why did commercial contractors, not villagers, cause.', 'Apply **opportunity cost framework from c9_eco_ch1_3** to a real forest diversion case (e.g., Hasdeo Arand coal mining).'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".',
          parts: [
                { id: 'a', prompt: 'Design a village-level monitoring framework using three measurable indicators that would allow a Gram Sabha to detect early signs of forest degradation.', answer: '**Indicator 1: Regeneration density**',
                  options: ['**Indicator 1: Regeneration density**', 'poor people cutting trees for survival'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".' },
                { id: 'b', prompt: 'Compare the biodiversity loss from two scenarios: (A) Clearing 1,000 hectares of contiguous primary forest for a highway, vs (B) Clearing 1,000 hectares of the.', answer: 'Scenario B causes significantly greater biodiversity loss',
                  options: ['Scenario B causes significantly greater biodiversity loss', 'same area cleared = same impact', 'poor people cutting trees for survival'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **deforestation and biodiversity loss are primarily driven by "poor people cutting trees for survival".' }
          ],
            remediations: { 'deforestation-and-biodiversity-loss-are': { steps: ['Revisit **c11_eco_cbse_07_005** (Causes of Environmental Degradation) — specifically the distinction between.', 'Study **Forest Survey of India (FSI) 2021 Report, Chapter 2** — note that "Recorded Forest Area" (legal status) ≠.', 'Read the **Chipko Movement case (Box 7.3 in NCERT)** and answer: "Why did commercial contractors, not villagers, cause.', 'Apply **opportunity cost framework from c9_eco_ch1_3** to a real forest diversion case (e.g., Hasdeo Arand coal mining).'] } } },
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
            remediations: { 'sustainable-development-policies-in-india': { steps: ['Revisit c11_eco_cbse_07_007 (Effects on Health and Economy) and calculate the health cost of air pollution: if 70%.', 'Take one NCERT policy (e.g., Gobar gas plant). Identify the market failure: dung cake burning causes indoor air.', 'Write a 100-word explanation using terms: externality, absorptive capacity, private vs social cost, incentive alignment.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
