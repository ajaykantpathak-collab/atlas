import type { SimDef } from '../../engine/types';
import C11_GeographyAtmosphericCirculationSim from '../../../simulations/c6_12/C11_GeographyAtmosphericCirculationSim';

/** v3 wrapped master — C11_GeographyAtmosphericCirculationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyatmosphericcirculationsim: SimDef = {
    id: 'v3w_c11_geographyatmosphericcirculationsim',
    title: 'Atmospheric Circulation',
    subtitle: 'Covers the origin and staged evolution of Earth\'s atmosphere from planetary accretion.',
    classLevel: 11, subject: 'geography', topic: 'Evolution of the Atmosphere: Primordial vs Present Atmosphere',
    chapters: [],
    nodeIds: ['c11_geo_cbse_02_006', 'c11_geo_cbse_01_004', 'c11_geo_cbse_02_007', 'c11_geo_cbse_10_002', 'c11_geo_cbse_02_004', 'c11_geo_cbse_02_008', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_10_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe the air around you right now — invisible, odourless, yet precisely 21% oxygen that allows you to.', goal: 'Master Atmospheric Circulation.' },
    discovery: {
        question: 'Explain why the primordial atmosphere\'s hydrogen and helium escaped to space, while nitrogen and carbon dioxide were retained, using the concepts of molecular.',
        options: ['Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses', 'gravity pulled heavier gases down', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
        answer: 'Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses',
        hook: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).',
    },
    teaching: [
        { title: 'The evolution of Earth\'s atmosphere refers.', text: 'The evolution of Earth\'s atmosphere refers to the multi-stage process by which the gaseous envelope surrounding Earth transformed from a primordial composition dominated by hydrogen, helium, methane,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_007', title: 'The evolution of the hydrosphere refers.',
          scaffold: { problem: 'Using the modern riverine sodium flux (6.2 × 10¹⁰ mol/yr) and the total ocean sodium inventory (5.0 × 10¹⁸ mol), calculate the residence.',
            steps: [
            { text: 'Identify the formula for residence time: τ = Inventory / Input Flux (assuming steady state where input ≈ output).' },
            { text: 'Substitute the given values: τ = (5.0 × 10¹⁸ mol) / (6.2 × 10¹⁰ mol/yr).' },
            { text: 'Perform the division: τ = 8.06 × 10⁷ yr ≈ 80.6 million years.' },
            { text: 'Compare this residence time (80 Myr) to Earth\'s age (4,600 Myr).' },
            { text: 'Conclude that if oceans were primordial with no input/output, sodium would accumulate indefinitely.', faded: true, blankAnswer: 'Residence time of Na⁺ ≈ 80.6 million years. This is <2% of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_002', title: 'The Indian monsoon is a seasonal.',
          scaffold: { problem: 'On a given day in late May, the 200 hPa wind chart shows the subtropical westerly jet (STWJ) core at 35°N, 70°E with speed 40 m/s.',
            steps: [
            { text: 'Identify the STWJ position change — from south of Himalayas (35°N) to north of Himalayas (42°N) indicates the "jet.' },
            { text: 'Recognise that STWJ withdrawal allows the ITCZ to shift north rapidly from ~15°N to ~22°N (observed in surface pressure.' },
            { text: 'Link the strengthening cross-equatorial flow at 850 hPa to the Mascarene High intensification — this is the Somali Jet.' },
            { text: 'Note the moisture transport: Somali Jet brings high θe (equivalent potential temperature) air from the southern Indian.' },
            { text: 'Connect to onset criteria: IMD declares onset when (a) rainfall ≥ 2.5 mm/day for 2 consecutive days at 60% of Kerala.' },
            { text: 'Verify with timing — STWJ jump typically precedes onset by 3-7 days; Somali Jet peaks at onset.', faded: true, blankAnswer: 'The STWJ shift north of the Himalayas (Step 1) removes.' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_008', title: 'The origin of life on Earth refers to.',
          scaffold: { problem: 'A student finds a 3.2 Ga chert sample from the Barberton Greenstone Belt (South Africa) containing filamentous microfossils.',
            steps: [
            { text: 'Identify the geological context — Barberton is an Archean greenstone belt representing ancient oceanic crust and.' },
            { text: 'Recall the atmospheric condition at 3.2 Ga — anoxic, high UV, high CO₂/CH₄ greenhouse (from node 006).' },
            { text: 'Analyse the fossil morphology — filaments suggest prokaryotic (bacterial/archaeal) organisation, consistent with.' },
            { text: 'Infer the habitat — absence of oxygen and ozone means they lived in water (UV shield) or subsurface; chert precipitates.' },
            { text: 'Conclude — these are plausible early chemosynthetic or anaerobic photosynthetic organisms in a hydrothermal setting,.', faded: true, blankAnswer: 'The microfossils are consistent with early prokaryotic life.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_01_004', title: 'Identify each idea',
          dissect: { specimen: 'Atmospheric Circulation', spots: [
            { id: 's1', label: 'The evolution of Earths atmosphere', prompt: 'Which idea is this? — The evolution of Earth\'s atmosphere refers to the multi-stage process by which the.', answer: 'The evolution of Earths atmosphere', options: ['The evolution of Earths atmosphere', 'Physical Geography is the branch', 'The evolution of the hydrosphere', 'The Indian monsoon is a'] },
            { id: 's2', label: 'Physical Geography is the branch', prompt: 'Which idea is this? — Physical Geography is the branch of geography that systematically studies the natural.', answer: 'Physical Geography is the branch', options: ['Physical Geography is the branch', 'The evolution of Earths atmosphere', 'The evolution of the hydrosphere', 'The Indian monsoon is a'] },
            { id: 's3', label: 'The evolution of the hydrosphere', prompt: 'Which idea is this? — The evolution of the hydrosphere refers to the geological process by which water vapor.', answer: 'The evolution of the hydrosphere', options: ['The evolution of the hydrosphere', 'The evolution of Earths atmosphere', 'Physical Geography is the branch', 'The Indian monsoon is a'] },
            { id: 's4', label: 'The Indian monsoon is a', prompt: 'Which idea is this? — The Indian monsoon is a seasonal reversal of wind systems driven by differential heating.', answer: 'The Indian monsoon is a', options: ['The Indian monsoon is a', 'The evolution of Earths atmosphere', 'Physical Geography is the branch', 'The evolution of the hydrosphere'] },
            { id: 's5', label: 'The solar system originated approximately', prompt: 'Which idea is this? — The solar system originated approximately 4.6 billion years ago from the gravitational.', answer: 'The solar system originated approximately', options: ['The solar system originated approximately', 'The evolution of Earths atmosphere', 'Physical Geography is the branch', 'The evolution of the hydrosphere'] },
            { id: 's6', label: 'The origin of life on', prompt: 'Which idea is this? — The origin of life on Earth refers to the natural process by which non-living matter.', answer: 'The origin of life on', options: ['The origin of life on', 'The evolution of Earths atmosphere', 'Physical Geography is the branch', 'The evolution of the hydrosphere'] }
          ] } }
    ],
    explore: { component: C11_GeographyAtmosphericCirculationSim, prompt: 'Explore the interactive — Atmospheric Circulation' },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_002', difficulty: 'standard',
          question: 'The Indian monsoon is a seasonal reversal of wind systems driven by.',
          hint: 'Revisit Class 9 "Winds: Causes and Types of Global Wind Systems" (c9_geo_ch2_4) for.',
          misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating',
                  options: ['The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'The evolution of Earth\'s atmosphere refers to the multi-stage process by', 'Physical Geography is the branch of geography that systematically studies the natural', 'The evolution of the hydrosphere refers to the geological process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating it as a simple.' }
          ],
            remediations: { 'the-monsoon-is-caused-only': { steps: ['Show the student a 200 hPa wind animation for May-June (available on IMD/NCERT portals) — observe the STWJ core at 30°N.', 'Overlay 850 hPa winds — watch the Somali Jet form *before* the ITCZ jumps.', 'Use a pressure-time series for Thiruvananthapuram — show pressure falling steadily from April, but rainfall starts only.', 'Contrast with a "failed onset" year (e.g., 2002) where STWJ didn\'t shift north despite Tibetan heating.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The tropical easterly jet (TEJ) is a *result* of the monsoon, not a *cause* of monsoon onset." Support your evaluation with dynamical.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'TEJ causes onset'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating it as a simple.' }
          ],
            remediations: { 'the-monsoon-is-caused-only': { steps: ['Show the student a 200 hPa wind animation for May-June (available on IMD/NCERT portals) — observe the STWJ core at 30°N.', 'Overlay 850 hPa winds — watch the Somali Jet form *before* the ITCZ jumps.', 'Use a pressure-time series for Thiruvananthapuram — show pressure falling steadily from April, but rainfall starts only.', 'Contrast with a "failed onset" year (e.g., 2002) where STWJ didn\'t shift north despite Tibetan heating.'] } } },
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
            remediations: { 'the-primordial-soup-was-a': { steps: ['Re-read the "Evolution of the Hydrosphere" node (c11_geo_cbse_02_007) focusing on hydrothermal vents and tidal zones as.', 'Watch a 5-min animation of the "alkaline hydrothermal vent" hypothesis (e.g., Lane & Martin 2012) showing how pore.', 'On an outline map of early Earth, mark three *specific* geographical settings where concentration could occur (volcanic.', 'Explain aloud to a peer why each setting solves the dilution problem.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
