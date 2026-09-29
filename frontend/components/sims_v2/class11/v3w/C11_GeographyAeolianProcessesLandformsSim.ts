import type { SimDef } from '../../engine/types';
import C11_GeographyAeolianProcessesLandformsSim from '../../../simulations/c6_12/C11_GeographyAeolianProcessesLandformsSim';

/** v3 wrapped master — C11_GeographyAeolianProcessesLandformsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyaeolianprocesseslandformssim: SimDef = {
    id: 'v3w_c11_geographyaeolianprocesseslandformssim',
    title: 'Erosion and Deposition: Agents (Water, Wind, Ice) and Processes',
    subtitle: 'Covers the three primary exogenic agents (fluvial, aeolian, glacial) and their.',
    classLevel: 11, subject: 'geography', topic: 'Erosion and Deposition: Agents (Water, Wind, Ice) and Processes',
    chapters: [],
    nodeIds: ['c11_geo_cbse_06_009', 'c11_geo_cbse_07_008', 'c11_geo_cbse_07_005', 'c11_geo_cbse_09_001', 'c11_geo_cbse_06_002', 'c11_geo_cbse_06_004', 'c11_geo_cbse_06_005', 'c11_geo_cbse_07_001', 'c11_geo_cbse_07_004', 'c11_geo_cbse_07_006', 'c11_geo_cbse_07_007', 'c11_geo_cbse_06_003', 'c11_geo_cbse_09_006', 'c11_geo_cbse_09_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Stand at a riverbank during monsoon and watch the muddy water rushing past — that brown colour is not "dirty.', goal: 'Master Erosion and Deposition: Agents (Water, Wind, Ice) and Processes.' },
    discovery: {
        question: 'A river channel has a width of 30 m, mean depth of 2.5 m, and slope of 0.001.',
        options: ['Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m', 'erosion only happens during floods/high energy events', 'deposition only happens in calm water'],
        answer: 'Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m',
        hook: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water.".',
    },
    teaching: [
        { title: 'Erosion is the detachment, entrainment, and.', text: 'Erosion is the detachment, entrainment, and transport of weathered rock material and regolith by mobile agents (running water, wind, glacial ice, waves) driven by gravity and kinetic energy;.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_009', title: 'Erosion is the detachment, entrainment,.',
          scaffold: { problem: 'The Brahmaputra River at Guwahati has a monsoon discharge of 55,000 m³/s, channel width 8 km, slope 0.00008.',
            steps: [
            { text: 'Identify given values: Q = 55,000 m³/s, W = 8000 m, S = 0.00008, ρ = 1000 kg/m³, g = 9.8 m/s²' },
            { text: 'Apply stream power formula ω = ρgQS / W' },
            { text: 'Compute numerator: 1000 × 9.8 × 55,000 × 0.00008 = 43,120,000' },
            { text: 'Divide by width: 43,120,000 / 8000 = 5,390 W/m²' },
            { text: 'Compare with critical: 5,390 W/m² >> 150 W/m² → massive excess energy' },
            { text: 'Interpret: Brahmaputra\'s enormous discharge compensates for low slope, giving it extreme erosive power — explains its.', faded: true, blankAnswer: 'ω = 5,390 W/m²; far exceeds ω_c for 50 mm gravel (150.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_07_008', title: 'Aeolian landforms are erosional and.',
          scaffold: { problem: 'During a field trip to the Sam Sand Dunes (Jaisalmer), you observe a crescent-shaped dune with its horns pointing NE.',
            steps: [
            { text: 'Recognize the crescent shape with horns pointing downwind as a barchan dune.' },
            { text: 'Note horns point NE → prevailing wind is from SW (wind blows from SW to NE).' },
            { text: 'Confirm asymmetry: gentle windward slope (12°) vs. steep leeward slip face (32°) matches barchan morphology.' },
            { text: 'Explain slip face angle: it equals the angle of repose for dry sand (~30–34°), the maximum stable slope for loose.' },
            { text: 'Verify limited sand supply: dune sits on hard desert pavement (visible between dunes), not a sand sea.' },
            { text: 'Conclude: This is a classic barchan formed by unidirectional SW winds (e.g., summer monsoon winds or winter westerlies).', faded: true, blankAnswer: 'Barchan dune; prevailing wind from SW; slip face at angle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_07_005', title: 'Karst topography is a distinctive.',
          scaffold: { problem: 'A limestone plateau in Meghalaya receives 12,000 mm annual rainfall. Soil pCO₂ is 0.05 atm (vs. atmospheric 0.0004 atm).',
            steps: [
            { text: 'Identify that dissolution rate is proportional to [H₂CO₃], which by Henry\'s law is [H₂CO₃] = k_H × pCO₂.' },
            { text: 'Calculate [H₂CO₃] in soil water: (3.3×10⁻² mol/L·atm) × 0.05 atm = 1.65×10⁻³ mol/L.' },
            { text: 'Calculate [H₂CO₃] in rainwater (atmospheric equilibrium): (3.3×10⁻²) × 0.0004 = 1.32×10⁻⁵ mol/L.' },
            { text: 'Compute enhancement factor = (1.65×10⁻³) / (1.32×10⁻⁵) = 125.' },
            { text: 'Interpret — soil CO₂ enhances dissolution ~125× over pure rainwater; this explains why tropical karst (high soil.' },
            { text: 'Verify with real data — Meghalaya\'s caves (e.g., Krem Liat Prah) are among the world\'s longest, consistent with high.', faded: true, blankAnswer: 'Enhancement factor ≈ 125×. This quantifies why Meghalaya\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_001', title: 'Physiographic divisions of India refer.',
          scaffold: { problem: 'A Class 11 student is given a geological cross-section along 28°N latitude showing: (1) Siwalik Hills (Neogene molasse), (2) Main Boundary.',
            steps: [
            { text: 'Recall that physiographic divisions are defined by **major crustal-scale boundaries**, not individual thrust faults.' },
            { text: 'Identify the **Main Frontal Thrust (MFT)** — the southernmost thrust that emplaces Siwaliks over the alluvial plains.' },
            { text: 'Note that the **Northern Plains** begin where the **basement (Precambrian)** is buried beneath >1 km of Quaternary.' },
            { text: 'The **Himalayan Mountains** division includes everything north of the MFT: Siwaliks, Lesser, Greater, and Tethyan.' },
            { text: 'Verify: The MFT coincides with a sharp break in slope (mountain front), seismicity, and GPS velocity gradient —.', faded: true, blankAnswer: 'The physiographic boundary is the **Main Frontal Thrust.' }
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
        { type: 'dissect', nodeId: 'c11_geo_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Erosion and Deposition: Agents (Water, Wind, Ice) and Processes', spots: [
            { id: 's1', label: 'Erosion is the detachment entrainment', prompt: 'Which idea is this? — Erosion is the detachment, entrainment, and transport of weathered rock material and.', answer: 'Erosion is the detachment entrainment', options: ['Erosion is the detachment entrainment', 'Aeolian landforms are erosional and', 'Karst topography is a distinctive', 'Physiographic divisions of India refer'] },
            { id: 's2', label: 'Aeolian landforms are erosional and', prompt: 'Which idea is this? — Aeolian landforms are erosional and depositional features shaped by wind action in arid.', answer: 'Aeolian landforms are erosional and', options: ['Aeolian landforms are erosional and', 'Erosion is the detachment entrainment', 'Karst topography is a distinctive', 'Physiographic divisions of India refer'] },
            { id: 's3', label: 'Karst topography is a distinctive', prompt: 'Which idea is this? — Karst topography is a distinctive landscape formed by the chemical dissolution of soluble.', answer: 'Karst topography is a distinctive', options: ['Karst topography is a distinctive', 'Erosion is the detachment entrainment', 'Aeolian landforms are erosional and', 'Physiographic divisions of India refer'] },
            { id: 's4', label: 'Physiographic divisions of India refer', prompt: 'Which idea is this? — Physiographic divisions of India refer to the classification of the Indian landmass into.', answer: 'Physiographic divisions of India refer', options: ['Physiographic divisions of India refer', 'Erosion is the detachment entrainment', 'Aeolian landforms are erosional and', 'Karst topography is a distinctive'] },
            { id: 's5', label: 'Diastrophism encompasses all endogenic processes', prompt: 'Which idea is this? — Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through.', answer: 'Diastrophism encompasses all endogenic processes', options: ['Diastrophism encompasses all endogenic processes', 'Erosion is the detachment entrainment', 'Aeolian landforms are erosional and', 'Karst topography is a distinctive'] },
            { id: 's6', label: 'Weathering is the in-situ disintegration', prompt: 'Which idea is this? — Weathering is the in-situ disintegration and decomposition of rocks and minerals at or.', answer: 'Weathering is the in-situ disintegration', options: ['Weathering is the in-situ disintegration', 'Erosion is the detachment entrainment', 'Aeolian landforms are erosional and', 'Karst topography is a distinctive'] }
          ] } }
    ],
    explore: { component: C11_GeographyAeolianProcessesLandformsSim, prompt: 'Explore the interactive — Erosion and Deposition: Agents (Water, Wind, Ice) and Processes' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_009', difficulty: 'standard',
          question: 'Erosion is the detachment, entrainment, and transport of weathered rock.',
          hint: 'Revisit c11_geo_cbse_06_004 (weathering definition) and c9_geo_ch1_8/9 (Class 9.',
          misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water.".',
          parts: [
                { id: 'a', prompt: 'A river channel has a width of 30 m, mean depth of 2.5 m, and slope of 0.001.', answer: 'Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m',
                  options: ['Step 1: Hydraulic radius R = A/P = (30×2.5)/(30+2×2.5) = 75/35 = 2.14 m', 'erosion only happens during floods/high energy events', 'deposition only happens in calm water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water." In reality, erosion.' }
          ],
            remediations: { 'erosion-only-happens-during-floods': { steps: ['Take a transparent stream table (or gutter with sand) and run water at constant discharge.', 'Observe simultaneously: erosion at outer bank, deposition at inner bank, mid-channel bars forming and migrating.', 'Map velocity contours with floats — show high velocity (erosion) and low velocity (deposition) coexisting.', 'Relate to Hjulström curve — same flow velocity erodes sand on cut bank but deposits silt on point bar because critical.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Wind is an ineffective agent of erosion compared to water because air density is 1/800th of water." Consider sediment transport modes,.', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'erosion only happens during floods/high energy events', 'deposition only happens in calm water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "erosion only happens during floods/high energy events" and "deposition only happens in calm water." In reality, erosion.' }
          ],
            remediations: { 'erosion-only-happens-during-floods': { steps: ['Take a transparent stream table (or gutter with sand) and run water at constant discharge.', 'Observe simultaneously: erosion at outer bank, deposition at inner bank, mid-channel bars forming and migrating.', 'Map velocity contours with floats — show high velocity (erosion) and low velocity (deposition) coexisting.', 'Relate to Hjulström curve — same flow velocity erodes sand on cut bank but deposits silt on point bar because critical.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_008', difficulty: 'standard',
          question: 'Aeolian landforms are erosional and depositional features shaped by wind action.',
          hint: 'Review Class 9 \'Erosion and Deposition by Sea Waves and Wind: Landforms\' (c9_geo_ch1_9).',
          misconception: 'Students often think all sand dunes are purely depositional features, ignoring that dune shape is sculpted by.',
          parts: [
                { id: 'a', prompt: 'Explain why mushroom rocks (pedestal rocks) develop a narrow base and broad top, and why abrasion is most effective within 1–2 metres of the ground.', answer: 'Mushroom rocks form',
                  options: ['Mushroom rocks form', 'wind erodes the top more', 'chemical weathering causes the shape'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think all sand dunes are purely depositional features, ignoring that dune shape is sculpted by simultaneous erosion on the.' }
          ],
            remediations: { 'all-sand-dunes-are-purely': { steps: ['Draw a cross-section of a barchan dune showing wind flow lines — accelerate over windward slope, separate at brink,.', 'Compare grain size charts: sand (0.06–2 mm) vs. silt (0.002–0.06 mm). Feel the difference: sand gritty, silt floury.', 'Sketch a mushroom rock with two rock layers (hard cap, soft base).', 'Use Google Earth to view barchan fields in the Thar (e.g., near Sam, 26.6°N 70.6°E) and trace dune migration over.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_005', difficulty: 'standard',
          question: 'Karst topography is a distinctive landscape formed by the chemical dissolution.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 1 "Weathering: Physical, Chemical and.',
          misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals.',
          parts: [
                { id: 'a', prompt: 'What is the chemical equation for the dissolution of limestone by carbonic acid, and why does this reaction require the presence of both carbon dioxide and.', answer: 'The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq)',
                  options: ['The reaction is: CaCO₃ (solid) + H₂CO₃ (aq) → Ca(HCO₃)₂ (aq)', 'limestone dissolves in plain water', 'dripping water depositing minerals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation,.' },
                { id: 'b', prompt: 'On a topographic map of a karst region (scale 1:50,000), you notice numerous closed depressions with hachured contour lines, no surface streams, and a cave.', answer: 'Depth = (300 - 260) m = 40 m (2 contour intervals × 20 m)',
                  options: ['Depth = (300 - 260) m = 40 m (2 contour intervals × 20 m)', 'streams are too small to map', 'arid climate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation,.' },
                { id: 'c', prompt: 'Compare the formation conditions of a stalactite and a stalagmite.', answer: 'Stalactites grow downward from the ceiling where dripping water loses CO₂ and',
                  options: ['Stalactites grow downward from the ceiling where dripping water loses CO₂ and', 'they grow fast like icicles', 'dripping water depositing minerals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation,.' }
          ],
            remediations: { 'stalactites-and-stalagmites-are-formed': { steps: ['Demonstrate the carbonation reaction in class — bubble CO₂ through water with universal indicator (pH drops), then add.', 'Use a syringe to show how pressure drop (simulating cave atmosphere) causes degassing.', 'Compare photos of evaporite crystals (geometric, sharp) vs. speleothems (smooth, layered) — link morphology to process.', 'Assign a map exercise identifying sinkhole types on Survey of India toposheets (e.g., 55M/12 for Kanger Valley) using.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Karst landscapes are unsuitable for intensive agriculture and dense human settlement." Consider soil development, water availability,.', answer: 'Partially true but context-dependent',
                  options: ['Partially true but context-dependent', 'karst is always barren', 'perfect for farming', 'dripping water depositing minerals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation,.' },
                { id: 'b', prompt: 'Design a field investigation plan to distinguish between a collapse sinkhole (doline) and a solution sinkhole in a limestone terrain near Chhattisgarh\'s Kanger.', answer: 'Criteria: (1) Rock exposure',
                  options: ['Criteria: (1) Rock exposure', 'dripping water depositing minerals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stalactites and stalagmites are formed by "dripping water depositing minerals" like salt crystals from evaporation,.' }
          ],
            remediations: { 'stalactites-and-stalagmites-are-formed': { steps: ['Demonstrate the carbonation reaction in class — bubble CO₂ through water with universal indicator (pH drops), then add.', 'Use a syringe to show how pressure drop (simulating cave atmosphere) causes degassing.', 'Compare photos of evaporite crystals (geometric, sharp) vs. speleothems (smooth, layered) — link morphology to process.', 'Assign a map exercise identifying sinkhole types on Survey of India toposheets (e.g., 55M/12 for Kanger Valley) using.'] } } },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_002', difficulty: 'standard',
          question: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust.',
          hint: 'Review plate boundary types (convergent, divergent) and the concept of endogenic forces.',
          misconception: 'Students often think that epeirogenic movements only cause uplift and orogenic movements only cause mountain building,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through',
                  options: ['Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through', 'Erosion is the detachment, entrainment, and transport of weathered rock material and', 'Aeolian landforms are erosional and depositional features shaped by wind action in arid', 'Karst topography is a distinctive landscape formed by the chemical dissolution of soluble'],
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
            remediations: { 'weathering-physical-breaking-of-rocks': { steps: ['Revisit Class 9 node c9_geo_ch1_7 (Weathering: Physical, Chemical and Biological) and create a three-column table.', 'On a political map of India, mark Bangalore, Leh, Mumbai, and Jaisalmer; annotate each with mean annual temperature,.', 'Conduct the "vinegar on limestone" demo (chemical) vs. "freeze-thaw in plastic bottle" demo (physical) — time each to.', 'Write a 100-word explanation of why the same granite forms tors in Hyderabad but laterite in Kerala — this forces.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
