import type { SimDef } from '../../engine/types';
import C11_GeographyRiverRegimeSim from '../../../simulations/c6_12/C11_GeographyRiverRegimeSim';

/** v3 wrapped master — C11_GeographyRiverRegimeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyriverregimesim: SimDef = {
    id: 'v3w_c11_geographyriverregimesim',
    title: 'River Regime',
    subtitle: 'Covers the Bhakra-Nangal Project\'s physical infrastructure (Bhakra Dam, Nangal Dam,.',
    classLevel: 11, subject: 'geography', topic: 'Multipurpose River Projects: Bhakra-Nangal Project',
    chapters: [],
    nodeIds: ['c11_geo_cbse_13_003', 'c11_geo_cbse_09_009', 'c11_geo_cbse_12_009', 'c11_geo_cbse_13_001', 'c11_geo_cbse_13_002', 'c11_geo_cbse_13_004', 'c11_geo_cbse_13_007', 'c11_geo_cbse_13_008', 'c11_geo_cbse_09_002', 'c11_geo_cbse_09_003', 'c11_geo_cbse_09_004', 'c11_geo_cbse_09_005', 'c11_geo_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine standing at the Bhakra Dam viewpoint in November: the Gobind Sagar stretches 90 km upstream, its.', goal: 'Master River Regime.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The Bhakra-Nangal Project is a multipurpose.', text: 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a tributary of the Indus) comprising the Bhakra Dam (226 m high gravity dam at Bhakra village, Bilaspur district,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_003', title: 'The Bhakra-Nangal Project is a.',
          scaffold: { problem: 'The Bhakra Dam has a design discharge of 5,660 m³/s through its power intakes.',
            steps: [
            { text: 'Recall the hydropower formula: P (watts) = η × ρ × g × Q × H, where η = 0.90, ρ = 1000 kg/m³, g = 9.8 m/s², Q = 5,660.' },
            { text: 'Compute P = 0.90 × 1000 × 9.8 × 5,660 × 200 = 9,985,440,000 W = 9,985 MW ≈ 10,000 MW.' },
            { text: 'Compare with actual installed capacity: 1,325 MW (Bhakra Left Bank 5×108 MW + Right Bank 5×157 MW = 1,325 MW).' },
            { text: 'Identify reasons for the gap: (a) Design discharge (5,660 m³/s) is the *maximum* flood discharge capacity of the.' },
            { text: 'Conclude that installed capacity reflects economic optimisation (capital cost vs.', faded: true, blankAnswer: 'Theoretical maximum = ~10,000 MW. Actual installed capacity.' }
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_12_009', title: 'Soil erosion is the detachment,.',
          scaffold: { problem: 'In a watershed in the Western Ghats, a 10-ha plot on a 12% slope under tea plantation shows rill erosion after monsoon.',
            steps: [
            { text: 'Identify erosion type as rill erosion (intermediate stage between sheet and gully).' },
            { text: 'Recall formula for volume of eroded soil: Volume = cross-sectional area × total length.' },
            { text: 'Calculate volume = 0.05 m² × 2000 m = 100 m³.' },
            { text: 'Convert bulk density to kg/m³: 1.2 g/cm³ = 1200 kg/m³.' },
            { text: 'Mass loss = 100 m³ × 1200 kg/m³ = 120,000 kg = 120 tonnes.' },
            { text: 'Express per hectare: 120 tonnes / 10 ha = 12 tonnes/ha.', faded: true, blankAnswer: 'Total soil loss = 120 tonnes (12 tonnes/ha). This.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_001', title: 'Surface water in India comprises water.',
          scaffold: { problem: 'A farmer in Punjab irrigates 10 hectares of rice using a tubewell. The aquifer specific yield is 0.15.',
            steps: [
            { text: 'Convert area: 10 hectares = 100,000 m². Water table decline = 0.5 m.' },
            { text: 'Recall specific yield (Sy) = volume of water released per unit area per unit decline = 0.15 (dimensionless).' },
            { text: 'Calculate extracted volume = Area × Decline × Sy = 100,000 m² × 0.5 m × 0.15 = 7,500 m³.' },
            { text: 'Calculate rainfall recharge volume = Area × Recharge depth = 100,000 m² × 0.3 m = 30,000 m³.' },
            { text: 'At plot scale, recharge (30,000 m³) > extraction (7,500 m³) — appears sustainable.', faded: true, blankAnswer: 'Extracted volume = 7,500 m³. Plot-scale balance shows.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_002', title: 'A drainage basin (or catchment) is the.',
          scaffold: { problem: 'The catchment area of the Upper Krishna sub-basin (up to Almatti Dam) is 51,000 km².',
            steps: [
            { text: 'Identify the formula: Drainage Density (D_d) = Total Stream Length (L) / Basin Area (A).' },
            { text: 'Substitute given values: L = 12,750 km, A = 51,000 km².' },
            { text: 'Compute D_d = 12,750 / 51,000 = 0.25 km/km².' },
            { text: 'Compare with typical values: Himalayan basins (0.5–1.5 km/km²), Peninsular shield basins (0.1–0.3 km/km²).' },
            { text: 'Interpret: Low drainage density indicates fewer streams per unit area → longer overland flow paths → slower flood.' },
            { text: 'Conclude: Flood forecasting models for this sub-basin must use longer time-to-peak parameters; watershed interventions.', faded: true, blankAnswer: 'Drainage density = 0.25 km/km². Implication: Slow flood.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_004', title: 'The Damodar Valley Corporation (DVC) is.',
          scaffold: { problem: 'The Damodar Valley Corporation operates four major dams with a combined live storage capacity of 1,500 MCM (Million Cubic Metres).',
            steps: [
            { text: 'Calculate total rainfall volume over basin = Rainfall depth × Basin area = 1.8 m × 22,000 × 10⁶ m² = 39,600 MCM.' },
            { text: 'Calculate total runoff volume = Rainfall volume × Runoff coefficient = 39,600 MCM × 0.45 = 17,820 MCM.' },
            { text: 'Calculate volume reaching dams in 48 hrs = Total runoff × 0.60 = 17,820 × 0.60 = 10,692 MCM.' },
            { text: 'Compare with live storage = 1,500 MCM. Percentage filled = (10,692 / 1,500) × 100 = 712.8%.' },
            { text: 'Since inflow (10,692 MCM in 48 hrs) >> live storage (1,500 MCM), spillway operation was mandatory to avoid dam.' },
            { text: 'Interpretation: DVC moderated the flood by storing 1,500 MCM (reducing downstream peak), but 9,192 MCM had to be.', faded: true, blankAnswer: '(a) 17,820 MCM, (b) 10,692 MCM, (c) 712.8% of live storage,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_09_009', title: 'Identify each idea',
          dissect: { specimen: 'River Regime', spots: [
            { id: 's1', label: 'The Bhakra-Nangal Project is a', prompt: 'Which idea is this? — The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a.', answer: 'The Bhakra-Nangal Project is a', options: ['The Bhakra-Nangal Project is a', 'The drainage system of India', 'Soil erosion is the detachment', 'Surface water in India comprises'] },
            { id: 's2', label: 'The drainage system of India', prompt: 'Which idea is this? — The drainage system of India comprises two distinct river regimes: Himalayan rivers.', answer: 'The drainage system of India', options: ['The drainage system of India', 'The Bhakra-Nangal Project is a', 'Soil erosion is the detachment', 'Surface water in India comprises'] },
            { id: 's3', label: 'Soil erosion is the detachment', prompt: 'Which idea is this? — Soil erosion is the detachment, transportation, and deposition of topsoil particles by.', answer: 'Soil erosion is the detachment', options: ['Soil erosion is the detachment', 'The Bhakra-Nangal Project is a', 'The drainage system of India', 'Surface water in India comprises'] },
            { id: 's4', label: 'Surface water in India comprises', prompt: 'Which idea is this? — Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,.', answer: 'Surface water in India comprises', options: ['Surface water in India comprises', 'The Bhakra-Nangal Project is a', 'The drainage system of India', 'Soil erosion is the detachment'] },
            { id: 's5', label: 'A drainage basin or catchment', prompt: 'Which idea is this? — A drainage basin (or catchment) is the total land area drained by a river and its.', answer: 'A drainage basin or catchment', options: ['A drainage basin or catchment', 'The Bhakra-Nangal Project is a', 'The drainage system of India', 'Soil erosion is the detachment'] },
            { id: 's6', label: 'The Damodar Valley Corporation DVC', prompt: 'Which idea is this? — The Damodar Valley Corporation (DVC) is India\'s first multipurpose river valley project,.', answer: 'The Damodar Valley Corporation DVC', options: ['The Damodar Valley Corporation DVC', 'The Bhakra-Nangal Project is a', 'The drainage system of India', 'Soil erosion is the detachment'] }
          ] } }
    ],
    explore: { component: C11_GeographyRiverRegimeSim, prompt: 'Explore the interactive — River Regime' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_003', difficulty: 'standard',
          question: 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej.',
          hint: 'If stuck, revisit c11_geo_cbse_13_001 (water budgeting: inflow, storage, release, losses).',
          misconception: 'Students conflate Bhakra-Nangal with the Beas-Sutlej Link Project (BSL) and assume the Bhakra Dam diverts Beas water.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a',
                  options: ['The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by', 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate Bhakra-Nangal with the Beas-Sutlej Link Project (BSL) and assume the Bhakra Dam diverts Beas water into the Sutlej.' }
          ],
            remediations: { 'students-conflate-bhakra-nangal-with': { steps: ['On a political map of the Indus basin, trace the Sutlej from its Tibetan source (Langqen Zangbo) through Himachal to.', 'Compare the commissioning years: Bhakra Dam 1963, Nangal Dam 1954, Pandoh Dam 1977.', 'Read the BBMB notification—Himachal\'s 7.19% share is explicitly for "Sutlej and Beas waters" because the integrated.', 'Re-answer Diagnostic Q1 and Q4 distinguishing the two projects\' infrastructure and institutional integration.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_009', difficulty: 'standard',
          question: 'The drainage system of India comprises two distinct river regimes: Himalayan.',
          hint: 'Review Class 9 "Drainage Patterns" (c9_geo_ch1_8) and Class 11 "Himalayan Mountains".',
          misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The drainage system of India comprises two distinct river regimes: Himalayan rivers',
                  options: ['The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by', 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly classify them as.' }
          ],
            remediations: { 'the-narmada-and-tapi-are': { steps: ['On a tectonic map of India, locate the Narmada-Son lineament and the Satpura range.', 'Trace the Narmada from Amarkantak to the Gulf of Khambhat; note it flows through a graben (rift valley) bounded by.', 'Compare with the Indus which flows through a suture zone (Indus-Tsangpo suture) in the Himalayas.', 'List regime data: Narmada discharge drops to <10 m³/s in summer; Indus remains >500 m³/s.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_009', difficulty: 'standard',
          question: 'Soil erosion is the detachment, transportation, and deposition of topsoil.',
          hint: 'Revisit c11_geo_cbse_12_002 (Soil Profile) to recall horizon properties, and.',
          misconception: 'Students often treat sheet, rill, and gully erosion as three independent types rather than a progressive sequence where.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by',
                  options: ['Soil erosion is the detachment, transportation, and deposition of topsoil particles by', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat sheet, rill, and gully erosion as three independent types rather than a progressive sequence where sheet erosion.' }
          ],
            remediations: { 'students-often-treat-sheet': { steps: ['Use a sequence of three photographs from the same Shivalik watershed showing (a) muddy sheet flow, (b) rill network,.', 'Conduct a sand-tray experiment: simulate rainfall on a 5°, 15°, and 25° slope with bare soil; observe and measure.', 'Provide a decision matrix table matching slope gradient, erosion stage, and recommended conservation measure; have.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_001', difficulty: 'standard',
          question: 'Surface water in India comprises water flowing in rivers, stored in lakes,.',
          hint: 'Review the monsoon onset/withdrawal maps and river basin maps from Class 9 (Chapter 4:.',
          misconception: 'Students believe groundwater exists as vast underground rivers or lakes that are uniformly available everywhere, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,',
                  options: ['Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe groundwater exists as vast underground rivers or lakes that are uniformly available everywhere, and that deeper drilling.' }
          ],
            remediations: { 'groundwater-exists-as-vast-underground': { steps: ['Remediation: 1) Use a cross-section diagram showing unconfined alluvial aquifer (Indo-Gangetic) vs.', 'fractured hard rock aquifer (Deccan) with water table contours.', '2) Conduct a simple water balance exercise: give rainfall, area, runoff coefficient, recharge coefficient — have.', 'groundwater recharge for two contrasting regions.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_002', difficulty: 'standard',
          question: 'A drainage basin (or catchment) is the total land area drained by a river and.',
          hint: 'If unable to delineate a basin boundary, revisit topographic map interpretation (Class 11.',
          misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A drainage basin (or catchment) is the total land area drained by a river and its',
                  options: ['A drainage basin (or catchment) is the total land area drained by a river and its', 'The Bhakra-Nangal Project is a multipurpose river valley project on the Sutlej River (a', 'The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Soil erosion is the detachment, transportation, and deposition of topsoil particles by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the *Godavari basin* (≈3.12 lakh.' }
          ],
            remediations: { 'the-ganga-basin-is-the': { steps: ['On the political map of India, shade the *Indian portion* of each major basin using CWC data (Indus: 3.2L, Ganga: 2.5L,.', 'Calculate percentages of total Indian basin area for each.', 'Write a one-sentence rule: "For inter-state water disputes, only the Indian catchment area matters; for total.', 'Practise a past board question: "Compare the catchment areas of the Godavari and Ganga basins *within India* and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_004', difficulty: 'standard',
          question: 'The Damodar Valley Corporation (DVC) is India\'s first multipurpose river valley.',
          hint: 'If stuck, revisit the Damodar basin map (c11_geo_cbse_13_002) and the Bhakra-Nangal case.',
          misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering.',
          parts: [
                { id: 'a', prompt: 'Explain why the Damodar River was historically called the "Sorrow of Bengal" and how the cascade of dams (Tilaiya, Konar, Maithon, Panchet) specifically.', answer: 'The Damodar earned the name "Sorrow of Bengal"',
                  options: ['The Damodar earned the name "Sorrow of Bengal"', 'dams stop floods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering **thermal-hydel integration**.' }
          ],
            remediations: { 'dvc-is-only-a-hydroelectric': { steps: ['**Map Exercise:** On a blank outline map of Jharkhand-West Bengal, draw the Damodar basin boundary.', 'Plot and label: Damodar source (Khamarpat hills), Barakar & Konar tributaries, four dams (Tilaiya on Barakar, Konar on.', '**Table Comparison:** Create a 4×4 table: Project (DVC vs Bhakra) × Parameters (River Regime, Geological Setting, Power.', '**Flood Hydrograph Analysis:** Sketch a pre-DVC vs post-DVC flood hydrograph for the Damodar at Durgapur.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Damodar Valley Corporation has completely eliminated floods in the lower Damodar basin." Use evidence from post-1978 flood events.', answer: '**Evaluation: The statement is FALSE.** **Justification:** 1',
                  options: ['**Evaluation: The statement is FALSE.** **Justification:** 1', 'complete elimination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe DVC is **only a hydroelectric project** like Bhakra-Nangal, overlooking its pioneering **thermal-hydel integration**.' }
          ],
            remediations: { 'dvc-is-only-a-hydroelectric': { steps: ['**Map Exercise:** On a blank outline map of Jharkhand-West Bengal, draw the Damodar basin boundary.', 'Plot and label: Damodar source (Khamarpat hills), Barakar & Konar tributaries, four dams (Tilaiya on Barakar, Konar on.', '**Table Comparison:** Create a 4×4 table: Project (DVC vs Bhakra) × Parameters (River Regime, Geological Setting, Power.', '**Flood Hydrograph Analysis:** Sketch a pre-DVC vs post-DVC flood hydrograph for the Damodar at Durgapur.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
