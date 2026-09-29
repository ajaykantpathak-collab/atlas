import type { SimDef } from '../../engine/types';
import C11_EconomicsIndianArtArchitectureSim from '../../../simulations/c6_12/C11_EconomicsIndianArtArchitectureSim';

/** v3 wrapped master — C11_EconomicsIndianArtArchitectureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsindianartarchitecturesim: SimDef = {
    id: 'v3w_c11_economicsindianartarchitecturesim',
    title: 'Quality of Employment: Wages, Working Conditions and Social Security',
    subtitle: 'Covers wage determination mechanisms (minimum wages, fair wages, living wages), working.',
    classLevel: 11, subject: 'economics', topic: 'Quality of Employment: Wages, Working Conditions and Social Security',
    chapters: [],
    nodeIds: ['c11_eco_cbse_06_011', 'c11_eco_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a 28-year-old delivery partner for a food aggregator platform in Bengaluru — he works 12-hour shifts,.', goal: 'Master Quality of Employment: Wages, Working Conditions and Social Security.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Quality of employment refers to the.', text: 'Quality of employment refers to the multidimensional assessment of a job beyond mere employment status, encompassing adequacy of wages (real wages adjusted for inflation and purchasing power),.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_011', title: 'Quality of employment refers to the.',
          scaffold: { problem: 'Using PLFS 2022-23 data, the average monthly earnings (nominal) for regular salaried workers in urban India is ₹18,500.',
            steps: [
            { text: 'Identify given data — NW_2023 = ₹18,500, CPI_2023 = 175, NW_2012 = ₹12,000, CPI_2012 = 130, base year = 2012' },
            { text: 'Apply real wage formula for 2022-23: RW_2023 = (18500 / 175) × 100 = ₹10,571.43 (2012 prices)' },
            { text: 'Apply real wage formula for 2011-12: RW_2012 = (12000 / 130) × 100 = ₹9,230.77 (2012 prices)' },
            { text: 'Compare: Real wage increased from ₹9,230.77 to ₹10,571.43 — absolute gain = ₹1,340.66' },
            { text: 'Calculate CAGR: (10571.43 / 9230.77)^(1/11) - 1 = (1.1452)^(0.0909) - 1 = 1.0124 - 1 = 0.0124 = 1.24% per annum', faded: true, blankAnswer: 'Real wage 2022-23 = ₹10,571.43 (2012 prices); Real wage.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_07_011', title: 'Global environmental issues refer to.',
          scaffold: { problem: 'India\'s 2005 emission intensity was 0.35 kg CO2/₹ (2011-12 series).',
            steps: [
            { text: 'Compute 2022-23 emission intensity = Total emissions / Real GDP = 2.9 Gt CO2e / ₹160.7 lakh crore.' },
            { text: 'Compute 2005 base intensity in same units: 0.35 kg CO2/₹ = 350 g CO2/₹.' },
            { text: 'Compare current (18.04 g) vs target (192.5 g) — current intensity is ALREADY far below target.' },
            { text: 'Recalculate with consistent series. Assume 2005 intensity = 35 g/₹ (more plausible). Target = 35 × 0.55 = 19.25 g/₹.' },
            { text: 'Project 2030 GDP = 160.7 × (1.065)^7 = 160.7 × 1.554 = ₹249.7 lakh crore.' },
            { text: 'Required annual intensity improvement rate from 2023-2030: (18.04/19.25)^(1/7) - 1 = -0.9% per year (i.e., intensity.', faded: true, blankAnswer: '(a) 18.04 g CO2/₹ (using 2011-12 series); (b) Already.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_07_011', title: 'Identify each idea',
          dissect: { specimen: 'Quality of Employment: Wages, Working Conditions and Social Security', spots: [
            { id: 's1', label: 'Quality of employment refers to', prompt: 'Which idea is this? — Quality of employment refers to the multidimensional assessment of a job beyond mere.', answer: 'Quality of employment refers to', options: ['Quality of employment refers to', 'Global environmental issues refer to'] },
            { id: 's2', label: 'Global environmental issues refer to', prompt: 'Which idea is this? — Global environmental issues refer to planetary-scale ecological disruptions—primarily.', answer: 'Global environmental issues refer to', options: ['Global environmental issues refer to', 'Quality of employment refers to'] }
          ] } }
    ],
    explore: { component: C11_EconomicsIndianArtArchitectureSim, prompt: 'Explore the interactive — Quality of Employment: Wages, Working Conditions and Social Security' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_011', difficulty: 'standard',
          question: 'Quality of employment refers to the multidimensional assessment of a job beyond.',
          hint: 'If stuck, revisit c11_eco_cbse_06_004 (casualisation trends) and c10_math_cbse_13_005.',
          misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.',
          parts: [
                { id: 'a', prompt: 'Define \'real wage\' and explain how it differs from \'nominal wage\' in the context of assessing employment quality.', answer: 'Real wage = Nominal wage / Consumer Price Index (CPI) × 100 (base year)',
                  options: ['Real wage = Nominal wage / Consumer Price Index (CPI) × 100 (base year)', 'real wage is just wage after tax'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.' },
                { id: 'b', prompt: 'A construction worker in Delhi earned ₹400/day in 2018-19 and ₹500/day in 2023-24. The CPI (base 2012=100) was 140 in 2018-19 and 180 in 2023-24.', answer: 'Step 1: Real wage 2018-19 = (400/140)×100 = ₹285.71 (2012 prices)',
                  options: ['Step 1: Real wage 2018-19 = (400/140)×100 = ₹285.71 (2012 prices)', 'real wage increased'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.' }
          ],
            remediations: { 'students-equate-employment-generation-with': { steps: ['Revisit the three-pillar framework (wages, conditions, social security) using the delivery partner vs bank clerk.', 'Calculate real wages for MGNREGA (₹250/day × 26 days = ₹6,500/mo) vs state minimum wage for unskilled (e.g., Delhi.', 'Map each pillar to statutory entitlements: Minimum Wages Act (wages), Factories Act/Shops Act (conditions), EPF/ESI.', 'Apply to gig work case study — identify which Acts apply and which don\'t.', 'Practice with PLFS unit-level data (download from MOSPI) to compute % workers with any social security by status.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The rise of platform/gig work (Swiggy, Uber, Urban Company) has improved employment quality for urban youth by creating flexible,.', answer: 'Assessment: Largely FALSE for employment quality',
                  options: ['Assessment: Largely FALSE for employment quality', 'it\'s good because they earn more than unemployment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.' }
          ],
            remediations: { 'students-equate-employment-generation-with': { steps: ['Revisit the three-pillar framework (wages, conditions, social security) using the delivery partner vs bank clerk.', 'Calculate real wages for MGNREGA (₹250/day × 26 days = ₹6,500/mo) vs state minimum wage for unskilled (e.g., Delhi.', 'Map each pillar to statutory entitlements: Minimum Wages Act (wages), Factories Act/Shops Act (conditions), EPF/ESI.', 'Apply to gig work case study — identify which Acts apply and which don\'t.', 'Practice with PLFS unit-level data (download from MOSPI) to compute % workers with any social security by status.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_011', difficulty: 'standard',
          question: 'Global environmental issues refer to planetary-scale ecological.',
          hint: 'Revisit c11_eco_cbse_07_001 "Functions of the Environment" — specifically the statement:.',
          misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").',
          parts: [
                { id: 'a', prompt: 'Analyze the following statement: "India\'s International Solar Alliance (ISA) is primarily a climate mitigation initiative." Identify two dimensions where ISA.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'we fixed ozone, we can fix climate the same way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").' }
          ],
            remediations: { 'students-conflate-global-warming-and': { steps: ['Draw two side-by-side diagrams. Left: "Greenhouse Effect" — Sun → shortwave → surface → longwave → GHGs.', 'Create a comparison table with rows: Primary human cause, Key chemicals, Atmospheric layer affected, Main environmental.', 'Calculate radiative forcing: CFC-12 = +0.17 W/m² (GHG effect) vs.', 'Read NCERT Box 7.1 and 7.2 aloud, highlighting "greenhouse gases" vs.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").',
          parts: [
                { id: 'a', prompt: 'Analyze the following statement: "India\'s International Solar Alliance (ISA) is primarily a climate mitigation initiative." Identify two dimensions where ISA.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'we fixed ozone, we can fix climate the same way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate global warming and ozone depletion as the same problem ("ozone hole causes global warming").' }
          ],
            remediations: { 'students-conflate-global-warming-and': { steps: ['Draw two side-by-side diagrams. Left: "Greenhouse Effect" — Sun → shortwave → surface → longwave → GHGs.', 'Create a comparison table with rows: Primary human cause, Key chemicals, Atmospheric layer affected, Main environmental.', 'Calculate radiative forcing: CFC-12 = +0.17 W/m² (GHG effect) vs.', 'Read NCERT Box 7.1 and 7.2 aloud, highlighting "greenhouse gases" vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
