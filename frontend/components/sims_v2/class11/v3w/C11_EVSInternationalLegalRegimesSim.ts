import type { SimDef } from '../../engine/types';
import C11_EVSInternationalLegalRegimesSim from '../../../simulations/c6_12/C11_EVSInternationalLegalRegimesSim';

/** v3 wrapped master — C11_EVSInternationalLegalRegimesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_evsinternationallegalregimessim: SimDef = {
    id: 'v3w_c11_evsinternationallegalregimessim',
    title: 'International Legal Regimes',
    subtitle: 'This node covers the legal distinction, declaration criteria, management objectives, and.',
    classLevel: 11, subject: 'evs', topic: 'National Parks and Wildlife Sanctuaries: Distinction and Examples',
    chapters: [],
    nodeIds: ['c11_geo_cbse_15_005', 'c11_geo_cbse_15_008', 'c11_geo_cbse_19_008', 'c11_geo_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at the boundary of Jim Corbett National Park in Uttarakhand and then travel to the.', goal: 'Master International Legal Regimes.' },
    discovery: {
        question: 'On an outline map of India, you see a protected area in the Sundarbans delta marked as a National Park and another in the same region marked as a Wildlife.',
        options: ['Step 1: Identify the conservation objective', 'the Sanctuary was created first', 'the National Park is for tourists'],
        answer: 'Step 1: Identify the conservation objective',
        hook: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or.',
    },
    teaching: [
        { title: 'A National Park is a strictly protected area.', text: 'A National Park is a strictly protected area declared under Section 35 of the Wildlife Protection Act, 1972, where no human activity (including grazing, collection of forest produce, or habitation).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_15_005', title: 'A National Park is a strictly protected.',
          scaffold: { problem: 'A state government proposes to notify a 300 km² area in the Western Ghats as a National Park.',
            steps: [
            { text: 'Identify the key constraint — the area has *seasonal* human use (grazing, NTFP collection) but no *permanent*.' },
            { text: 'Recall Section 35 (National Park) — prohibits *all* grazing and forest produce collection; no rights allowed.' },
            { text: 'Recall Section 29 (Sanctuary) — permits regulated grazing and collection of minor forest produce by bona fide local.' },
            { text: 'Evaluate ecological need — Western Ghats is a biodiversity hotspot; the area may be a critical corridor for.' },
            { text: 'Evaluate social feasibility — Evicting seasonal users may violate Forest Rights Act, 2006 (community forest resource.' },
            { text: 'Synthesize — Recommend a **Wildlife Sanctuary with a Core Zone** (managed as inviolate under Section 33 management.', faded: true, blankAnswer: 'Recommend Wildlife Sanctuary with a zoned management plan.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_15_008', title: 'The Wildlife Protection Act (1972) is.',
          scaffold: { problem: 'A state government proposes to denotify 50 sq km of a Wildlife Sanctuary for a highway project.',
            steps: [
            { text: 'Identify the legal provision — Section 26A of WPA 1972 states no alteration of boundaries of a sanctuary except on.' },
            { text: 'Recall the 2002 amendment — made NBWL recommendation mandatory for any de-notification or diversion of sanctuary/NP.' },
            { text: 'Apply to scenario — 50 sq km diversion requires: (a) State Board for Wildlife (SBWL) recommendation, (b) NBWL standing.' },
            { text: 'Analyse the hierarchy — SBWL advises state government; NBWL advises central government; both must concur.' },
            { text: 'Interpret geographically — This legal hurdle ensures ecological connectivity is assessed at national level, not just.', faded: true, blankAnswer: 'The diversion requires SBWL recommendation → NBWL standing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_19_008', title: 'Conservation of mineral and energy.',
          scaffold: { problem: 'India\'s steel sector aims to increase scrap-based production from 15% to 30% by 2030 (National Steel Policy).',
            steps: [
            { text: 'Target scrap-based steel = 30% × 125 Mt = 37.5 Mt/yr. Current = 18.75 Mt/yr. Additional scrap-based steel = 18.75 Mt/yr.' },
            { text: 'Additional scrap required = 18.75 Mt steel × 1.1 t scrap/t steel = 20.625 Mt/yr scrap.' },
            { text: 'Iron ore conserved = 18.75 Mt steel × 1.6 t ore/t steel = 30 Mt/yr iron ore (avoided mining).' },
            { text: 'Emission reduction = 18.75 Mt × (2.2 - 0.6) tCO2/t = 18.75 × 1.6 = 30 Mt CO2/yr.' },
            { text: 'Verify: Scrap availability? India generates ~25 Mt/yr ferrous scrap, imports 7 Mt/yr.', faded: true, blankAnswer: '(a) 20.625 Mt/yr additional scrap, (b) 30 Mt/yr iron ore.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_009', title: 'The drainage system of India comprises.',
          scaffold: { problem: 'A student observes that the river Brahmaputra is called Tsangpo in Tibet, makes a hairpin turn at Namcha Barwa, and enters Arunachal.',
            steps: [
            { text: 'Identify the river\'s Tibetan name (Tsangpo) and its eastward flow parallel to the Himalayas before the turn.' },
            { text: 'Recall the definition of antecedent drainage: a river that maintains its original course while the land uplifts beneath.' },
            { text: 'Apply to the Himalayas: the Tsangpo flowed on the Tethys sedimentary basin before the Himalayan uplift began (~50 Ma).' },
            { text: 'As the Indian plate collided, the Himalayas rose, but the river\'s erosional power (high gradient, glacial melt) matched.' },
            { text: 'Verify: the gorge depth and the river\'s transverse course across the structural grain confirm antecedent origin.', faded: true, blankAnswer: 'The Brahmaputra is an antecedent river that maintained its.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_15_008', title: 'Identify each idea',
          dissect: { specimen: 'International Legal Regimes', spots: [
            { id: 's1', label: 'A National Park is a', prompt: 'Which idea is this? — A National Park is a strictly protected area declared under Section 35 of the Wildlife.', answer: 'A National Park is a', options: ['A National Park is a', 'The Wildlife Protection Act 1972', 'Conservation of mineral and energy', 'The drainage system of India'] },
            { id: 's2', label: 'The Wildlife Protection Act 1972', prompt: 'Which idea is this? — The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a.', answer: 'The Wildlife Protection Act 1972', options: ['The Wildlife Protection Act 1972', 'A National Park is a', 'Conservation of mineral and energy', 'The drainage system of India'] },
            { id: 's3', label: 'Conservation of mineral and energy', prompt: 'Which idea is this? — Conservation of mineral and energy resources refers to the systematic management,.', answer: 'Conservation of mineral and energy', options: ['Conservation of mineral and energy', 'A National Park is a', 'The Wildlife Protection Act 1972', 'The drainage system of India'] },
            { id: 's4', label: 'The drainage system of India', prompt: 'Which idea is this? — The drainage system of India comprises two distinct river regimes: Himalayan rivers.', answer: 'The drainage system of India', options: ['The drainage system of India', 'A National Park is a', 'The Wildlife Protection Act 1972', 'Conservation of mineral and energy'] }
          ] } }
    ],
    explore: { component: C11_EVSInternationalLegalRegimesSim, prompt: 'Explore the interactive — International Legal Regimes' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_005', difficulty: 'standard',
          question: 'A National Park is a strictly protected area declared under Section 35 of the.',
          hint: 'If stuck, review Class 10 Geography Chapter 2 \'Forest and Wildlife Resources\',.',
          misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, you see a protected area in the Sundarbans delta marked as a National Park and another in the same region marked as a Wildlife.', answer: 'Step 1: Identify the conservation objective',
                  options: ['Step 1: Identify the conservation objective', 'the Sanctuary was created first', 'the National Park is for tourists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or *size*, and that both.' }
          ],
            remediations: { 'the-only-difference-between-a': { steps: ['If the student holds this misconception: (1) Have them create a two-column comparison table using the exact Sections of.', 'Bund Baretha* case study (both in Bharatpur, Rajasthan) to contrast real-world management: Keoladeo (National Park).', '(3) Assign a map exercise: On a map of Madhya Pradesh, identify Kanha National Park and Phen Wildlife Sanctuary;.', 'This grounds the legal distinction in observable geography.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Upgrading all Wildlife Sanctuaries to National Parks would automatically improve biodiversity conservation in India."', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'paper park'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the only difference between a National Park and a Wildlife Sanctuary is the *name* or *size*, and that both.' }
          ],
            remediations: { 'the-only-difference-between-a': { steps: ['If the student holds this misconception: (1) Have them create a two-column comparison table using the exact Sections of.', 'Bund Baretha* case study (both in Bharatpur, Rajasthan) to contrast real-world management: Keoladeo (National Park).', '(3) Assign a map exercise: On a map of Madhya Pradesh, identify Kanha National Park and Phen Wildlife Sanctuary;.', 'This grounds the legal distinction in observable geography.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_15_008', difficulty: 'standard',
          question: 'The Wildlife Protection Act (1972) is an Indian parliamentary legislation that.',
          hint: 'Review node c11_geo_cbse_15_005 (National Parks and Wildlife Sanctuaries: Distinction).',
          misconception: 'Students think \'Project Tiger\' and \'Wildlife Protection Act\' are the same thing, or that the Act only protects animals.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a',
                  options: ['The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a', 'A National Park is a strictly protected area declared under Section 35 of the Wildlife', 'Conservation of mineral and energy resources refers to the systematic management,', 'The drainage system of India comprises two distinct river regimes: Himalayan rivers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think \'Project Tiger\' and \'Wildlife Protection Act\' are the same thing, or that the Act only protects animals.' }
          ],
            remediations: { 'project-tiger-and-wildlife-protection': { steps: ['Make a two-column table: Column A = Legal Instrument (WPA 1972, 2006 Amendment, NTCA), Column B = Conservation Scheme.', 'Create a schedule chart with one animal and one plant example per schedule (I–VI).', 'Re-read Section 38V (Tiger Reserve notification) and Section 38U (NTCA functions) from the Act summary in textbook.', 'Practice writing a 150-word answer: "How does the Wildlife Protection Act provide the legal backbone for Project.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_008', difficulty: 'standard',
          question: 'Conservation of mineral and energy resources refers to the systematic.',
          hint: 'If stuck, revisit c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_008.',
          misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.',
          parts: [
                { id: 'a', prompt: 'A thermal power plant in Tamil Nadu currently burns 5 million tonnes/year of imported coal (GCV 6200 kcal/kg, ash 10%).', answer: 'Step 1: Energy required = 5 Mt × 6200 = 31,000 million kcal/year',
                  options: ['Step 1: Energy required = 5 Mt × 6200 = 31,000 million kcal/year', 'import substitution', 'conservation = reducing consumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' },
                { id: 'b', prompt: 'Compare the conservation effectiveness of: (a) increasing aluminium recycling rate from 30% to 60% in India, versus (b) substituting copper with aluminium in.', answer: 'increasing aluminium recycling rate from 30% to 60% in India, versus (',
                  options: ['increasing aluminium recycling rate from 30% to 60% in India, versus (', 'conservation = reducing consumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' }
          ],
            remediations: { 'conservation-reducing-consumption-and-equate': { steps: ['Revisit Class 10 node c10_geo_cbse_05_008 — list the 6 conservation methods taught there.', 'For each method, ask "At which stage of the resource lifecycle does this act?" (exploration → extraction → processing →.', 'Map Indian examples to each stage: exploration (National Mineral Exploration Trust), extraction (coal washing,.', 'Identify the missing stage — "design for recycling" (upstream) — and research India\'s Resource Efficiency Policy (NITI.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "India\'s National Mineral Policy 2019 and Mines and Minerals (Development and Regulation) Amendment Act 2021 adequately address mineral.', answer: 'The statement is partially valid but incomplete',
                  options: ['The statement is partially valid but incomplete', 'governance reform', 'physical conservation outcomes', 'conservation = reducing consumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' },
                { id: 'b', prompt: 'Compare the conservation effectiveness of: (a) increasing aluminium recycling rate from 30% to 60% in India, versus (b) substituting copper with aluminium in.', answer: 'increasing aluminium recycling rate from 30% to 60% in India, versus (',
                  options: ['increasing aluminium recycling rate from 30% to 60% in India, versus (', 'conservation = reducing consumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' }
          ],
            remediations: { 'conservation-reducing-consumption-and-equate': { steps: ['Revisit Class 10 node c10_geo_cbse_05_008 — list the 6 conservation methods taught there.', 'For each method, ask "At which stage of the resource lifecycle does this act?" (exploration → extraction → processing →.', 'Map Indian examples to each stage: exploration (National Mineral Exploration Trust), extraction (coal washing,.', 'Identify the missing stage — "design for recycling" (upstream) — and research India\'s Resource Efficiency Policy (NITI.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_009', difficulty: 'standard',
          question: 'The drainage system of India comprises two distinct river regimes: Himalayan.',
          hint: 'Review Class 9 "Drainage Patterns" (c9_geo_ch1_8) and Class 11 "Himalayan Mountains".',
          misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The drainage system of India comprises two distinct river regimes: Himalayan rivers',
                  options: ['The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'A National Park is a strictly protected area declared under Section 35 of the Wildlife', 'The Wildlife Protection Act (1972) is an Indian parliamentary legislation that provides a', 'Conservation of mineral and energy resources refers to the systematic management,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly classify them as.' }
          ],
            remediations: { 'the-narmada-and-tapi-are': { steps: ['On a tectonic map of India, locate the Narmada-Son lineament and the Satpura range.', 'Trace the Narmada from Amarkantak to the Gulf of Khambhat; note it flows through a graben (rift valley) bounded by.', 'Compare with the Indus which flows through a suture zone (Indus-Tsangpo suture) in the Himalayas.', 'List regime data: Narmada discharge drops to <10 m³/s in summer; Indus remains >500 m³/s.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
