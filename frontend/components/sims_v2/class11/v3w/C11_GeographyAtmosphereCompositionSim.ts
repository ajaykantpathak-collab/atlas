import type { SimDef } from '../../engine/types';
import C11_GeographyAtmosphereCompositionSim from '../../../simulations/c6_12/C11_GeographyAtmosphereCompositionSim';

/** v3 wrapped master — C11_GeographyAtmosphereCompositionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyatmospherecompositionsim: SimDef = {
    id: 'v3w_c11_geographyatmospherecompositionsim',
    title: 'Origin of the Solar System and the Sun',
    subtitle: 'Covers the nebular hypothesis applied to solar system formation: cloud collapse, disk.',
    classLevel: 11, subject: 'geography', topic: 'Origin of the Solar System and the Sun',
    chapters: [],
    nodeIds: ['c11_geo_cbse_02_004', 'c11_geo_cbse_02_006', 'c11_geo_cbse_02_008', 'c11_geo_cbse_06_004', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_02_007', 'c11_geo_cbse_10_003', 'c11_geo_cbse_26_001', 'c11_geo_cbse_26_003', 'c11_geo_cbse_26_005', 'c11_geo_cbse_06_003', 'c11_geo_cbse_06_005', 'c11_geo_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Look at a photograph of the Orion Nebula (M42) — a stellar nursery visible from India in winter evenings —.', goal: 'Master Origin of the Solar System and the Sun.' },
    discovery: {
        question: 'State the approximate age of the solar system and name the two primary processes that caused the solar nebula to flatten into a protoplanetary disk.',
        options: ['The solar system is ~4.6 billion years old', 'centrifugal force flung material outward', 'the Sun spit out the planets'],
        answer: 'The solar system is ~4.6 billion years old',
        hook: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the.',
    },
    teaching: [
        { title: 'The solar system originated approximately.', text: 'The solar system originated approximately 4.6 billion years ago from the gravitational collapse of a giant molecular cloud fragment (solar nebula), where conservation of angular momentum caused the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_004', title: 'The solar system originated.',
          scaffold: { problem: 'Using the minimum mass solar nebula (MMSN) model, estimate the isolation mass (maximum mass a planetary embryo can reach before clearing.',
            steps: [
            { text: 'Calculate surface density of solids at 1 AU: Σ₁ = 7 g/cm² = 70 kg/m².' },
            { text: 'Express Hill radius r_H = a (M/3M_⊙)¹ᐟ³. Feeding zone area A ≈ 2πa × 10 r_H = 20πa² (M/3M_⊙)¹ᐟ³.' },
            { text: 'Isolation mass M_iso = Σ_solid × A = Σ_solid × 20πa² (M_iso/3M_⊙)¹ᐟ³.' },
            { text: 'Solve for M_iso: M_iso²ᐟ³ = Σ_solid × 20πa² / (3M_⊙)¹ᐟ³ → M_iso = [Σ_solid × 20πa² / (3M_⊙)¹ᐟ³]³ᐟ².' },
            { text: 'Plug constants: M_⊙ = 1.99×10³⁰ kg. At 1 AU (a=1.496×10¹¹ m): M_iso ≈ 0.05 M_⊕ (Mars-mass).' },
            { text: 'Interpret: Inside frost line, isolation masses are small (terrestrial planets).', faded: true, blankAnswer: 'At 1 AU: ~0.05 M_⊕ (Mars-like). At 5 AU: ~10 M_⊕ (giant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_006', title: 'The evolution of Earth\'s atmosphere.',
          scaffold: { problem: 'A student claims: "Earth\'s first atmosphere was mostly nitrogen and oxygen, just like today, but thinner." Using the concept of planetary.',
            steps: [
            { text: 'Identify the primary atmosphere source — solar nebula capture during accretion (4.6 Ga).' },
            { text: 'Apply thermal escape physics — Earth\'s gravity (escape velocity 11.2 km/s) cannot retain H₂ (2 g/mol) and He (4 g/mol).' },
            { text: 'Identify the secondary atmosphere source — volcanic degassing from the cooling, differentiating Earth (magma ocean.' },
            { text: 'Trace the transition to the tertiary (modern) atmosphere — H₂O condensed to form oceans (~4.0 Ga), CO₂ dissolved and.' },
            { text: 'Synthesize the sequence: Primary (H₂/He) → Lost → Secondary (H₂O/CO₂/N₂) → Oceans form, CO₂ removed → Tertiary (N₂/O₂).', faded: true, blankAnswer: 'The student\'s claim is wrong because the primary atmosphere.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_008', title: 'The origin of life on Earth refers to.',
          scaffold: { problem: 'A student finds a 3.2 Ga chert sample from the Barberton Greenstone Belt (South Africa) containing filamentous microfossils.',
            steps: [
            { text: 'Identify the geological context — Barberton is an Archean greenstone belt representing ancient oceanic crust and.' },
            { text: 'Recall the atmospheric condition at 3.2 Ga — anoxic, high UV, high CO₂/CH₄ greenhouse (from node 006).' },
            { text: 'Analyse the fossil morphology — filaments suggest prokaryotic (bacterial/archaeal) organisation, consistent with.' },
            { text: 'Infer the habitat — absence of oxygen and ozone means they lived in water (UV shield) or subsurface; chert precipitates.' },
            { text: 'Conclude — these are plausible early chemosynthetic or anaerobic photosynthetic organisms in a hydrothermal setting,.', faded: true, blankAnswer: 'The microfossils are consistent with early prokaryotic life.' }
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
    explore: { component: C11_GeographyAtmosphereCompositionSim, prompt: 'Explore the interactive — Origin of the Solar System and the Sun' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_004', difficulty: 'standard',
          question: 'The solar system originated approximately 4.6 billion years ago from the.',
          hint: 'Revisit c11_phy_cbse_08_001 (Gravitation) — specifically the derivation of angular.',
          misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'State the approximate age of the solar system and name the two primary processes that caused the solar nebula to flatten into a protoplanetary disk.', answer: 'The solar system is ~4.6 billion years old',
                  options: ['The solar system is ~4.6 billion years old', 'centrifugal force flung material outward', 'the Sun spit out the planets'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' },
                { id: 'b', prompt: 'A protoplanetary disk has a surface density profile Σ(r) = 1700 (r/1 AU)⁻¹·⁵ kg/m².', answer: 'Step 1: Dust surface density Σ_dust = Σ_gas / 100 = 17 (r/1 AU)⁻¹·⁵ kg/m²',
                  options: ['Step 1: Dust surface density Σ_dust = Σ_gas / 100 = 17 (r/1 AU)⁻¹·⁵ kg/m²', 'the Sun spit out the planets'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' },
                { id: 'c', prompt: 'Compare the angular momentum distribution in the solar system: the Sun has 99.8% of the mass but only ~0.5% of the angular momentum.', answer: 'Mechanism 1: Magnetic braking',
                  options: ['Mechanism 1: Magnetic braking', 'planets stole the angular momentum', 'the Sun spun down by itself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun formed first as a star, then planets formed from material ejected by the Sun (e.g., "the Sun spit out the.' }
          ],
            remediations: { 'the-sun-formed-first-as': { steps: ['Show an ALMA radio image of HL Tauri\'s protoplanetary disk (concentric rings = planet formation in progress).', 'Use a rotating platform with a dripping wet sponge — as it spins faster, water flattens into a disk, mimicking angular.', 'Plot condensation temperatures of Fe, MgSiO₃, H₂O, CH₄, NH₃ against distance from a 1 L⊙ star; students mark where each.', 'Re-read NCERT Class 11 Fundamentals of Physical Geography Chapter 2 sections on "Origin of the Solar System" and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_006', difficulty: 'standard',
          question: 'The evolution of Earth\'s atmosphere refers to the multi-stage process by which.',
          hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11.',
          misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).',
          parts: [
                { id: 'a', prompt: 'Explain why the primordial atmosphere\'s hydrogen and helium escaped to space, while nitrogen and carbon dioxide were retained, using the concepts of molecular.', answer: 'Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses',
                  options: ['Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses', 'gravity pulled heavier gases down', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'b', prompt: 'Given that volcanic degassing releases H₂O (60%), CO₂ (20%), SO₂ (10%), N₂ (5%), and trace gases, calculate the approximate partial pressure of CO₂ in the.', answer: 'Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles',
                  options: ['Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles', 'Earth is farther from Sun', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'c', prompt: 'Analyse the following statement: "The Great Oxidation Event (GOE) at 2.4 Ga was caused solely by the evolution of cyanobacteria." Identify two additional.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' }
          ],
            remediations: { 'oxygen-appeared-suddenly-and-uniformly': { steps: ['Draw a two-column timeline: left column "Biological Events" (origin of photosynthesis, cyanobacteria, eukaryotes),.', 'Mark the GOE at 2.4 Ga as the *crossover point* where O₂ sources exceeded sinks globally.', 'Use the "oxygen sink" analogy: imagine a bathtub (atmosphere) with the drain open (reduced minerals); only when the.', 'Re-read NCERT Class 11 Chapter 2 section "Evolution of the Atmosphere" focusing on the phrase "oxygen began to.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_008', difficulty: 'standard',
          question: 'The origin of life on Earth refers to the natural process by which non-living.',
          hint: 'If stuck, immediately revisit c11_geo_cbse_02_006 (primordial atmosphere composition) and.',
          misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.',
          parts: [
                { id: 'a', prompt: 'Compare the evolutionary significance of the following two transitions: (a) prokaryote → eukaryote (endosymbiosis) and (b) anaerobic → aerobic metabolism.', answer: 'Transition (b) had greater geographical impact',
                  options: ['Transition (b) had greater geographical impact', 'primordial soup', 'the "primordial soup" was a uniform, dilute broth in the open ocean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.' }
          ],
            remediations: { 'the-primordial-soup-was-a': { steps: ['Re-read the "Evolution of the Hydrosphere" node (c11_geo_cbse_02_007) focusing on hydrothermal vents and tidal zones as.', 'Watch a 5-min animation of the "alkaline hydrothermal vent" hypothesis (e.g., Lane & Martin 2012) showing how pore.', 'On an outline map of early Earth, mark three *specific* geographical settings where concentration could occur (volcanic.', 'Explain aloud to a peer why each setting solves the dilution problem.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The ozone layer formed *before* photosynthetic life, protecting early organisms from UV radiation and allowing them to evolve on land."', answer: 'The statement is false',
                  options: ['The statement is false', 'primordial soup', 'the "primordial soup" was a uniform, dilute broth in the open ocean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.' },
                { id: 'b', prompt: 'Compare the evolutionary significance of the following two transitions: (a) prokaryote → eukaryote (endosymbiosis) and (b) anaerobic → aerobic metabolism.', answer: 'Transition (b) had greater geographical impact',
                  options: ['Transition (b) had greater geographical impact', 'primordial soup', 'the "primordial soup" was a uniform, dilute broth in the open ocean'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the "primordial soup" was a uniform, dilute broth in the open ocean.' }
          ],
            remediations: { 'the-primordial-soup-was-a': { steps: ['Re-read the "Evolution of the Hydrosphere" node (c11_geo_cbse_02_007) focusing on hydrothermal vents and tidal zones as.', 'Watch a 5-min animation of the "alkaline hydrothermal vent" hypothesis (e.g., Lane & Martin 2012) showing how pore.', 'On an outline map of early Earth, mark three *specific* geographical settings where concentration could occur (volcanic.', 'Explain aloud to a peer why each setting solves the dilution problem.'] } } },
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
