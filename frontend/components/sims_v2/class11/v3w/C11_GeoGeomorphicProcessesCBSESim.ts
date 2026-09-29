import type { SimDef } from '../../engine/types';
import C11_GeoGeomorphicProcessesCBSESim from '../../../simulations/c6_12_new/C11_GeoGeomorphicProcessesCBSESim';

/** v3 wrapped master — C11_GeoGeomorphicProcessesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geogeomorphicprocessescbsesim: SimDef = {
    id: 'v3w_c11_geogeomorphicprocessescbsesim',
    title: 'Geomorphic Processes: Endogenic and Exogenic Classification',
    subtitle: 'Covers the fundamental classification framework of geomorphic processes (endogenic vs.',
    classLevel: 11, subject: 'science', topic: 'Geomorphic Processes: Endogenic and Exogenic Classification',
    chapters: [],
    nodeIds: ['c11_geo_cbse_06_001', 'c11_geo_cbse_06_004', 'c11_geo_cbse_06_007', 'c11_geo_cbse_06_008', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_09_006', 'c11_geo_cbse_09_007', 'c11_geo_cbse_01_009', 'c11_geo_cbse_07_009', 'c11_geo_cbse_06_002', 'c11_geo_cbse_06_005', 'c11_geo_cbse_06_006', 'c11_geo_cbse_06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe the Aravalli hills near your city - they are ancient, rounded, and low compared to the sharp,.', goal: 'Master Geomorphic Processes: Endogenic and Exogenic Classification.' },
    discovery: {
        question: 'A student states: "Earthquakes are exogenic processes because they happen on the Earth\'s surface and destroy buildings." Is this classification correct?',
        options: ['No, earthquakes are endogenic processes', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
        answer: 'No, earthquakes are endogenic processes',
        hook: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.',
    },
    teaching: [
        { title: 'Geomorphic processes are the physical and.', text: 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface, classified by their energy source: endogenic processes derive energy from Earth\'s interior (radioactive decay,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_001', title: 'Geomorphic processes are the physical.',
          scaffold: { problem: 'The Western Ghats escarpment shows evidence of both endogenic and exogenic processes.',
            steps: [
            { text: 'Identify endogenic feature - fault scarp offsetting Deccan Traps indicates tectonic uplift along Western Ghats fault.' },
            { text: 'Calculate long-term uplift rate: 15 m / 65 Myr = 0.00023 mm/yr (very slow, but persistent).' },
            { text: 'Identify exogenic feature - 20 m laterite profile represents intense chemical weathering under tropical climate.' },
            { text: 'Calculate weathering rate: 20 m / 65 Myr = 0.00031 mm/yr (comparable to uplift rate).' },
            { text: 'Compare with modern river incision (0.3 mm/yr) - current exogenic denudation far exceeds long-term averages due to.' },
            { text: 'Synthesize: Landscape shaped by slow endogenic uplift creating relief, exploited by intense exogenic.', faded: true, blankAnswer: 'Over 65 Myr, endogenic uplift (0.00023 mm/yr) and exogenic.' }
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_007', title: 'Biological weathering is the.',
          scaffold: { problem: 'A granitic outcrop in the Bangalore urban area shows deep cracks with banyan tree roots growing inside.',
            steps: [
            { text: 'Identify the rock type (granite) and its mineral composition (quartz, feldspar, mica) which determines susceptibility.' },
            { text: 'Analyze physical weathering by plant roots: root wedging exerts pressure (up to several atmospheres) widening joints.' },
            { text: 'Analyze chemical weathering by lichens: they secrete oxalic acid and chelating agents that dissolve feldspar and mica,.' },
            { text: 'Consider human context: urban pollution (acid rain) may accelerate chemical weathering; root growth may damage.' },
            { text: 'Predict sequence: cracks widen -> rock blocks detach -> soil accumulates in cracks -> more vegetation establishes ->.', faded: true, blankAnswer: 'The granitic outcrop undergoes simultaneous root wedging.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_008', title: 'Mass movement is the downslope movement.',
          scaffold: { problem: 'A hillside in Darjeeling district has a 35° slope, 3 m thick colluvial soil overlying phyllite bedrock with joints dipping 20° into the.',
            steps: [
            { text: 'Identify the movement type from speed (100 m in 2 min = 3 km/h) and coherent block behaviour → Landslide (translational.' },
            { text: 'Recall the shear stress/shear strength framework: τ = γ h sinθ cosθ, S = c + (γ h cos²θ - u) tanφ.' },
            { text: 'Analyse slope: 35° is steep → high sinθ → high driving stress τ.' },
            { text: 'Analyse lithology/structure: Phyllite with joints dipping into slope provides a pre-existing weak plane (low c, low φ).' },
            { text: 'Analyse rainfall: 200 mm infiltrates, raises pore pressure u → reduces effective normal stress (γ h cos²θ - u) → lowers.' },
            { text: 'Synthesise: High τ from steep slope + low S from weak plane + high u from rain → τ > S → failure.', faded: true, blankAnswer: 'Translational landslide. Steep slope increases driving.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_004', title: 'Physical Geography is the branch of.',
          scaffold: { problem: 'A Class 11 student is asked: "The Thar Desert has sand dunes, extreme temperatures, low rainfall, sparse xerophytic vegetation, and saline.',
            steps: [
            { text: 'Identify the five features: (a) sand dunes, (b) extreme temperatures, (c) low rainfall, (d) xerophytic vegetation, (e).' },
            { text: 'Recall the six sub-branches and their core domains: Geomorphology (landforms), Climatology (weather/climate), Hydrology.' },
            { text: 'Match each feature to its primary sub-branch: (a) sand dunes → Geomorphology (aeolian deposition); (b) extreme.' },
            { text: 'Establish the process linkages: Climatology (low rainfall, high evaporation) → drives Geomorphology (aeolian processes.' },
            { text: 'Verify completeness: All five features assigned; processes flow from climate (driver) to landform/soil/vegetation.' },
            { text: 'Interpret geographically: The Thar Desert is a coupled system where Climatology is the primary driver, but.', faded: true, blankAnswer: 'Sand dunes — Geomorphology (aeolian deposition); Extreme.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_007', title: 'Geography\'s relation with natural.',
          caseStudy: { intro: 'Stand on the Marina Beach in Chennai at noon in May and feel the intense heat on your skin — that is solar radiation (Physics) interacting with the coastal.',
            decisions: [{ prompt: 'Name the two specific laws of physics that directly explain why the equator receives more annual insolation than the poles, and state the.', options: [
                { text: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with', outcome: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with Lambert\'s.' },
                { text: 'distance from sun', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' },
                { text: 'volcanoes', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' }
            ] }] } }
    ],
    explore: { component: C11_GeoGeomorphicProcessesCBSESim, prompt: 'Explore the interactive — Geomorphic Processes: Endogenic and Exogenic Classification' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_001', difficulty: 'standard',
          question: 'Geomorphic processes are the physical and chemical actions that modify Earth\'s.',
          hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere,.',
          misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'A student states: "Earthquakes are exogenic processes because they happen on the Earth\'s surface and destroy buildings." Is this classification correct?', answer: 'No, earthquakes are endogenic processes',
                  options: ['No, earthquakes are endogenic processes', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' },
                { id: 'b', prompt: 'Explain why chemical weathering of limestone by carbonic acid (H₂CO₃) is classified as an exogenic process, even though the carbon dioxide comes from both.', answer: 'Chemical weathering is exogenic',
                  options: ['Chemical weathering is exogenic', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' }
          ],
            remediations: { 'endogenic-constructive': { steps: ['Draw a two-column table: Column A "Energy Source: Earth\'s Interior" (radioactive decay, primordial heat), Column B.', 'Place each process in correct column by tracing its energy: magma rise → mantle heat (A); river flow → solar.', 'For each, ask "If Sun disappeared, would this stop?" If yes → exogenic. If no → endogenic.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If solar radiation stopped tomorrow, all exogenic processes would cease immediately, but endogenic processes would continue unchanged.', answer: 'Largely accurate',
                  options: ['Largely accurate', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' },
                { id: 'b', prompt: 'Design a field observation checklist for a Class 11 student visiting a local river valley to identify evidence of both endogenic and exogenic processes.', answer: 'Good checklist: 1) River terraces at multiple levels - indicates tectonic uplift',
                  options: ['Good checklist: 1) River terraces at multiple levels - indicates tectonic uplift', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' }
          ],
            remediations: { 'endogenic-constructive': { steps: ['Draw a two-column table: Column A "Energy Source: Earth\'s Interior" (radioactive decay, primordial heat), Column B.', 'Place each process in correct column by tracing its energy: magma rise → mantle heat (A); river flow → solar.', 'For each, ask "If Sun disappeared, would this stop?" If yes → exogenic. If no → endogenic.'] } } },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_007', difficulty: 'standard',
          question: 'Biological weathering is the disintegration and decomposition of rocks and.',
          hint: 'If stuck, revisit the chemical weathering node (c11_geo_cbse_06_006) to review how acids.',
          misconception: 'Students often think biological weathering is only about plant roots breaking rocks (physical), ignoring the chemical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biological weathering is the disintegration and decomposition of rocks and minerals',
                  options: ['Biological weathering is the disintegration and decomposition of rocks and minerals', 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface,', 'Weathering is the in-situ disintegration and decomposition of rocks and minerals at or', 'Mass movement is the downslope movement of rock, soil, and debris under the direct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think biological weathering is only about plant roots breaking rocks (physical), ignoring the chemical role of organic acids.' }
          ],
            remediations: { 'biological-weathering-is-only-about': { steps: ['If the student holds this misconception, conduct a lab demonstration: place limestone chips in two beakers – one with.', 'Observe faster dissolution in the acid beaker.', 'Then show images of lichen-covered rocks with pitted surfaces.', 'Finally, discuss how human activities (like acid mine drainage) mimic natural biological acid production.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_008', difficulty: 'standard',
          question: 'Mass movement is the downslope movement of rock, soil, and debris under the.',
          hint: 'If stuck, revisit c11_geo_cbse_06_004 (weathering overview) and c11_geo_cbse_06_001.',
          misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a.',
          parts: [
                { id: 'a', prompt: 'Explain why earthflows are more common in humid regions with thick clay-rich regolith, whereas landslides dominate in steep, jointed bedrock areas like the.', answer: 'Earthflows require fine-grained, water-saturated material that behaves viscously',
                  options: ['Earthflows require fine-grained, water-saturated material that behaves viscously', 'earthflows happen only in deserts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a landslide.' },
                { id: 'b', prompt: 'Compare the spatial distribution of "Very High Vulnerability" landslide zones in the Himalayas versus the Western Ghats using the controlling factors: geology,.', answer: 'Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks',
                  options: ['Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks', 'only rainfall matters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a landslide.' }
          ],
            remediations: { 'students-often-treat-landslide-as': { steps: ['Show side-by-side video clips (15 sec each) of a Himalayan rockslide, a Nilgiri earthflow, a Western Ghats mudflow, and.', 'Have students fill a 4-column table: Speed, Water %, Material, Shape.', 'Use a simple shear box analogy: push a block (landslide), squeeze toothpaste (earthflow), pour slurry (mudflow), lean a.', 'Re-attempt Diagnostic Q3 with the table as reference.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a.',
          parts: [
                { id: 'a', prompt: 'Compare the spatial distribution of "Very High Vulnerability" landslide zones in the Himalayas versus the Western Ghats using the controlling factors: geology,.', answer: 'Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks',
                  options: ['Himalayas: young, tectonically active, jointed sedimentary/metamorphic rocks', 'only rainfall matters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "landslide" as a synonym for all mass movements, calling any downslope movement of mud a landslide.' }
          ],
            remediations: { 'students-often-treat-landslide-as': { steps: ['Show side-by-side video clips (15 sec each) of a Himalayan rockslide, a Nilgiri earthflow, a Western Ghats mudflow, and.', 'Have students fill a 4-column table: Speed, Water %, Material, Shape.', 'Use a simple shear box analogy: push a block (landslide), squeeze toothpaste (earthflow), pour slurry (mudflow), lean a.', 'Re-attempt Diagnostic Q3 with the table as reference.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that systematically studies the.',
          hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each in one phrase.', answer: 'The six major sub-branches are: (1) Geomorphology',
                  options: ['The six major sub-branches are: (1) Geomorphology', 'Meteorology', 'Climatology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'b', prompt: 'A student claims: "Physical Geography only studies static features like mountains and rivers; it does not deal with processes." Using the definition of any two.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'c', prompt: 'The Brahmaputra River forms a large delta in Bangladesh. Identify which THREE sub-branches of Physical Geography are directly involved in explaining this.', answer: 'The three sub-branches are: (1) Geomorphology',
                  options: ['The three sub-branches are: (1) Geomorphology', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Oceanography should be considered a separate discipline, not a sub-branch of Physical Geography, because it has its own theories,.', answer: 'Against the statement',
                  options: ['Against the statement', 'Hydrology', 'Oceanography', 'plant geography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
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
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
