import type { SimDef } from '../../engine/types';
import C11_GeoLandformsEvolutionCBSESim from '../../../simulations/c6_12_new/C11_GeoLandformsEvolutionCBSESim';

/** v3 wrapped master — C11_GeoLandformsEvolutionCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geolandformsevolutioncbsesim: SimDef = {
    id: 'v3w_c11_geolandformsevolutioncbsesim',
    title: 'Fluvial Processes: River Erosion Mechanisms',
    subtitle: 'Covers the four mechanical and chemical erosion processes in river channels with Indian.',
    classLevel: 11, subject: 'science', topic: 'Fluvial Processes: River Erosion Mechanisms',
    chapters: [],
    nodeIds: ['c11_geo_cbse_07_001', 'c11_geo_cbse_06_002', 'c11_geo_cbse_06_004', 'c11_geo_cbse_09_006', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_07_009', 'c11_geo_cbse_07_004', 'c11_geo_cbse_07_005', 'c11_geo_cbse_07_006', 'c11_geo_cbse_07_007', 'c11_geo_cbse_07_008', 'c11_geo_cbse_06_007', 'c11_geo_cbse_09_005', 'c11_geo_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Stand on a bridge over the Yamuna near Delhi during monsoon and observe the turbid, sediment-laden water.', goal: 'Master Fluvial Processes: River Erosion Mechanisms.' },
    discovery: {
        question: 'Define hydraulic action in fluvial erosion and state the specific condition of bedrock that makes it most effective.',
        options: ['Hydraulic action is the sheer force of moving water dislodging and removing rock', 'hydraulic action is sandpaper-like grinding', 'corrasion'],
        answer: 'Hydraulic action is the sheer force of moving water dislodging and removing rock',
        hook: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion.',
    },
    teaching: [
        { title: 'Fluvial erosion mechanisms are the four.', text: 'Fluvial erosion mechanisms are the four primary processes by which flowing river water mechanically wears away and removes bedrock and sediment from the channel bed and banks: hydraulic action (force.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_07_001', title: 'Fluvial erosion mechanisms are the four.',
          scaffold: { problem: 'The upper Bhagirathi (Ganga headwater) flows at 3.2 m/s over jointed granite with a discharge of 180 m³/s, slope 0.012, width 45 m.',
            steps: [
            { text: 'Identify given parameters: ρ = 1000 kg/m³, g = 9.8 m/s², Q = 180 m³/s, S = 0.012, w = 45 m.' },
            { text: 'Apply stream power formula ω = ρgQS/w = (1000 × 9.8 × 180 × 0.012) / 45.' },
            { text: 'Calculate numerator: 1000 × 9.8 = 9800; 9800 × 180 = 1,764,000; 1,764,000 × 0.012 = 21,168.' },
            { text: 'Divide by width: 21,168 / 45 = 470.4 W/m².' },
            { text: 'Interpret: ω = 470 W/m² is high (threshold for bedrock erosion ~100-200 W/m²).' },
            { text: 'Conclude: Abrasion dominates because high stream power mobilizes coarse tools that can grind the resistant granite,.', faded: true, blankAnswer: 'ω = 470.4 W/m²; abrasion dominates due to high stream.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_002', title: 'Diastrophism encompasses all endogenic.',
          scaffold: { problem: 'A geologist observes a region with broad, gentle warping of ancient crystalline rocks over 500 km, no major folding, and a history of slow.',
            steps: [
            { text: 'Identify the key observations: scale (500 km vs 100 km), deformation style (gentle warping vs tight folds/faults), and.' },
            { text: 'Recall that epeirogenic movements are large-scale, slow, vertical, producing broad warps; orogenic movements are.' },
            { text: 'Match Region 1 (500 km, gentle warping, 0.1 mm/yr) to epeirogenic movement → predicts broad plateau or basin.' },
            { text: 'Match Region 2 (100 km, tight folds/thrusts, 5 mm/yr) to orogenic movement → predicts fold mountain belt.' },
            { text: 'Verify with Indian examples: Region 1 resembles Peninsular Plateau (epeirogenic); Region 2 resembles Himalayas.', faded: true, blankAnswer: 'Region 1: Epeirogenic movement → broad plateau/basin (e.g.,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_004', title: 'Weathering is the in-situ.',
          scaffold: { problem: 'A roadcut on NH-48 near Pune exposes 15 m of decomposed basalt (laterite) overlying fresh basalt.',
            steps: [
            { text: 'Identify the weathering front depth — the boundary between laterite (weathered) and fresh basalt is at 15 m depth.' },
            { text: 'Recognize that in tropical humid climates, chemical weathering dominates and the weathering front propagates downward.' },
            { text: 'Recall the empirical weathering rate for basalt under tropical conditions: 20 m/Ma (metres per million years) from.' },
            { text: 'Calculate minimum time = weathering front depth / weathering rate = 15 m / 20 m/Ma = 0.75 Ma = 750,000 years.' },
            { text: 'Consider complicating factors: (a) Initial weathering may be faster on fresh fractures; (b) Erosion may have stripped.' },
            { text: 'Interpret: The profile represents at least 0.75 Ma of landscape stability — consistent with the Western Ghats being a.', faded: true, blankAnswer: 'Minimum 750,000 years (0.75 Ma). The actual time is likely.' }
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
        { type: 'case', nodeId: 'c11_geo_cbse_01_007', title: 'Geography\'s relation with natural.',
          caseStudy: { intro: 'Stand on the Marina Beach in Chennai at noon in May and feel the intense heat on your skin — that is solar radiation (Physics) interacting with the coastal.',
            decisions: [{ prompt: 'Name the two specific laws of physics that directly explain why the equator receives more annual insolation than the poles, and state the.', options: [
                { text: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with', outcome: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with Lambert\'s.' },
                { text: 'distance from sun', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' },
                { text: 'volcanoes', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_010', title: 'Physical Geography is the branch of.',
          scaffold: { problem: 'Explain the formation of the Indo-Gangetic Plain using concepts from both Geomorphology and Climatology.',
            steps: [
            { text: 'Identify the geomorphological driver — convergent collision of Indian and Eurasian plates (c9_geo_ch1_2) uplifted the.' },
            { text: 'Identify the climatological driver — the uplifted Himalayas altered atmospheric circulation, intensifying the South.' },
            { text: 'Link to exogenic geomorphic processes — the intensified monsoon rainfall increased chemical and physical weathering.' },
            { text: 'Trace sediment transport — the Ganga, Indus, and Brahmaputra river systems (exogenic agents) transported this sediment.' },
            { text: 'Recognize the feedback loop — sediment accumulation depressed the crust further (isostasy), creating more accommodation.' },
            { text: 'Synthesize — the Indo-Gangetic Plain is a *product* of the interaction: tectonics provided the relief and basin,.', faded: true, blankAnswer: 'The Indo-Gangetic Plain formed by the deposition of.' }
            ] } }
    ],
    explore: { component: C11_GeoLandformsEvolutionCBSESim, prompt: 'Explore the interactive — Fluvial Processes: River Erosion Mechanisms' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_001', difficulty: 'standard',
          question: 'Fluvial erosion mechanisms are the four primary processes by which flowing.',
          hint: 'Review the graded long profile concept from Class 9 (c9_geo_ch1_8) and the relationship.',
          misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion.',
          parts: [
                { id: 'a', prompt: 'Define hydraulic action in fluvial erosion and state the specific condition of bedrock that makes it most effective.', answer: 'Hydraulic action is the sheer force of moving water dislodging and removing rock',
                  options: ['Hydraulic action is the sheer force of moving water dislodging and removing rock', 'hydraulic action is sandpaper-like grinding', 'corrasion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' },
                { id: 'b', prompt: 'A river reach has a mean velocity of 2.5 m/s, carries a suspended load of 1200 ppm and bedload of 30% quartz pebbles (D50 = 45 mm) over a sandstone bedrock.', answer: 'ω = (1000 × 9.8 × 850 × 0.0015) / 120 = 105.4 W/m²',
                  options: ['ω = (1000 × 9.8 × 850 × 0.0015) / 120 = 105.4 W/m²', 'corrasion', 'corrosion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' }
          ],
            remediations: { 'corrasion-and-corrosion-are-synonyms': { steps: ['Create a 4-column table (Process, Agent, Action on Bedrock, Action on Sediment) and fill it using the definitions above.', 'Watch a 2-minute video of flume experiments showing each process in isolation (search "fluvial erosion processes.', 'Collect 10 pebbles from a local stream, measure roundness (Power\'s scale), and plot roundness vs.', 'Re-attempt Diagnostic Questions 1-2.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Solution erosion is negligible in Indian rivers except in limestone terrains." Consider the chemical composition of major Indian river.', answer: 'The statement is false',
                  options: ['The statement is false', 'corrasion', 'corrosion', 'attrition erodes the river bed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "corrasion" and "corrosion" are synonyms for the same process, or that attrition is a bedrock erosion mechanism.' }
          ],
            remediations: { 'corrasion-and-corrosion-are-synonyms': { steps: ['Create a 4-column table (Process, Agent, Action on Bedrock, Action on Sediment) and fill it using the definitions above.', 'Watch a 2-minute video of flume experiments showing each process in isolation (search "fluvial erosion processes.', 'Collect 10 pebbles from a local stream, measure roundness (Power\'s scale), and plot roundness vs.', 'Re-attempt Diagnostic Questions 1-2.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_002', difficulty: 'standard',
          question: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust.',
          hint: 'Review plate boundary types (convergent, divergent) and the concept of endogenic forces.',
          misconception: 'Students often think that epeirogenic movements only cause uplift and orogenic movements only cause mountain building,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through',
                  options: ['Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through', 'Fluvial erosion mechanisms are the four primary processes by', 'Weathering is the in-situ disintegration and decomposition of rocks and minerals at or', 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern India,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that epeirogenic movements only cause uplift and orogenic movements only cause mountain building, ignoring that.' }
          ],
            remediations: { 'epeirogenic-movements-only-cause-uplift': { steps: ['Use a physical model (clay layers) to demonstrate horizontal compression creating folds (orogenic) vs.', 'On an outline map of India, shade the Himalayan zone and label "Horizontal Compression → Folding/Faulting".', 'Draw a simple cross-section showing the Himalayan foreland basin subsidence as a vertical downwarp caused by horizontal.', 'Practice explaining the difference using the keywords: "direction of force", "scale", "landform", and "example".'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_004', difficulty: 'standard',
          question: 'Weathering is the in-situ disintegration and decomposition of rocks and.',
          hint: 'If stuck, revisit c11_geo_cbse_06_001 and draw the endogenic-exogenic flowchart with.',
          misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost.',
          parts: [
                { id: 'a', prompt: 'Define weathering in one sentence and state the single criterion that distinguishes it from erosion.', answer: 'Weathering is the in-situ mechanical disintegration and chemical',
                  options: ['Correct answer: Weathering is the in-situ mechanical disintegration and chemical', 'transport', 'movement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' },
                { id: 'b', prompt: 'Given two locations — (A) Bangalore (granite bedrock, tropical savanna climate, 900 mm rainfall) and (B) Leh (granite bedrock, cold desert climate, 100 mm.', answer: 'Correct answer with steps: Step 1: Identify rock type is same (granite)',
                  options: ['Correct answer with steps: Step 1: Identify rock type is same (granite)', 'weathering = physical breaking of rocks by temperature changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' }
          ],
            remediations: { 'weathering-physical-breaking-of-rocks': { steps: ['Revisit Class 9 node c9_geo_ch1_7 (Weathering: Physical, Chemical and Biological) and create a three-column table.', 'On a political map of India, mark Bangalore, Leh, Mumbai, and Jaisalmer; annotate each with mean annual temperature,.', 'Conduct the "vinegar on limestone" demo (chemical) vs. "freeze-thaw in plastic bottle" demo (physical) — time each to.', 'Write a 100-word explanation of why the same granite forms tors in Hyderabad but laterite in Kerala — this forces.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Weathering is a destructive process that only degrades landforms." Provide a counter-argument using the concept of constructive.', answer: 'Correct evaluation: The statement is incomplete',
                  options: ['Correct evaluation: The statement is incomplete', 'weathering = physical breaking of rocks by temperature changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' },
                { id: 'b', prompt: 'Design a field investigation to determine whether physical or chemical weathering dominates on a given sandstone outcrop near your school.', answer: 'Good answer criteria: - Indicator 1: Surface texture analysis (hand lens)',
                  options: ['Good answer criteria: - Indicator 1: Surface texture analysis (hand lens)', 'weathering = physical breaking of rocks by temperature changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' }
          ],
            remediations: { 'weathering-physical-breaking-of-rocks': { steps: ['Revisit Class 9 node c9_geo_ch1_7 (Weathering: Physical, Chemical and Biological) and create a three-column table.', 'On a political map of India, mark Bangalore, Leh, Mumbai, and Jaisalmer; annotate each with mean annual temperature,.', 'Conduct the "vinegar on limestone" demo (chemical) vs. "freeze-thaw in plastic bottle" demo (physical) — time each to.', 'Write a 100-word explanation of why the same granite forms tors in Hyderabad but laterite in Kerala — this forces.'] } } },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'standard',
          question: 'Geography\'s relation with natural sciences refers to the interdisciplinary.',
          hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2) for geological mechanisms and.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'APPLY: Using the hypsometric formula ΔP/Δz = -ρg and the dry adiabatic lapse rate (DALR = 9.8°C/km), calculate the temperature at the summit of Doddabetta.', answer: 'Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km',
                  options: ['Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "The Indian monsoon is purely a thermal phenomenon driven by differential heating of land and sea; geological factors like the Himalaya and Tibetan.', answer: 'Correct evaluation: Statement is false',
                  options: ['Correct evaluation: Statement is false', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_010', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that studies the natural features.',
          hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global.',
          misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate.',
          parts: [
                { id: 'a', prompt: 'Name the two primary sub-fields of Physical Geography discussed in this node and give one key process studied in each.', answer: 'The two primary sub-fields are Geomorphology and Climatology',
                  options: ['The two primary sub-fields are Geomorphology and Climatology', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'b', prompt: 'Explain why the windward side of the Western Ghats receives heavy rainfall while the leeward side remains relatively dry, using concepts from both.', answer: 'The Western Ghats act as a geomorphological barrier (orographic lift) forcing',
                  options: ['The Western Ghats act as a geomorphological barrier (orographic lift) forcing', 'mountains block rain', 'mountains are just there, and climate happens to them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'c', prompt: 'A student claims that the Thar Desert exists solely because of low rainfall (climatology).', answer: 'The claim is incomplete',
                  options: ['The claim is incomplete', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' }
          ],
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists a.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Climatology is only about recording temperature and rainfall data." Provide a counter-argument using the concept of atmospheric.', answer: 'The statement reduces Climatology to mere data collection (meteorology)',
                  options: ['The statement reduces Climatology to mere data collection (meteorology)', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' }
          ],
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists a.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
