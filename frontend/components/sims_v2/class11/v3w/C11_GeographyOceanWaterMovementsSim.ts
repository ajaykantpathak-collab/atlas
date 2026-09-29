import type { SimDef } from '../../engine/types';
import C11_GeographyOceanWaterMovementsSim from '../../../simulations/c6_12/C11_GeographyOceanWaterMovementsSim';

/** v3 wrapped master — C11_GeographyOceanWaterMovementsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyoceanwatermovementssim: SimDef = {
    id: 'v3w_c11_geographyoceanwatermovementssim',
    title: 'Evolution of the Hydrosphere and Formation of Oceans',
    subtitle: 'Covers the origin of Earth\'s water (degassing, extraterrestrial delivery), condensation.',
    classLevel: 11, subject: 'geography', topic: 'Evolution of the Hydrosphere and Formation of Oceans',
    chapters: [],
    nodeIds: ['c11_geo_cbse_02_007', 'c11_geo_cbse_11_003', 'c11_geo_cbse_04_007', 'c11_geo_cbse_04_008', 'c11_geo_cbse_21_006', 'c11_geo_cbse_11_002', 'c11_geo_cbse_21_004', 'c11_geo_cbse_06_005', 'c11_geo_cbse_11_007', 'c11_geo_cbse_02_005', 'c11_geo_cbse_02_008', 'c11_geo_cbse_11_004', 'c11_geo_cbse_11_005', 'c11_geo_cbse_02_006', 'c11_geo_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a glass of cold water on a hot Indian summer day — water droplets form on the outside.', goal: 'Master Evolution of the Hydrosphere and Formation of Oceans.' },
    discovery: {
        question: 'Explain why the early oceans were likely more acidic and less saline than modern oceans, linking this to the composition of the primordial atmosphere and the.',
        options: ['The primordial atmosphere was rich in CO₂ (from volcanic outgassing)', 'less evaporation', 'Earth\'s water came from space'],
        answer: 'The primordial atmosphere was rich in CO₂ (from volcanic outgassing)',
        hook: 'Students often believe oceans formed primarily from comet impacts ("Earth\'s water came from space") and that ocean.',
    },
    teaching: [
        { title: 'The evolution of the hydrosphere refers to.', text: 'The evolution of the hydrosphere refers to the geological process by which water vapor released through volcanic degassing and delivered by cometary impacts condensed into liquid water as Earth.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_007', title: 'The evolution of the hydrosphere refers.',
          scaffold: { problem: 'Using the modern riverine sodium flux (6.2 × 10¹⁰ mol/yr) and the total ocean sodium inventory (5.0 × 10¹⁸ mol), calculate the residence.',
            steps: [
            { text: 'Identify the formula for residence time: τ = Inventory / Input Flux (assuming steady state where input ≈ output).' },
            { text: 'Substitute the given values: τ = (5.0 × 10¹⁸ mol) / (6.2 × 10¹⁰ mol/yr).' },
            { text: 'Perform the division: τ = 8.06 × 10⁷ yr ≈ 80.6 million years.' },
            { text: 'Compare this residence time (80 Myr) to Earth\'s age (4,600 Myr).' },
            { text: 'Conclude that if oceans were primordial with no input/output, sodium would accumulate indefinitely.', faded: true, blankAnswer: 'Residence time of Na⁺ ≈ 80.6 million years. This is <2% of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_003', title: 'A tsunami is a series of.',
          scaffold: { problem: 'A tsunami originates at the Andaman-Sumatra trench (water depth 4500 m).',
            steps: [
            { text: 'Calculate wave speed using shallow-water formula c = √(gD) = √(9.8 × 4500) = √44100 = 210 m/s = 756 km/h.' },
            { text: 'Convert period to seconds: T = 20 min × 60 = 1200 s. Calculate wavelength: λ = c × T = 210 × 1200 = 252,000 m = 252 km.' },
            { text: 'Travel time to Visakhapatnam: t = 1200 km / 756 km/h = 1.587 hours = 1 hour 35 minutes.' },
            { text: 'Wave steepness (H/λ) in deep ocean: typical tsunami height H = 0.5 m, so H/λ = 0.5/252,000 = 2×10⁻⁶ — extremely gentle.' },
            { text: 'Interpret: The wave passes a ship as a gentle 20-minute rise and fall of 0.5 m — indistinguishable from normal swell.', faded: true, blankAnswer: 'Speed = 756 km/h, Wavelength = 252 km, Travel time = 1 hr.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_007', title: 'Sea floor spreading is the geological.',
          scaffold: { problem: 'A research vessel crosses the Juan de Fuca Ridge (northeast Pacific) and records a magnetic anomaly profile.',
            steps: [
            { text: 'Identify the known quantities — the Brunhes chron duration is 0.78 Ma (780,000 years) from the GPTS; the stripe width.' },
            { text: 'Convert the stripe width to centimetres: 6.2 km × 100,000 cm/km = 620,000 cm.' },
            { text: 'Convert the chron duration to years: 0.78 Ma × 1,000,000 yr/Ma = 780,000 yr.' },
            { text: 'Apply the half-spreading rate formula: v = w / t = 620,000 cm / 780,000 yr = 0.795 cm/yr ≈ 0.8 cm/yr.' },
            { text: 'Classify the spreading rate: half-rate < 2.5 cm/yr is slow spreading (full rate < 5 cm/yr).', faded: true, blankAnswer: 'Half-spreading rate = 0.8 cm/yr; classified as a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_008', title: 'Lithospheric plates are rigid segments.',
          scaffold: { problem: 'Using the magnetic anomaly pattern on the Pacific Plate, anomaly 3A (6 Ma) is 180 km from the ridge axis on the Pacific side.',
            steps: [
            { text: 'Identify the given data: distance from ridge to anomaly 3A = 180 km; age of anomaly 3A = 6 million years (Ma).' },
            { text: 'Recall that the distance from ridge to anomaly represents half the total crust created in that time (one plate\'s.' },
            { text: 'Calculate half-spreading rate = distance / age = 180 km / 6 Myr = 30 km/Myr.' },
            { text: 'Convert to standard units: 30 km/Myr = 3 cm/yr (since 1 km/Myr = 0.1 cm/yr).' },
            { text: 'Full spreading rate = 2 × half-spreading rate = 6 cm/yr.', faded: true, blankAnswer: 'Half-spreading rate = 3 cm/yr; full spreading rate = 6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_006', title: 'Pipeline transport is a mode of.',
          scaffold: { problem: 'The Kandla–Bhatinda petroleum product pipeline (1,100 km, 18-inch) transports 6 MMTPA of diesel/petrol from Kandla (import terminal) to.',
            steps: [
            { text: 'Identify number of pump stations: 1,100 km / 100 km = 11 intervals → 11 stations.' },
            { text: 'Calculate running power per station: 2 pumps × 1.8 MW = 3.6 MW = 3,600 kW.' },
            { text: 'Total running power: 11 stations × 3,600 kW = 39,600 kW.' },
            { text: 'Annual operating hours: 365 days × 24 h × 0.92 utilisation = 8,059.2 hours.' },
            { text: 'Annual energy consumption: 39,600 kW × 8,059.2 h = 319,144,320 kWh ≈ 319.1 GWh.' },
            { text: 'Annual electricity cost: 319.144 × 10⁶ kWh × ₹6.50/kWh = ₹2,074.44 crore.' },
            { text: 'Rail cost for comparison: 6 × 10⁶ tonnes × 1,100 km × ₹1.50/tonne-km = ₹9,900 crore.' },
            { text: 'Pipeline transport cost (energy only) is ~21% of rail cost; adding O&M (~₹0.20/tonne-km) still keeps pipeline <30% of.', faded: true, blankAnswer: 'Annual electricity cost ≈ ₹2,074 crore. Pipeline energy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_002', title: 'An earthquake is a sudden release of.',
          scaffold: { problem: 'The 2001 Bhuj earthquake (Mw 7.7) ruptured a 100 km × 20 km fault patch with average slip of 5 m. Shear modulus μ = 3×10¹⁰ Pa.',
            steps: [
            { text: 'Identify given values — rupture length L = 100 km = 100,000 m, width W = 20 km = 20,000 m, slip D = 5 m, μ = 3×10¹⁰ Pa.' },
            { text: 'Calculate rupture area A = L × W = 100,000 × 20,000 = 2×10⁹ m².' },
            { text: 'Compute seismic moment M₀ = μ × A × D = (3×10¹⁰) × (2×10⁹) × 5 = 3×10²⁰ N·m.' },
            { text: 'Apply moment magnitude formula: Mw = (2/3) log₁₀(M₀) - 6.0 = (2/3) log₁₀(3×10²⁰) - 6.0 = (2/3) × (log₁₀3 + 20) - 6.0 =.' },
            { text: 'Interpret — Mw 7.7 matches reported value; confirms large slip on a moderately sized fault in an intraplate setting.', faded: true, blankAnswer: 'M₀ = 3×10²⁰ N·m; Mw = 7.65 ≈ 7.7. The calculation verifies.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_11_003', title: 'Identify each idea',
          dissect: { specimen: 'Evolution of the Hydrosphere and Formation of Oceans', spots: [
            { id: 's1', label: 'The evolution of the hydrosphere', prompt: 'Which idea is this? — The evolution of the hydrosphere refers to the geological process by which water vapor.', answer: 'The evolution of the hydrosphere', options: ['The evolution of the hydrosphere', 'A tsunami is a series', 'Sea floor spreading is the', 'Lithospheric plates are rigid segments'] },
            { id: 's2', label: 'A tsunami is a series', prompt: 'Which idea is this? — A tsunami is a series of long-wavelength, long-period ocean waves generated by the sudden.', answer: 'A tsunami is a series', options: ['A tsunami is a series', 'The evolution of the hydrosphere', 'Sea floor spreading is the', 'Lithospheric plates are rigid segments'] },
            { id: 's3', label: 'Sea floor spreading is the', prompt: 'Which idea is this? — Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean.', answer: 'Sea floor spreading is the', options: ['Sea floor spreading is the', 'The evolution of the hydrosphere', 'A tsunami is a series', 'Lithospheric plates are rigid segments'] },
            { id: 's4', label: 'Lithospheric plates are rigid segments', prompt: 'Which idea is this? — Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost.', answer: 'Lithospheric plates are rigid segments', options: ['Lithospheric plates are rigid segments', 'The evolution of the hydrosphere', 'A tsunami is a series', 'Sea floor spreading is the'] },
            { id: 's5', label: 'Pipeline transport is a mode', prompt: 'Which idea is this? — Pipeline transport is a mode of transportation that uses a network of connected pipes to.', answer: 'Pipeline transport is a mode', options: ['Pipeline transport is a mode', 'The evolution of the hydrosphere', 'A tsunami is a series', 'Sea floor spreading is the'] },
            { id: 's6', label: 'An earthquake is a sudden', prompt: 'Which idea is this? — An earthquake is a sudden release of accumulated strain energy in the Earth\'s crust that.', answer: 'An earthquake is a sudden', options: ['An earthquake is a sudden', 'The evolution of the hydrosphere', 'A tsunami is a series', 'Sea floor spreading is the'] }
          ] } }
    ],
    explore: { component: C11_GeographyOceanWaterMovementsSim, prompt: 'Explore the interactive — Evolution of the Hydrosphere and Formation of Oceans' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_003', difficulty: 'standard',
          question: 'A tsunami is a series of long-wavelength, long-period ocean waves generated by.',
          hint: 'Revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) focusing on the India-Burma.',
          misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10.',
          parts: [
                { id: 'a', prompt: 'Define a tsunami and state its primary cause in the Indian Ocean context.', answer: 'A tsunami is a series of long-wavelength ocean waves caused by sudden vertical',
                  options: ['A tsunami is a series of long-wavelength ocean waves caused by sudden vertical', 'tsunamis are caused by high winds', 'they are tidal waves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10 m.' },
                { id: 'b', prompt: 'Explain why a tsunami wave that is only 0.5 metres high in the open ocean can become a 10-metre wall of water at the coast.', answer: 'In deep water, tsunami wavelength (λ) is 100-200 km and wave height (H) is small',
                  options: ['In deep water, tsunami wavelength (λ) is 100-200 km and wave height (H) is small', 'waves slowing down', 'a 10 m tsunami means 10 m high waves at sea'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10 m.' },
                { id: 'c', prompt: 'Compare the tsunami vulnerability of the Andaman & Nicobar Islands versus the Gujarat coast. Consider tectonic setting, bathymetry, and historical events.', answer: 'Andaman & Nicobar Islands: Directly on the Andaman-Sumatra subduction zone',
                  options: ['Andaman & Nicobar Islands: Directly on the Andaman-Sumatra subduction zone', 'a 10 m tsunami means 10 m high waves at sea', 'tsunami wave height in the open ocean is similar to its coastal run-up height (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10 m.' }
          ],
            remediations: { 'tsunami-wave-height-in-the': { steps: ['Use a wave tank demonstration (or video) showing a 1 cm paddle displacement generating a 10 cm run-up on a 1:10 slope —.', 'Plot the 2004 tsunami travel-time contours from the Andaman source on an Indian Ocean map; have students calculate.', 'Contrast a storm surge map (e.g., Cyclone Amphan) with tsunami inundation map for the same coast — highlight different.', 'Assign a 150-word explanation: "Why a 2 cm signal on a deep-ocean BPR demands immediate evacuation even though the wave.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Indian Tsunami Early Warning System (ITEWS) can provide sufficient warning time for all Indian coastal communities."', answer: 'ITEWS (operational',
                  options: ['ITEWS (operational', 'a 10 m tsunami means 10 m high waves at sea', 'tsunami wave height in the open ocean is similar to its coastal run-up height (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that tsunami wave height in the open ocean is similar to its coastal run-up height (e.g., "a 10 m tsunami means 10 m.' }
          ],
            remediations: { 'tsunami-wave-height-in-the': { steps: ['Use a wave tank demonstration (or video) showing a 1 cm paddle displacement generating a 10 cm run-up on a 1:10 slope —.', 'Plot the 2004 tsunami travel-time contours from the Andaman source on an Indian Ocean map; have students calculate.', 'Contrast a storm surge map (e.g., Cyclone Amphan) with tsunami inundation map for the same coast — highlight different.', 'Assign a 150-word explanation: "Why a 2 cm signal on a deep-ocean BPR demands immediate evacuation even though the wave.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_007', difficulty: 'standard',
          question: 'Sea floor spreading is the geological process where new oceanic crust forms at.',
          hint: 'Revisit the concept of thermoremanent magnetisation (TRM) in igneous rocks and the.',
          misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean',
                  options: ['Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean', 'The evolution of the hydrosphere refers to the geological process by', 'A tsunami is a series of long-wavelength, long-period ocean waves generated by the sudden', 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the underlying mantle, or.' }
          ],
            remediations: { 'magnetic-stripes-are-caused-by': { steps: ['If a student confuses the origin of magnetic stripes, use a physical analogy: heat a nail (magnetite grain) above its.', 'Flip the external field, repeat with a new nail — now you have two nails with opposite magnetisation.', 'Lay them side by side on a conveyor belt (spreading ridge) — you get alternating magnetic stripes.', 'Have the student sketch this process step-by-step on paper: (1) ridge axis, (2) lava eruption, (3) cooling through.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the.',
          parts: [
                { id: 'a', prompt: 'Design a simple magnetic survey plan to determine the spreading history of a previously unmapped mid-ocean ridge segment.', answer: 'ship track orientation relative to the ridge, (',
                  options: ['ship track orientation relative to the ridge, (', 'recording'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the underlying mantle, or.' }
          ],
            remediations: { 'magnetic-stripes-are-caused-by': { steps: ['If a student confuses the origin of magnetic stripes, use a physical analogy: heat a nail (magnetite grain) above its.', 'Flip the external field, repeat with a new nail — now you have two nails with opposite magnetisation.', 'Lay them side by side on a conveyor belt (spreading ridge) — you get alternating magnetic stripes.', 'Have the student sketch this process step-by-step on paper: (1) ridge axis, (2) lava eruption, (3) cooling through.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_008', difficulty: 'standard',
          question: 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and.',
          hint: 'Review the magnetic stripe symmetry exercise from c11_geo_cbse_04_007 and practice.',
          misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving.',
          parts: [
                { id: 'a', prompt: 'Given a map showing the Mid-Atlantic Ridge and the Mariana Trench, identify the type of plate boundary at each location and the direction of relative plate.', answer: 'Step 1: Locate the Mid-Atlantic Ridge',
                  options: ['Step 1: Locate the Mid-Atlantic Ridge', 'Indian Plate', 'Australian Plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' },
                { id: 'b', prompt: 'Compare the Himalayan collision zone and the Andes mountain range in terms of plate boundary type, crust involved, and resulting landforms.', answer: 'The Himalayas form at a continent-continent convergent boundary (Indian Plate vs',
                  options: ['The Himalayas form at a continent-continent convergent boundary (Indian Plate vs', 'convergent boundaries', 'Indian Plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' }
          ],
            remediations: { 'the-indian-plate-and-australian': { steps: ['Show a GPS velocity map of the Indian Ocean region (available from IGS or UNAVCO) highlighting different vectors for.', 'Trace the diffuse boundary zone (Central Indian Ocean Deformation Zone) on a blank map.', 'Relate this to the 2012 Indian Ocean earthquakes (strike-slip events far from plate boundaries).', 'Have the student explain why a single "Indo-Australian Plate" label is misleading for seismic hazard assessment.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving.',
          parts: [
                { id: 'a', prompt: 'Design a simple classroom model using household materials to demonstrate the three types of plate boundaries and the resulting surface deformation.', answer: 'A good model: Use two crackers (plates) on a layer of frosting (asthenosphere)',
                  options: ['A good model: Use two crackers (plates) on a layer of frosting (asthenosphere)', 'Indian Plate', 'Australian Plate', 'plates move on a solid, unyielding surface'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' },
                { id: 'b', prompt: 'Compare the Himalayan collision zone and the Andes mountain range in terms of plate boundary type, crust involved, and resulting landforms.', answer: 'The Himalayas form at a continent-continent convergent boundary (Indian Plate vs',
                  options: ['The Himalayas form at a continent-continent convergent boundary (Indian Plate vs', 'convergent boundaries', 'Indian Plate', 'Australian Plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' }
          ],
            remediations: { 'the-indian-plate-and-australian': { steps: ['Show a GPS velocity map of the Indian Ocean region (available from IGS or UNAVCO) highlighting different vectors for.', 'Trace the diffuse boundary zone (Central Indian Ocean Deformation Zone) on a blank map.', 'Relate this to the 2012 Indian Ocean earthquakes (strike-slip events far from plate boundaries).', 'Have the student explain why a single "Indo-Australian Plate" label is misleading for seismic hazard assessment.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_006', difficulty: 'standard',
          question: 'Pipeline transport is a mode of transportation that uses a network of connected.',
          hint: 'If stuck, revisit Class 10 Chapter 7 (c10_geo_cbse_07_004) for pipeline basics and Class.',
          misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas.',
          parts: [
                { id: 'a', prompt: 'A 1,200 km crude oil pipeline of 18-inch diameter operates at 6 MMTPA capacity.', answer: 'Step 1: Total pump power = 8 stations × 2.5 MW = 20 MW (1200/150 = 8 intervals)',
                  options: ['Step 1: Total pump power = 8 stations × 2.5 MW = 20 MW (1200/150 = 8 intervals)', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' }
          ],
            remediations: { 'students-conflate-pipeline-as-a': { steps: ['Draw a 3-column table on paper: Column A = Pipeline Name, Column B = Commodity (Crude Oil / Petroleum Products /.', 'On an outline map of India, plot the 3 trunk oil pipelines (red) and 2 trunk gas pipelines (blue) with arrows showing.', 'For each pipeline, write one sentence: "This pipeline exists because [source] produces [commodity] and [destination].', 'Re-attempt Diagnostic Questions 1 and 4. The act of mapping commodity-to-use logic breaks the "generic pipe".'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The National Gas Grid (NGG) and City Gas Distribution (CGD) network will make pipeline transport the backbone of India\'s energy.', answer: 'Judgement: Largely valid but constrained by last-mile economics',
                  options: ['Judgement: Largely valid but constrained by last-mile economics', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' },
                { id: 'b', prompt: 'Design a pipeline corridor proposal for transporting natural gas from the Krishna-Godavari (KG) Basin offshore fields to the upcoming petrochemical cluster at.', answer: 'Good answer criteria: (1) Waypoint 1: KG-D6 onshore terminal (Kakinada/Ravva)',
                  options: ['Good answer criteria: (1) Waypoint 1: KG-D6 onshore terminal (Kakinada/Ravva)', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' }
          ],
            remediations: { 'students-conflate-pipeline-as-a': { steps: ['Draw a 3-column table on paper: Column A = Pipeline Name, Column B = Commodity (Crude Oil / Petroleum Products /.', 'On an outline map of India, plot the 3 trunk oil pipelines (red) and 2 trunk gas pipelines (blue) with arrows showing.', 'For each pipeline, write one sentence: "This pipeline exists because [source] produces [commodity] and [destination].', 'Re-attempt Diagnostic Questions 1 and 4. The act of mapping commodity-to-use logic breaks the "generic pipe".'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_002', difficulty: 'standard',
          question: 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s.',
          hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2, c9_geo_ch1_3) — specifically:.',
          misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big.',
          parts: [
                { id: 'a', prompt: 'Given: The 1905 Kangra earthquake (Mw 7.8) occurred in the Himalayan Seismic Zone. The 2001 Bhuj earthquake (Mw 7.7) occurred in the Kutch Rift.', answer: 'Kangra: Himalayan convergence (India plate underthrusting Eurasia) generates N-S',
                  options: ['Kangra: Himalayan convergence (India plate underthrusting Eurasia) generates N-S', 'both thrust faults', 'Delhi hasn\'t had a big quake, so it shouldn\'t be Zone IV'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big quake, so it.' }
          ],
            remediations: { 'seismic-zones-are-determined-only': { steps: ['Show the IS 1893 zonation map alongside a tectonic map of India (faults, rifts, thrusts).', 'Overlay historical earthquakes (dots sized by magnitude).', 'Trace Zone V boundaries — match Himalayan thrusts, Kutch Rift, Andaman subduction.', 'Highlight Zone IV — Indo-Gangetic Plain (basin amplification), Delhi region (ridge faults), Koyna (reservoir-induced).', 'Ask: "Which zone would a region with NO faults, NO history, on hard rock be?" (Zone II).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Andaman & Nicobar Islands are in Zone V solely because of the subduction zone." Consider the 2004 Sumatra-Andaman earthquake (Mw.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'Delhi hasn\'t had a big quake, so it shouldn\'t be Zone IV', 'seismic zones are determined ONLY by historical earthquake frequency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe seismic zones are determined ONLY by historical earthquake frequency — e.g., "Delhi hasn\'t had a big quake, so it.' }
          ],
            remediations: { 'seismic-zones-are-determined-only': { steps: ['Show the IS 1893 zonation map alongside a tectonic map of India (faults, rifts, thrusts).', 'Overlay historical earthquakes (dots sized by magnitude).', 'Trace Zone V boundaries — match Himalayan thrusts, Kutch Rift, Andaman subduction.', 'Highlight Zone IV — Indo-Gangetic Plain (basin amplification), Delhi region (ridge faults), Koyna (reservoir-induced).', 'Ask: "Which zone would a region with NO faults, NO history, on hard rock be?" (Zone II).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
