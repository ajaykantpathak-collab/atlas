import type { SimDef } from '../../engine/types';
import C11_GeographyOriginEvolutionEarthSim from '../../../simulations/c6_12/C11_GeographyOriginEvolutionEarthSim';

/** v3 wrapped master — C11_GeographyOriginEvolutionEarthSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyoriginevolutionearthsim: SimDef = {
    id: 'v3w_c11_geographyoriginevolutionearthsim',
    title: 'Evolution of the Atmosphere: Primordial vs Present Atmosphere',
    subtitle: 'Covers the origin and staged evolution of Earth\'s atmosphere from planetary accretion.',
    classLevel: 11, subject: 'geography', topic: 'Evolution of the Atmosphere: Primordial vs Present Atmosphere',
    chapters: [],
    nodeIds: ['c11_geo_cbse_02_006', 'c11_geo_cbse_02_007', 'c11_geo_cbse_02_008', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_02_002', 'c11_geo_cbse_02_004', 'c11_geo_cbse_02_005', 'c11_geo_cbse_02_009', 'c11_geo_cbse_07_009', 'c11_geo_cbse_01_004', 'c11_geo_cbse_01_001', 'c11_geo_cbse_01_002', 'c11_geo_cbse_06_002', 'c11_geo_cbse_06_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe the air around you right now — invisible, odourless, yet precisely 21% oxygen that allows you to.', goal: 'Master Evolution of the Atmosphere: Primordial vs Present Atmosphere.' },
    discovery: {
        question: 'Explain why the primordial atmosphere\'s hydrogen and helium escaped to space, while nitrogen and carbon dioxide were retained, using the concepts of molecular.',
        options: ['Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses', 'gravity pulled heavier gases down', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
        answer: 'Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses',
        hook: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).',
    },
    teaching: [
        { title: 'The evolution of Earth\'s atmosphere refers.', text: 'The evolution of Earth\'s atmosphere refers to the multi-stage process by which the gaseous envelope surrounding Earth transformed from a primordial composition dominated by hydrogen, helium, methane,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_006', title: 'The evolution of Earth\'s atmosphere.',
          scaffold: { problem: 'A student claims: "Earth\'s first atmosphere was mostly nitrogen and oxygen, just like today, but thinner." Using the concept of planetary.',
            steps: [
            { text: 'Identify the primary atmosphere source — solar nebula capture during accretion (4.6 Ga).' },
            { text: 'Apply thermal escape physics — Earth\'s gravity (escape velocity 11.2 km/s) cannot retain H₂ (2 g/mol) and He (4 g/mol).' },
            { text: 'Identify the secondary atmosphere source — volcanic degassing from the cooling, differentiating Earth (magma ocean.' },
            { text: 'Trace the transition to the tertiary (modern) atmosphere — H₂O condensed to form oceans (~4.0 Ga), CO₂ dissolved and.' },
            { text: 'Synthesize the sequence: Primary (H₂/He) → Lost → Secondary (H₂O/CO₂/N₂) → Oceans form, CO₂ removed → Tertiary (N₂/O₂).', faded: true, blankAnswer: 'The student\'s claim is wrong because the primary atmosphere.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_007', title: 'The evolution of the hydrosphere refers.',
          scaffold: { problem: 'Using the modern riverine sodium flux (6.2 × 10¹⁰ mol/yr) and the total ocean sodium inventory (5.0 × 10¹⁸ mol), calculate the residence.',
            steps: [
            { text: 'Identify the formula for residence time: τ = Inventory / Input Flux (assuming steady state where input ≈ output).' },
            { text: 'Substitute the given values: τ = (5.0 × 10¹⁸ mol) / (6.2 × 10¹⁰ mol/yr).' },
            { text: 'Perform the division: τ = 8.06 × 10⁷ yr ≈ 80.6 million years.' },
            { text: 'Compare this residence time (80 Myr) to Earth\'s age (4,600 Myr).' },
            { text: 'Conclude that if oceans were primordial with no input/output, sodium would accumulate indefinitely.', faded: true, blankAnswer: 'Residence time of Na⁺ ≈ 80.6 million years. This is <2% of.' }
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
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_002', title: 'The Big Bang Theory is the prevailing.',
          scaffold: { problem: 'The H-alpha spectral line of hydrogen (rest wavelength 656.3 nm) is observed at 721.9 nm in a distant galaxy.',
            steps: [
            { text: 'Identify the rest wavelength λ₀ = 656.3 nm and observed wavelength λ = 721.9 nm from the problem statement.' },
            { text: 'Calculate redshift z = (λ - λ₀) / λ₀ = (721.9 - 656.3) / 656.3 = 65.6 / 656.3 = 0.100.' },
            { text: 'Calculate recession velocity v = z × c = 0.100 × 3 × 10⁵ km/s = 30,000 km/s (using non-relativistic approximation since.' },
            { text: 'Apply Hubble\'s Law: d = v / H₀ = 30,000 / 68 ≈ 441.2 Mpc.' },
            { text: 'Convert distance to lookback time: 1 Mpc = 3.26 × 10⁶ ly, so d = 441.2 × 3.26 × 10⁶ ≈ 1.44 × 10⁹ ly ≈ 1.44 billion.' },
            { text: 'Verify: z = 0.1 corresponds to ~1.3 Gyr lookback in standard cosmology; our Hubble-time approximation (1/H₀ ≈ 14.4 Gyr).', faded: true, blankAnswer: '(a) z = 0.100, (b) v = 30,000 km/s, (c) d = 441 Mpc, (d).' }
            ] } }
    ],
    explore: { component: C11_GeographyOriginEvolutionEarthSim, prompt: 'Explore the interactive — Evolution of the Atmosphere: Primordial vs Present Atmosphere' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_007', difficulty: 'standard',
          question: 'The evolution of the hydrosphere refers to the geological process by which.',
          hint: 'If stuck, revisit "c11_geo_cbse_02_005: Evolution of Earth: Formation of the Lithosphere".',
          misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean.',
          parts: [
                { id: 'a', prompt: 'Explain why the early oceans were likely more acidic and less saline than modern oceans, linking this to the composition of the primordial atmosphere and the.', answer: 'The primordial atmosphere was rich in CO₂ (from volcanic outgassing)',
                  options: ['The primordial atmosphere was rich in CO₂ (from volcanic outgassing)', 'less evaporation', 'Earth\'s water came from space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean salinity has been.' },
                { id: 'b', prompt: 'Compare the role of hydrothermal circulation at mid-ocean ridges in the Archean versus today in controlling ocean salinity and composition.', answer: 'In the Archean, higher mantle heat flow produced faster spreading rates and more',
                  options: ['In the Archean, higher mantle heat flow produced faster spreading rates and more', 'hydrothermal vents add salt', 'Earth\'s water came from space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean salinity has been.' }
          ],
            remediations: { 'oceans-formed-primarily-from-comet': { steps: ['Use a two-column table to compare "Comet-only" vs. "Degassing + Comets" water budget estimates (cite Marty 2012,.', 'Plot a timeline: 4.4 Ga (zircon evidence) → 4.0 Ga (oldest rocks) → 3.8 Ga (Isua sediments) → 2.5 Ga (Great Oxidation.', 'Calculate a simple mass balance: modern river input of Na⁺ = 6.2×10¹⁰ mol/yr; ocean Na⁺ inventory = 5.0×10¹⁸ mol;.', 'Re-read NCERT Class 11 Fundamentals of Physical Geography, Chapter 2, sections on "Evolution of the Hydrosphere" and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean.',
          parts: [
                { id: 'a', prompt: 'Compare the role of hydrothermal circulation at mid-ocean ridges in the Archean versus today in controlling ocean salinity and composition.', answer: 'In the Archean, higher mantle heat flow produced faster spreading rates and more',
                  options: ['In the Archean, higher mantle heat flow produced faster spreading rates and more', 'hydrothermal vents add salt', 'Earth\'s water came from space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean salinity has been.' }
          ],
            remediations: { 'oceans-formed-primarily-from-comet': { steps: ['Use a two-column table to compare "Comet-only" vs. "Degassing + Comets" water budget estimates (cite Marty 2012,.', 'Plot a timeline: 4.4 Ga (zircon evidence) → 4.0 Ga (oldest rocks) → 3.8 Ga (Isua sediments) → 2.5 Ga (Great Oxidation.', 'Calculate a simple mass balance: modern river input of Na⁺ = 6.2×10¹⁰ mol/yr; ocean Na⁺ inventory = 5.0×10¹⁸ mol;.', 'Re-read NCERT Class 11 Fundamentals of Physical Geography, Chapter 2, sections on "Evolution of the Hydrosphere" and.'] } } },
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
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists a.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_002', difficulty: 'standard',
          question: 'The Big Bang Theory is the prevailing cosmological model explaining the origin.',
          hint: 'Revisit c9_geo_ch2_4 (Doppler Effect) and practice: "If a galaxy\'s H-alpha line (656.3.',
          misconception: 'Students believe the Big Bang Theory explains the *origin* of the universe (what caused the singularity) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Big Bang Theory is the prevailing cosmological model explaining the origin and',
                  options: ['The Big Bang Theory is the prevailing cosmological model explaining the origin and', 'The evolution of Earth\'s atmosphere refers to the multi-stage process by', 'The evolution of the hydrosphere refers to the geological process by', 'The origin of life on Earth refers to the natural process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Big Bang Theory explains the *origin* of the universe (what caused the singularity) rather than its *evolution from* a.' }
          ],
            remediations: { 'the-big-bang-theory-explains': { steps: ['Use the "balloon analogy" — draw galaxies on an uninflated balloon, inflate it. No galaxy is the centre; all separate.', 'Plot Hubble\'s Law data (velocity vs distance) for 5 galaxies — the linear fit gives H₀.', 'Watch NASA\'s "Timeline of the Universe" animation (1 min) — pause at recombination to link CMBR.', 'Write one sentence distinguishing "origin of universe" (metaphysics) from "evolution of universe" (physics).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
