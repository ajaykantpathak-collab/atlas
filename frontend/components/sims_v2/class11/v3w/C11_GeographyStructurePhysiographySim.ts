import type { SimDef } from '../../engine/types';
import C11_GeographyStructurePhysiographySim from '../../../simulations/c6_12/C11_GeographyStructurePhysiographySim';

/** v3 wrapped master — C11_GeographyStructurePhysiographySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographystructurephysiographysim: SimDef = {
    id: 'v3w_c11_geographystructurephysiographysim',
    title: 'Physiographic Divisions of India: Overview and Classification',
    subtitle: 'Covers the six-fold physiographic classification of India at 1:5 million scale, including.',
    classLevel: 11, subject: 'geography', topic: 'Physiographic Divisions of India: Overview and Classification',
    chapters: [],
    nodeIds: ['c11_geo_cbse_09_001', 'c11_geo_cbse_09_008', 'c11_geo_cbse_09_006', 'c11_geo_cbse_13_001', 'c11_geo_cbse_13_002', 'c11_geo_cbse_12_003', 'c11_geo_cbse_09_002', 'c11_geo_cbse_09_005', 'c11_geo_cbse_10_001', 'c11_geo_cbse_10_003', 'c11_geo_cbse_10_004', 'c11_geo_cbse_08_002', 'c11_geo_cbse_08_005', 'c11_geo_cbse_21_001', 'c11_geo_cbse_13_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe a physical relief map of India (or Google Earth terrain view) and.', goal: 'Master Physiographic Divisions of India: Overview and Classification.' },
    discovery: {
        question: 'State the approximate longitudinal extent of the Indian Desert and name the hill range that forms its eastern boundary.',
        options: ['The Indian Desert extends approximately from 70°E to 75°E longitude', 'desert', 'Sahara-style sand sea'],
        answer: 'The Indian Desert extends approximately from 70°E to 75°E longitude',
        hook: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).',
    },
    teaching: [
        { title: 'Physiographic divisions of India refer to.', text: 'Physiographic divisions of India refer to the classification of the Indian landmass into six major physical units—The Himalayan Mountains, The Northern Plains, The Peninsular Plateau, The Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_001', title: 'Physiographic divisions of India refer.',
          scaffold: { problem: 'A Class 11 student is given a geological cross-section along 28°N latitude showing: (1) Siwalik Hills (Neogene molasse), (2) Main Boundary.',
            steps: [
            { text: 'Recall that physiographic divisions are defined by **major crustal-scale boundaries**, not individual thrust faults.' },
            { text: 'Identify the **Main Frontal Thrust (MFT)** — the southernmost thrust that emplaces Siwaliks over the alluvial plains.' },
            { text: 'Note that the **Northern Plains** begin where the **basement (Precambrian)** is buried beneath >1 km of Quaternary.' },
            { text: 'The **Himalayan Mountains** division includes everything north of the MFT: Siwaliks, Lesser, Greater, and Tethyan.' },
            { text: 'Verify: The MFT coincides with a sharp break in slope (mountain front), seismicity, and GPS velocity gradient —.', faded: true, blankAnswer: 'The physiographic boundary is the **Main Frontal Thrust.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_008', title: 'The Andaman-Nicobar Islands (Bay of.',
          scaffold: { problem: 'A research team measures the water table on Kavaratti Island (Lakshadweep) at 0.5 m above mean sea level during post-monsoon.',
            steps: [
            { text: 'Identify the applicable principle — Ghyben-Herzberg relation for freshwater lenses on small oceanic islands.' },
            { text: 'Recall the density ratio: ρ_s ≈ 1025 kg/m³, ρ_f ≈ 1000 kg/m³ → ρ_s/(ρ_s - ρ_f) = 1025/25 = 41.' },
            { text: 'Apply formula h = 41 × z, where z = 0.5 m → h = 41 × 0.5 = 20.5 m below sea level.' },
            { text: 'Total freshwater column = z + h = 0.5 + 20.5 = 21 m. But aquifer thickness = 15 m.' },
            { text: 'Interpret: Theoretical lens (21 m) exceeds aquifer thickness (15 m) → lens is truncated at base; sustainable yield.', faded: true, blankAnswer: 'Theoretical lens thickness = 20.5 m below MSL; total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_006', title: 'The Indian Desert (Thar Desert) is an.',
          scaffold: { problem: 'A researcher measures annual rainfall at three stations in the Thar: Jaisalmer (160 mm), Bikaner (260 mm), Jodhpur (360 mm).',
            steps: [
            { text: 'Locate the three stations on a map of Rajasthan — Jaisalmer (west), Bikaner (north-central), Jodhpur (east, near.' },
            { text: 'Recall the rain-shadow principle: leeward aridity decreases with distance from the barrier as moisture-laden winds.' },
            { text: 'Note the Aravali Hills run NE-SW; the eastern stations (Jodhpur) are closer to the hills where occasional orographic.' },
            { text: 'Calculate the rainfall gradient: (360 - 160) mm / ~300 km ≈ 0.67 mm/km eastward increase.' },
            { text: 'Interpret: The gradient confirms the desert\'s aridity is primarily orographic (rain-shadow) not just continental; the.', faded: true, blankAnswer: 'Rainfall increases eastward from 160 mm (Jaisalmer) to 360.' }
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_12_003', title: 'The ICAR (Indian Council of.',
          scaffold: { problem: 'A farmer in Village A (16°N, 74°E, Deccan Plateau, basalt bedrock, 70 cm annual rain) and Village B (26°N, 85°E, Gandak floodplain, recent.',
            steps: [
            { text: 'Locate Village A on mental map – Deccan Plateau, basalt, semi-arid → Black soil (Regur) group.' },
            { text: 'Locate Village B – Middle Ganga Plain, active floodplain (Khadar) → Alluvial soil group.' },
            { text: 'Compare genesis: Village A soil is residual (in-situ weathering of basalt), high smectite clay, shrinks/swells.' },
            { text: 'Management implication: Village A needs deep ploughing to crack management, suited for cotton; Village B needs flood.' },
            { text: 'Verify: Both dark, but colour from different minerals (titaniferous magnetite in Black vs. organic matter in Alluvial).', faded: true, blankAnswer: 'Village A = Black soil (Regur); Village B = Alluvial soil.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Physiographic Divisions of India: Overview and Classification', spots: [
            { id: 's1', label: 'Physiographic divisions of India refer', prompt: 'Which idea is this? — Physiographic divisions of India refer to the classification of the Indian landmass into.', answer: 'Physiographic divisions of India refer', options: ['Physiographic divisions of India refer', 'The Andaman-Nicobar Islands Bay of', 'The Indian Desert Thar Desert', 'Surface water in India comprises'] },
            { id: 's2', label: 'The Andaman-Nicobar Islands Bay of', prompt: 'Which idea is this? — The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island.', answer: 'The Andaman-Nicobar Islands Bay of', options: ['The Andaman-Nicobar Islands Bay of', 'Physiographic divisions of India refer', 'The Indian Desert Thar Desert', 'Surface water in India comprises'] },
            { id: 's3', label: 'The Indian Desert Thar Desert', prompt: 'Which idea is this? — The Indian Desert (Thar Desert) is an arid physiographic region in northwestern India,.', answer: 'The Indian Desert Thar Desert', options: ['The Indian Desert Thar Desert', 'Physiographic divisions of India refer', 'The Andaman-Nicobar Islands Bay of', 'Surface water in India comprises'] },
            { id: 's4', label: 'Surface water in India comprises', prompt: 'Which idea is this? — Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,.', answer: 'Surface water in India comprises', options: ['Surface water in India comprises', 'Physiographic divisions of India refer', 'The Andaman-Nicobar Islands Bay of', 'The Indian Desert Thar Desert'] },
            { id: 's5', label: 'A drainage basin or catchment', prompt: 'Which idea is this? — A drainage basin (or catchment) is the total land area drained by a river and its.', answer: 'A drainage basin or catchment', options: ['A drainage basin or catchment', 'Physiographic divisions of India refer', 'The Andaman-Nicobar Islands Bay of', 'The Indian Desert Thar Desert'] },
            { id: 's6', label: 'The ICAR Indian Council of', prompt: 'Which idea is this? — The ICAR (Indian Council of Agricultural Research) classification categorizes Indian.', answer: 'The ICAR Indian Council of', options: ['The ICAR Indian Council of', 'Physiographic divisions of India refer', 'The Andaman-Nicobar Islands Bay of', 'The Indian Desert Thar Desert'] }
          ] } }
    ],
    explore: { component: C11_GeographyStructurePhysiographySim, prompt: 'Explore the interactive — Physiographic Divisions of India: Overview and Classification' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_001', difficulty: 'standard',
          question: 'Physiographic divisions of India refer to the classification of the Indian.',
          hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) specifically the sections on **Convergent.',
          misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and.',
          parts: [
                { id: 'a', prompt: 'Using the concept of **isostatic compensation**, explain why the Himalayan Mountains (mean elevation ~6,000 m) and the Peninsular Plateau (mean elevation ~600.', answer: '**Step 1:** Recall Airy\'s isostasy: mountains have deep roots',
                  options: ['**Step 1:** Recall Airy\'s isostasy: mountains have deep roots', 'Peninsula is denser'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and sand dunes**.' }
          ],
            remediations: { 'the-thar-desert-is-a': { steps: ['** Overlay a **geological map of India** (showing basement age: Archean, Proterozoic, Phanerozoic) on a **relief map**.', '** Use a **cross-section drawing exercise** (paper or digital) along 24°N latitude: label crustal thickness from.', '** Ask: "Where does the *rock type* change abruptly?" That is the physiographic boundary.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_008', difficulty: 'standard',
          question: 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic.',
          hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) for boundary types and Class 9 Chapter 3.',
          misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island',
                  options: ['The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern India,', 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as "India\'s islands." They.' }
          ],
            remediations: { 'students-consistently-believe-both-island': { steps: ['Draw two cross-sections side-by-side — Andaman: deep trench → volcanic arc → folded sedimentary hills → narrow shelf →.', 'Label rock types (andesite/basalt vs. coral limestone) and mark groundwater (spring vs. lens).', 'Overlay climate data (both ~2000-3000 mm rain) and ask: "Same rain, different geology → different water systems. Why?"', 'Map 2004 tsunami impact — Andaman: run-up 10-15 m on coasts, inland penetration limited by hills; Lakshadweep:.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The strategic value of Andaman-Nicobar Islands for India\'s maritime security is primarily due to their location astride the Malacca.', answer: 'Correct evaluation: Statement is partially correct but oversimplified',
                  options: ['Correct evaluation: Statement is partially correct but oversimplified', 'nearness to trade routes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as "India\'s islands." They.' }
          ],
            remediations: { 'students-consistently-believe-both-island': { steps: ['Draw two cross-sections side-by-side — Andaman: deep trench → volcanic arc → folded sedimentary hills → narrow shelf →.', 'Label rock types (andesite/basalt vs. coral limestone) and mark groundwater (spring vs. lens).', 'Overlay climate data (both ~2000-3000 mm rain) and ask: "Same rain, different geology → different water systems. Why?"', 'Map 2004 tsunami impact — Andaman: run-up 10-15 m on coasts, inland penetration limited by hills; Lakshadweep:.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_006', difficulty: 'standard',
          question: 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern.',
          hint: 'Review Class 9 "Erosion and Deposition by Wind" (c9_geo_ch1_9) for dune formation.',
          misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).',
          parts: [
                { id: 'a', prompt: 'State the approximate longitudinal extent of the Indian Desert and name the hill range that forms its eastern boundary.', answer: 'The Indian Desert extends approximately from 70°E to 75°E longitude',
                  options: ['The Indian Desert extends approximately from 70°E to 75°E longitude', 'desert', 'Sahara-style sand sea'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).' }
          ],
            remediations: { 'the-thar-desert-is-entirely': { steps: ['Show a Landsat false-colour composite of the Thar — identify dark rocky outcrops (hamada), bright salt pans (playas),.', 'Overlay the Luni River\'s course — trace its inland drainage to the Rann, noting it never reaches the sea.', 'Compare with a climate graph for Jaisalmer (rainfall <150 mm, high variability) to explain why perennial flow is.', 'Have the student sketch a cross-section from Aravali foothills to Pakistan border showing the transition: pediment →.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).',
          parts: [
                { id: 'a', prompt: 'Design a community-based ecotourism plan for the Desert National Park (Jaisalmer) that conserves the Great Indian Bustard habitat while providing livelihoods.', answer: 'Core zone (bustard breeding): no tourism, strict protection',
                  options: ['Core zone (bustard breeding): no tourism, strict protection', 'desert', 'Sahara-style sand sea', 'the Thar Desert is entirely covered by shifting sand dunes (erg)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).' }
          ],
            remediations: { 'the-thar-desert-is-entirely': { steps: ['Show a Landsat false-colour composite of the Thar — identify dark rocky outcrops (hamada), bright salt pans (playas),.', 'Overlay the Luni River\'s course — trace its inland drainage to the Rann, noting it never reaches the sea.', 'Compare with a climate graph for Jaisalmer (rainfall <150 mm, high variability) to explain why perennial flow is.', 'Have the student sketch a cross-section from Aravali foothills to Pakistan border showing the transition: pediment →.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_001', difficulty: 'standard',
          question: 'Surface water in India comprises water flowing in rivers, stored in lakes,.',
          hint: 'Review the monsoon onset/withdrawal maps and river basin maps from Class 9 (Chapter 4:.',
          misconception: 'Students believe groundwater exists as vast underground rivers or lakes that are uniformly available everywhere, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,',
                  options: ['Surface water in India comprises water flowing in rivers, stored in lakes, reservoirs,', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island', 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern India,'],
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
                  options: ['A drainage basin (or catchment) is the total land area drained by a river and its', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island', 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern India,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the *Godavari basin* (≈3.12 lakh.' }
          ],
            remediations: { 'the-ganga-basin-is-the': { steps: ['On the political map of India, shade the *Indian portion* of each major basin using CWC data (Indus: 3.2L, Ganga: 2.5L,.', 'Calculate percentages of total Indian basin area for each.', 'Write a one-sentence rule: "For inter-state water disputes, only the Indian catchment area matters; for total.', 'Practise a past board question: "Compare the catchment areas of the Godavari and Ganga basins *within India* and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_12_003', difficulty: 'standard',
          question: 'The ICAR (Indian Council of Agricultural Research) classification categorizes.',
          hint: 'Review c11_geo_cbse_12_001 (Pedogenesis) focusing on the \'climate\' and \'parent material\'.',
          misconception: 'Students believe "Red soil is red because of iron oxide, so Laterite soil (also red) is just a wetter version of Red.',
          parts: [
                { id: 'a', prompt: 'Explain why the ICAR classification uses \'genesis\' (mode of formation) as a primary criterion instead of just colour or texture, using the example of Alluvial.', answer: 'Genesis reflects the fundamental processes (fluvial deposition vs',
                  options: ['Genesis reflects the fundamental processes (fluvial deposition vs', 'colour is enough'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Red soil is red because of iron oxide, so Laterite soil (also red) is just a wetter version of Red soil." This is.' }
          ],
            remediations: { 'red-soil-is-red-because': { steps: ['Revisit c11_geo_cbse_12_001 (Pedogenesis) – specifically the \'climate\' and \'parent material\' factors.', 'On an outline map, plot rainfall isohyets (80 cm, 200 cm) and major rock types (granite, basalt).', 'Overlay ICAR soil map.', 'Trace the logic: High rain + basalt/gneiss → intense leaching → Laterite.', 'Write a 3-sentence distinction in your notebook using the terms \'leaching\', \'oxidation\', and \'pisolitic\'.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
