import type { SimDef } from '../../engine/types';
import C12_GeoLandResourcesAgricultureCBSESim from '../../../simulations/c6_12_new/C12_GeoLandResourcesAgricultureCBSESim';

/** v3 wrapped master — C12_GeoLandResourcesAgricultureCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geolandresourcesagriculturecbsesim: SimDef = {
    id: 'v3w_c12_geolandresourcesagriculturecbsesim',
    title: 'Land Resources in India: Utilisation Pattern and Categories',
    subtitle: 'Covers the nine-fold land use classification, reporting vs geographical area distinction,.',
    classLevel: 12, subject: 'science', topic: 'Land Resources in India: Utilisation Pattern and Categories',
    chapters: [],
    nodeIds: ['c12_geo_cbse_11_001', 'c12_geo_cbse_09_011', 'c12_geo_cbse_12_002', 'c12_geo_cbse_11_003', 'c12_geo_cbse_12_001', 'c12_geo_cbse_12_009', 'c12_geo_cbse_11_002', 'c12_geo_cbse_11_004', 'c12_geo_cbse_11_005', 'c12_geo_cbse_11_011', 'c12_geo_cbse_05_001', 'c12_geo_cbse_05_004', 'c12_geo_cbse_05_005', 'c12_geo_cbse_05_007', 'c12_geo_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe your local village/tehsil revenue map — you will see columns for "forest", "culturable waste",.', goal: 'Master Land Resources in India: Utilisation Pattern and Categories.' },
    discovery: {
        question: 'Define "reporting area" and explain how it differs from "geographical area" in the context of Indian land use statistics.',
        options: ['Reporting area is the total area for', 'they are the same', 'current fallow'],
        answer: 'Reporting area is the total area for',
        hook: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical.',
    },
    teaching: [
        { title: 'Land use categories are the nine-fold.', text: 'Land use categories are the nine-fold classification of India\'s reporting area maintained in land revenue records, including forests, barren and wastelands, non-agricultural uses, permanent pastures,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_001', title: 'Land use categories are the nine-fold.',
          scaffold: { problem: 'A district has reporting area 500,000 ha. Land revenue records show: Forest 75,000 ha, Barren/Wasteland 30,000 ha, Non-agricultural 60,000.',
            steps: [
            { text: 'Sum all given categories except NSA: 75,000 + 30,000 + 60,000 + 25,000 + 15,000 + 40,000 + 35,000 + 20,000 = 300,000 ha.' },
            { text: 'Reporting area = sum of all nine categories = 500,000 ha. So NSA = 500,000 – 300,000 = 200,000 ha.' },
            { text: 'Verify NSA % = (200,000 / 500,000) × 100 = 40% (plausible, near national 45.6%).' },
            { text: 'Cropping Intensity = (GCA / NSA) × 100 = (380,000 / 200,000) × 100 = 190%.' },
            { text: 'Interpret: CI > 100% means double cropping; 190% implies near triple cropping on irrigated parts — high intensity.', faded: true, blankAnswer: 'Net Area Sown = 200,000 ha; Cropping Intensity = 190%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_09_011', title: 'Population-resource relationship.',
          scaffold: { problem: 'Using Census 2011 data, State X has: Total population = 72.6 million, Net sown area = 18.5 million hectares, Net cultivable area = 22.1.',
            steps: [
            { text: 'Crude density = 72,600,000 / 307,000 = 236.5 persons/km².' },
            { text: 'Physiological density = 72,600,000 / 18,500 = 3,924 persons/km² of net sown area.' },
            { text: 'Agricultural density = 18,700,000 / 22,100 = 846 persons/km² of net cultivable area.' },
            { text: 'Compare: Crude density (236) is moderate (near India average 382), but physiological density (3924) is very high — each.' },
            { text: 'Physiological density best reflects current food production pressure because it uses land *currently in cultivation*.', faded: true, blankAnswer: 'Crude density = 236.5 persons/km²; Physiological density =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_002', title: 'India\'s drainage system comprises two.',
          scaffold: { problem: 'Using NCERT data (Ganga-Brahmaputra-Barak: 60% of 1869 km³ = 1121 km³ from ~33% of India\'s 3.28 million km²), calculate the specific yield.',
            steps: [
            { text: 'Calculate Himalayan basin catchment area = 0.33 × 3,280,000 km² = 1,082,400 km²' },
            { text: 'Calculate Himalayan specific yield = 1121 km³ / 1,082,400 km² = 1.036 km³/km² = 1,036 MCM/km² = 1036 mm/yr' },
            { text: 'Calculate Peninsular basin catchment area = 0.67 × 3,280,000 km² = 2,197,600 km²' },
            { text: 'Calculate Peninsular specific yield = 748 km³ / 2,197,600 km² = 0.340 km³/km² = 340 MCM/km² = 340 mm/yr' },
            { text: 'Ratio = 1036 / 340 ≈ 3.05 — Himalayan basins yield ~3× more water per unit area' },
            { text: 'Interpret: Difference driven by orographic rainfall (2000-5000 mm vs 600-1500 mm), lower evaporation (cloud cover,.', faded: true, blankAnswer: 'Himalayan basins: ~1036 mm/yr; Peninsular basins: ~340.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_11_003', title: 'Common Property Resources (CPRs) are.',
          scaffold: { problem: 'In a village in Madhya Pradesh, 40% of households are landless.',
            steps: [
            { text: 'Identify the CPRs involved (pasture, forest) and their current users (landless households for grazing, women for.' },
            { text: 'Recall the NCERT principle: CPRs provide fodder for livestock and fuel for households; landless depend on livestock.' },
            { text: 'Calculate the loss: 15 ha out of 50 ha pasture = 30% reduction in grazing area.' },
            { text: 'Link to livelihood: Landless households may sell animals, losing a primary income source.' },
            { text: 'Conclude that privatization of CPR creates a trade-off: private dairy gains vs.', faded: true, blankAnswer: 'The lease reduces grazing land by 30%, lowering livestock.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_001', title: 'Water resources in India refer to the.',
          scaffold: { problem: 'The total replenishable groundwater in India is 432 cubic km. If the overall groundwater utilization rate is 60% (same as surface water),.',
            steps: [
            { text: 'Identify total replenishable groundwater = 432 cubic km (from NCERT).' },
            { text: 'Apply national utilizability factor: utilizable groundwater = 60% of 432 = 259.2 cubic km.' },
            { text: 'Calculate agricultural groundwater use = 92% of 259.2 = 238.46 cubic km.' },
            { text: 'Explain depletion: National average masks regional extremes. Punjab\'s groundwater development exceeds 100% (utilization.' },
            { text: 'Verify: 238.46 cubic km is the national agricultural groundwater draft; Punjab alone contributes a disproportionate.', faded: true, blankAnswer: '238.46 cubic km of groundwater used nationally for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_009', title: 'Water conservation in India refers to.',
          scaffold: { problem: 'A farmer in Malwa region (Madhya Pradesh) has 5 hectares of black cotton soil.',
            steps: [
            { text: 'Assess current water use — wheat requires ~350 mm irrigation (3-4 irrigations), soybean ~150 mm (supplemental).' },
            { text: 'Structural measure — install drip irrigation for wheat (efficiency 90% vs flood 60%) and sprinkler for soybean (75% vs.' },
            { text: 'Agronomic measure — shift 2 ha from wheat to chickpea (rabi, irrigation need ~100 mm).' },
            { text: 'Management measure — adopt deficit irrigation scheduling using soil moisture sensor (save 10% of remaining irrigation).' },
            { text: 'Total annual saving = 7,275 + 5,000 + 3,772 = 16,047 m³ (32% reduction).' },
            { text: 'Economic viability — drip/sprinkler capital cost ~₹1.2 lakh/ha (subsidy 55% under PMKSY).', faded: true, blankAnswer: 'The conservation package saves ~16,000 m³/year (32%).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_09_011', title: 'Identify each idea',
          dissect: { specimen: 'Land Resources in India: Utilisation Pattern and Categories', spots: [
            { id: 's1', label: 'Land use categories are the', prompt: 'Which idea is this? — Land use categories are the nine-fold classification of India\'s reporting area maintained.', answer: 'Land use categories are the', options: ['Land use categories are the', 'Population-resource relationship examines how population', 'Indias drainage system comprises two', 'Common Property Resources CPRs are'] },
            { id: 's2', label: 'Population-resource relationship examines how population', prompt: 'Which idea is this? — Population-resource relationship examines how population size, distribution, density,.', answer: 'Population-resource relationship examines how population', options: ['Population-resource relationship examines how population', 'Land use categories are the', 'Indias drainage system comprises two', 'Common Property Resources CPRs are'] },
            { id: 's3', label: 'Indias drainage system comprises two', prompt: 'Which idea is this? — India\'s drainage system comprises two distinct categories: Himalayan rivers (Indus,.', answer: 'Indias drainage system comprises two', options: ['Indias drainage system comprises two', 'Land use categories are the', 'Population-resource relationship examines how population', 'Common Property Resources CPRs are'] },
            { id: 's4', label: 'Common Property Resources CPRs are', prompt: 'Which idea is this? — Common Property Resources (CPRs) are community-owned natural resources where every member.', answer: 'Common Property Resources CPRs are', options: ['Common Property Resources CPRs are', 'Land use categories are the', 'Population-resource relationship examines how population', 'Indias drainage system comprises two'] },
            { id: 's5', label: 'Water resources in India refer', prompt: 'Which idea is this? — Water resources in India refer to the total volume of freshwater available from.', answer: 'Water resources in India refer', options: ['Water resources in India refer', 'Land use categories are the', 'Population-resource relationship examines how population', 'Indias drainage system comprises two'] },
            { id: 's6', label: 'Water conservation in India refers', prompt: 'Which idea is this? — Water conservation in India refers to the systematic management, protection, and.', answer: 'Water conservation in India refers', options: ['Water conservation in India refers', 'Land use categories are the', 'Population-resource relationship examines how population', 'Indias drainage system comprises two'] }
          ] } }
    ],
    explore: { component: C12_GeoLandResourcesAgricultureCBSESim, prompt: 'Explore the interactive — Land Resources in India: Utilisation Pattern and Categories' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_001', difficulty: 'standard',
          question: 'Land use categories are the nine-fold classification of India\'s reporting area.',
          hint: 'Revisit c11_geo_cbse_18_001 (Land Resources: Utilisation Pattern in India) and.',
          misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical.',
          parts: [
                { id: 'a', prompt: 'Define "reporting area" and explain how it differs from "geographical area" in the context of Indian land use statistics.', answer: 'Reporting area is the total area for',
                  options: ['Reporting area is the total area for', 'they are the same', 'current fallow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'b', prompt: 'Using Table 3.1, calculate the actual increase and rate of increase (simple growth rate) for Net Area Sown between 1950–51 and 2019–20. Show steps.', answer: 'Step 1: Identify values',
                  options: ['Step 1: Identify values', 'current fallow', 'fallow other than current fallow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'c', prompt: 'Compare the trends of "Culturable Wasteland" and "Fallow other than Current Fallow" between 1950–51 and 2019–20. Explain the common driver for their decline.', answer: 'Both declined: Culturable Wasteland 8.0% → 3.9%',
                  options: ['Both declined: Culturable Wasteland 8.0% → 3.9%', 'climate change', 'soil erosion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' }
          ],
            remediations: { 'current-fallow-and-fallow-other': { steps: ['Draw a timeline on paper: 0 years (current fallow) → 1–5 years (fallow other than current fallow) → >5 years.', 'Re-read NCERT definitions (i)–(ix) aloud, highlighting the time thresholds.', 'Take Appendix Table (vi) data for your state, classify each year\'s fallow into the three sub-categories, plot trends.', 'Explain to a peer why a 3-year fallow is NOT culturable wasteland.', 'Attempt Diagnostic Q3 again with correct denominators.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Increasing cropping intensity is the only viable strategy for India to raise agricultural output given limited scope for expanding net.', answer: 'Partially true but incomplete',
                  options: ['Partially true but incomplete', 'current fallow', 'fallow other than current fallow', 'fallow land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' },
                { id: 'b', prompt: 'Design a land use plan for a hypothetical 1000-ha village in semi-arid Rajasthan (annual rainfall 60 cm) that maximizes livelihood security for landless.', answer: 'Good answer allocates: (1) 200 ha permanent pasture (CPR for livestock/fodder',
                  options: ['Good answer allocates: (1) 200 ha permanent pasture (CPR for livestock/fodder', 'current fallow', 'fallow other than current fallow', 'fallow land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current fallow" and "fallow other than current fallow" are just "fallow land" — they miss the critical 1-year and 5-year.' }
          ],
            remediations: { 'current-fallow-and-fallow-other': { steps: ['Draw a timeline on paper: 0 years (current fallow) → 1–5 years (fallow other than current fallow) → >5 years.', 'Re-read NCERT definitions (i)–(ix) aloud, highlighting the time thresholds.', 'Take Appendix Table (vi) data for your state, classify each year\'s fallow into the three sub-categories, plot trends.', 'Explain to a peer why a 3-year fallow is NOT culturable wasteland.', 'Attempt Diagnostic Q3 again with correct denominators.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_011', difficulty: 'standard',
          question: 'Population-resource relationship examines how population size, distribution,.',
          hint: 'Revisit c12_geo_cbse_09_002 (Density of Population) and practice calculating.',
          misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297.',
          parts: [
                { id: 'a', prompt: 'Define physiological density and agricultural density. How do they differ from crude (arithmetic) density in assessing population pressure on land resources?', answer: 'Physiological density = Total population / Net cultivated area',
                  options: ['Physiological density = Total population / Net cultivated area', 'cultivated', 'cultivable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297 persons/km²) as.' },
                { id: 'b', prompt: 'Compare the occupational structure of India in 2001 (58.2% primary) and 2011 (54.6% primary).', answer: 'The primary sector\'s *share* fell',
                  options: ['The primary sector\'s *share* fell', 'fewer farmers now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297 persons/km²) as.' }
          ],
            remediations: { 'students-equate-high-population-density': { steps: ['If the student persists in equating density with unsustainability: (1) Have them calculate per-capita ecological.', 'a tribal district using proxy data (electricity use, vehicle ownership, diet).', '(2) Map the source regions of Delhi\'s water (Tehri Dam, Yamuna) and food (Punjab, Haryana) to show telecoupling.', '(3) Revisit c11_geo_cbse_16_006 (Demographic Transition Theory) to see how Kerala achieved low growth *with* high.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_09_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297.',
          parts: [
                { id: 'a', prompt: 'Compare the occupational structure of India in 2001 (58.2% primary) and 2011 (54.6% primary).', answer: 'The primary sector\'s *share* fell',
                  options: ['The primary sector\'s *share* fell', 'fewer farmers now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "high population density = unsustainable" and "low density = sustainable." They cite Delhi (11,297 persons/km²) as.' }
          ],
            remediations: { 'students-equate-high-population-density': { steps: ['If the student persists in equating density with unsustainability: (1) Have them calculate per-capita ecological.', 'a tribal district using proxy data (electricity use, vehicle ownership, diet).', '(2) Map the source regions of Delhi\'s water (Tehri Dam, Yamuna) and food (Punjab, Haryana) to show telecoupling.', '(3) Revisit c11_geo_cbse_16_006 (Demographic Transition Theory) to see how Kerala achieved low growth *with* high.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_002', difficulty: 'standard',
          question: 'India\'s drainage system comprises two distinct categories: Himalayan rivers.',
          hint: 'If stuck on basin boundaries, revisit c11_geo_cbse_24_005 (Drainage Patterns on.',
          misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, the Ambala-Saharanpur water divide separates the Indus and Ganga drainage basins.', answer: 'Correct trace: Raindrop → surface runoff → seasonal stream → Ghaggar river (or',
                  options: ['Correct trace: Raindrop → surface runoff → seasonal stream → Ghaggar river (or', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' },
                { id: 'b', prompt: 'Compare the catchment characteristics of the Narmada and Tapi rivers with those of the Mahanadi and Godavari.', answer: 'Correct analysis: Narmada and Tapi originate on the western flanks of the',
                  options: ['Correct analysis: Narmada and Tapi originate on the western flanks of the', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' }
          ],
            remediations: { 'all-himalayan-rivers-are-perennial': { steps: ['Revisit c11_geo_cbse_09_009 (Himalayan vs Peninsular Rivers) — draw a two-column table comparing 5 parameters: source,.', 'On a physical map, trace the 16°N latitude line — mark every river crossing it and classify its flow direction.', 'Use the "River Basin Atlas of India" (CWC website) to compare specific yield (MCM/km²) for Narmada vs Krishna — note.', 'Re-attempt Diagnostic Question 4 with the new data.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Brahmaputra basin has the highest water yield per unit catchment area among all Indian river basins." Use NCERT data on catchment.', answer: 'Correct evaluation: The statement is TRUE',
                  options: ['Correct evaluation: The statement is TRUE', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' },
                { id: 'b', prompt: 'Design a schematic cross-section (west-to-east) across Peninsular India at 16°N latitude showing: (a) the Western Ghats water divide, (b) westward-flowing.', answer: 'Good answer criteria: Cross-section shows asymmetric profile',
                  options: ['Good answer criteria: Cross-section shows asymmetric profile', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' },
                { id: 'c', prompt: 'Compare the catchment characteristics of the Narmada and Tapi rivers with those of the Mahanadi and Godavari.', answer: 'Correct analysis: Narmada and Tapi originate on the western flanks of the',
                  options: ['Correct analysis: Narmada and Tapi originate on the western flanks of the', 'all Himalayan rivers are perennial and all Peninsular rivers are seasonal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "all Himalayan rivers are perennial and all Peninsular rivers are seasonal" — but the Brahmaputra\'s Tibetan stretch.' }
          ],
            remediations: { 'all-himalayan-rivers-are-perennial': { steps: ['Revisit c11_geo_cbse_09_009 (Himalayan vs Peninsular Rivers) — draw a two-column table comparing 5 parameters: source,.', 'On a physical map, trace the 16°N latitude line — mark every river crossing it and classify its flow direction.', 'Use the "River Basin Atlas of India" (CWC website) to compare specific yield (MCM/km²) for Narmada vs Krishna — note.', 'Re-attempt Diagnostic Question 4 with the new data.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_003', difficulty: 'standard',
          question: 'Common Property Resources (CPRs) are community-owned natural resources where.',
          hint: 'Revisit c10_geo_cbse_01_003 (Resources: Classification by Ownership) and create a table.',
          misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take.',
          parts: [
                { id: 'a', prompt: 'A village has 100 hectares of culturable wasteland classified as CPR. Over a decade, 30 hectares are converted to private cultivation.', answer: 'livestock economy and (',
                  options: ['livestock economy and (', 'less grass', 'government wastelands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take anything without rules.' },
                { id: 'b', prompt: 'Compare CPRs and private agricultural land in terms of: (i) access rights, (ii) management responsibility, (iii) equity outcome for landless households.', answer: '(i) CPRs: all community members have access',
                  options: ['(i) CPRs: all community members have access', 'government land', 'anyone can use private land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take anything without rules.' }
          ],
            remediations: { 'cprs-are-the-same-as': { steps: ['If the student holds this misconception: (1) Revisit c10_geo_cbse_01_003 (Resource Classification by Ownership) to.', '(2) Study c11_soc_cbse_08_003 (Property Relations and Control Over Natural Resources) for the sociological distinction.', '(3) Use a local example: visit a village pond or pasture, interview elders about rules (e.g., “only two cows per.', '(4) Re-attempt Diagnostic Question 4 to test the corrected understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take.',
          parts: [
                { id: 'a', prompt: 'Compare CPRs and private agricultural land in terms of: (i) access rights, (ii) management responsibility, (iii) equity outcome for landless households.', answer: '(i) CPRs: all community members have access',
                  options: ['(i) CPRs: all community members have access', 'government land', 'anyone can use private land', 'government wastelands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think CPRs are the same as “government wastelands” or “open-access resources” where anyone can take anything without rules.' }
          ],
            remediations: { 'cprs-are-the-same-as': { steps: ['If the student holds this misconception: (1) Revisit c10_geo_cbse_01_003 (Resource Classification by Ownership) to.', '(2) Study c11_soc_cbse_08_003 (Property Relations and Control Over Natural Resources) for the sociological distinction.', '(3) Use a local example: visit a village pond or pasture, interview elders about rules (e.g., “only two cows per.', '(4) Re-attempt Diagnostic Question 4 to test the corrected understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_001', difficulty: 'standard',
          question: 'Water resources in India refer to the total volume of freshwater available from.',
          hint: 'If stuck on spatial distribution, revisit Class 11 nodes c11_geo_cbse_09_009 (Drainage.',
          misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater.',
          parts: [
                { id: 'a', prompt: 'What is the total utilizable water resource of India in cubic km, and what percentage of the available surface water and replenishable groundwater does it.', answer: 'The total utilizable water resource is 1,122 cubic km',
                  options: ['The total utilizable water resource is 1,122 cubic km', 'states with high rainfall (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' },
                { id: 'b', prompt: 'Using the data that agriculture accounts for 89% of surface water and 92% of groundwater utilization, calculate the approximate volume of groundwater used for.', answer: 'Step 1: Total replenishable groundwater = 432 cubic km',
                  options: ['Step 1: Total replenishable groundwater = 432 cubic km', 'states with high rainfall (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' },
                { id: 'c', prompt: 'Compare the groundwater utilization patterns of Punjab/Haryana/Tamil Nadu (high utilization) with Chhattisgarh/Odisha/Kerala (low utilization).', answer: 'High-utilization states have intensive agriculture (rice-wheat cropping in',
                  options: ['High-utilization states have intensive agriculture (rice-wheat cropping in', 'low rainfall', 'states with high rainfall (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' }
          ],
            remediations: { 'states-with-high-rainfall-e': { steps: ['Revisit the groundwater utilization map in NCERT Class 12 (Fig.', 'Overlay cropping pattern maps (rice-wheat vs. plantation vs. rainfed) from Class 11 Agriculture chapter.', 'For each high-utilization state, write one sentence linking a specific crop (e.g., paddy in Punjab) to its water.', 'Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s water crisis is primarily due to insufficient rainfall." Use data on utilizable water, sectoral demand, and pollution to.', answer: 'The statement is false',
                  options: ['The statement is false', 'states with high rainfall (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that states with high rainfall (e.g., Kerala, Northeast) automatically have high groundwater utilization, while states.' }
          ],
            remediations: { 'states-with-high-rainfall-e': { steps: ['Revisit the groundwater utilization map in NCERT Class 12 (Fig.', 'Overlay cropping pattern maps (rice-wheat vs. plantation vs. rainfed) from Class 11 Agriculture chapter.', 'For each high-utilization state, write one sentence linking a specific crop (e.g., paddy in Punjab) to its water.', 'Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_009', difficulty: 'standard',
          question: 'Water conservation in India refers to the systematic management, protection,.',
          hint: 'Revisit c12_geo_cbse_12_003 (Variability of Rainfall and Water Scarcity) and.',
          misconception: 'Students often think \'water conservation\' means only building structures like dams, tanks, or rooftop harvesting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Water conservation in India refers to the systematic management, protection, and',
                  options: ['Water conservation in India refers to the systematic management, protection, and', 'Land use categories are the nine-fold classification of India\'s reporting area maintained', 'Population-resource relationship examines how population size, distribution, density,', 'India\'s drainage system comprises two distinct categories: Himalayan rivers (Indus,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'water conservation\' means only building structures like dams, tanks, or rooftop harvesting.' }
          ],
            remediations: { 'water-conservation-means-only-building': { steps: ['If the student holds the supply-side-only view, assign this 3-step remediation: (1) Re-read the NCERT sections.', '(2) Compare the Ralegan Siddhi case study: list the non-structural interventions (liquor ban, crop ban, stall-feeding,.', '(3) Attempt Diagnostic Question 5 again, now explicitly incorporating demand management and equity.', 'Re-diagnose with a new scenario: \'A city plans to build a new dam vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
