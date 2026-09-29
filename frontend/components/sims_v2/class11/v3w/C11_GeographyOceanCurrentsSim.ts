import type { SimDef } from '../../engine/types';
import C11_GeographyOceanCurrentsSim from '../../../simulations/c6_12/C11_GeographyOceanCurrentsSim';

/** v3 wrapped master — C11_GeographyOceanCurrentsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyoceancurrentssim: SimDef = {
    id: 'v3w_c11_geographyoceancurrentssim',
    title: 'Continental Drift Theory: Wegener\'s Hypothesis',
    subtitle: 'This node covers Wegener\'s original 1912 hypothesis, its supporting evidence, and its.',
    classLevel: 11, subject: 'geography', topic: 'Continental Drift Theory: Wegener\'s Hypothesis',
    chapters: [],
    nodeIds: ['c11_geo_cbse_04_001', 'c11_geo_cbse_04_003', 'c11_geo_cbse_04_008', 'c11_geo_cbse_11_007', 'c11_geo_cbse_04_005', 'c11_geo_cbse_04_006', 'c11_geo_cbse_04_007', 'c11_geo_cbse_04_011', 'c11_geo_cbse_11_003', 'c11_geo_cbse_08_004', 'c11_geo_cbse_19_007', 'c11_geo_cbse_08_002', 'c11_geo_cbse_08_005', 'c11_geo_cbse_08_007', 'c11_geo_cbse_19_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Look at a physical world map and notice how the eastern coastline of South America fits remarkably well into.', goal: 'Master Continental Drift Theory: Wegener\'s Hypothesis.' },
    discovery: {
        question: 'State the name of the supercontinent and the global ocean in Wegener\'s theory, and give the approximate geological time when Pangaea began to break apart.',
        options: ['Pangaea (supercontinent) and Panthalassa (global ocean)', 'Gondwana and Laurasia', '100 million years'],
        answer: 'Pangaea (supercontinent) and Panthalassa (global ocean)',
        hook: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.',
    },
    teaching: [
        { title: 'Continental Drift Theory, proposed by Alfred.', text: 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day continents were once joined together in a single supercontinent called Pangaea, surrounded by a global ocean.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_001', title: 'Continental Drift Theory, proposed by.',
          scaffold: { problem: 'A student finds *Glossopteris* fossil leaves in rock samples from Jharkhand (India), New South Wales (Australia), and Transantarctic.',
            steps: [
            { text: 'Identify the biological constraint — *Glossopteris* was a temperate deciduous plant requiring seasonal light, unable to.' },
            { text: 'Note current latitudes — Antarctica at 85°S is far too cold; India at 23°N is too warm; only Australia at 33°S is.' },
            { text: 'Reconstruct Gondwana — rotate India northward, Australia eastward, Antarctica away from pole so all three lie between.' },
            { text: 'Calculate paleolatitude shift for Antarctica: from reconstructed ~60°S to current 85°S = 25° of poleward movement.' },
            { text: 'Convert to distance: 1° latitude ≈ 111 km → 25° × 111 km = 2,775 km northward drift of Antarctica relative to South.' },
            { text: 'Synthesize — identical fossils at three now-disparate latitudes imply continents moved, not climate zones; the 2,775 km.', faded: true, blankAnswer: 'Wegener argued *Glossopteris* could not disperse across.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_003', title: 'The jigsaw fit of coastlines refers to.',
          scaffold: { problem: 'A student is given a bathymetric map of the South Atlantic showing the 1000 m isobath for South America and Africa.',
            steps: [
            { text: 'Identify the continental shelf break on both continents using the 1000 m isobath contour.' },
            { text: 'Align the two margins by matching the prominent indentations and protrusions (e.g., the Gulf of Guinea and the.' },
            { text: 'Observe that at the Niger Delta (off Nigeria), there is a significant gap between the two margins.' },
            { text: 'Recognize that this gap is due to massive sediment deposition by the Niger River after separation, which has built out.' },
            { text: 'Observe an overlap at the Walvis Ridge (off Namibia) and the Rio Grande Rise (off Brazil).' },
            { text: 'Explain that these are aseismic ridges formed by hotspot volcanism after the continents separated, causing excess crust.', faded: true, blankAnswer: 'The fit is excellent overall (<2% gap), but imperfections.' }
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_007', title: 'Tropical cyclones in India are intense.',
          scaffold: { problem: 'A depression forms at 12°N, 90°E on 15 October with SST 29.5°C, low-level relative vorticity 5×10⁻⁵ s⁻¹, and 200–850 hPa wind shear of 8.',
            steps: [
            { text: 'Identify the basin — coordinates place it in the Bay of Bengal, a high-cyclogenesis region.' },
            { text: 'Check thermodynamic parameter — SST 29.5°C > 26.5°C threshold, sufficient oceanic heat content.' },
            { text: 'Evaluate dynamic parameter — low-level vorticity 5×10⁻⁵ s⁻¹ exceeds the typical 3×10⁻⁵ s⁻¹ minimum for genesis.' },
            { text: 'Assess vertical wind shear — 8 kt is well below the 20 kt inhibition threshold, allowing vertical alignment.' },
            { text: 'Consider seasonal context — mid-October is peak post-monsoon season with favorable MJO phase often present.' },
            { text: 'Synthesize — all Genesis Potential Index (GPI) components are favorable; rapid intensification to cyclonic storm is.', faded: true, blankAnswer: 'Yes, the system has high probability (>80%) of becoming a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_005', title: 'Arthur Holmes\' Convectional Current.',
          scaffold: { problem: 'A student claims: "Holmes\' convection currents move continents like rafts on a river." Analyze this analogy: identify two ways it is.',
            steps: [
            { text: 'Identify the core analogy — continents as passive rafts on a flowing substrate (lateral mantle flow).' },
            { text: 'Accuracy 1 — Continents are indeed dragged horizontally by basal shear stress from lateral flow (passive drift).' },
            { text: 'Accuracy 2 — Rising limbs cause continental breakup (rifting) just as upwelling water would push rafts apart.' },
            { text: 'Oversimplification 1 — Mantle flow is solid-state creep (cm/yr), not liquid water flow; viscosity is 10^21 Pa·s, so.' },
            { text: 'Oversimplification 2 — Continents are not passive; their thick roots (keels) interact with flow, and they insulate the.', faded: true, blankAnswer: 'The analogy is kinematically useful but rheologically and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_006', title: 'Ocean floor mapping is the scientific.',
          scaffold: { problem: 'Using the depth-age formula, estimate the age of oceanic crust at a depth of 5000 m on the flank of the Mid-Atlantic Ridge, given ridge.',
            steps: [
            { text: 'Identify the given values: d = 5000 m, d₀ = 2500 m, k = 350 m/√Myr.' },
            { text: 'Write the depth-age formula: d = d₀ + k√t.' },
            { text: 'Subtract d₀ from both sides: d - d₀ = k√t → 5000 - 2500 = 2500 = 350√t.' },
            { text: 'Solve for √t: √t = 2500 / 350 ≈ 7.14.' },
            { text: 'Square both sides: t ≈ (7.14)² ≈ 51 Myr.', faded: true, blankAnswer: 'The crust is approximately 51 million years old.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_04_003', title: 'Identify each idea',
          dissect: { specimen: 'Continental Drift Theory: Wegener\'s Hypothesis', spots: [
            { id: 's1', label: 'Continental Drift Theory proposed by', prompt: 'Which idea is this? — Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day.', answer: 'Continental Drift Theory proposed by', options: ['Continental Drift Theory proposed by', 'The jigsaw fit of coastlines', 'Lithospheric plates are rigid segments', 'Tropical cyclones in India are'] },
            { id: 's2', label: 'The jigsaw fit of coastlines', prompt: 'Which idea is this? — The jigsaw fit of coastlines refers to the remarkable geometric complementarity between.', answer: 'The jigsaw fit of coastlines', options: ['The jigsaw fit of coastlines', 'Continental Drift Theory proposed by', 'Lithospheric plates are rigid segments', 'Tropical cyclones in India are'] },
            { id: 's3', label: 'Lithospheric plates are rigid segments', prompt: 'Which idea is this? — Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost.', answer: 'Lithospheric plates are rigid segments', options: ['Lithospheric plates are rigid segments', 'Continental Drift Theory proposed by', 'The jigsaw fit of coastlines', 'Tropical cyclones in India are'] },
            { id: 's4', label: 'Tropical cyclones in India are', prompt: 'Which idea is this? — Tropical cyclones in India are intense low-pressure systems forming over warm tropical.', answer: 'Tropical cyclones in India are', options: ['Tropical cyclones in India are', 'Continental Drift Theory proposed by', 'The jigsaw fit of coastlines', 'Lithospheric plates are rigid segments'] },
            { id: 's5', label: 'Arthur Holmes Convectional Current Theory', prompt: 'Which idea is this? — Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal convection.', answer: 'Arthur Holmes Convectional Current Theory', options: ['Arthur Holmes Convectional Current Theory', 'Continental Drift Theory proposed by', 'The jigsaw fit of coastlines', 'Lithospheric plates are rigid segments'] },
            { id: 's6', label: 'Ocean floor mapping is the', prompt: 'Which idea is this? — Ocean floor mapping is the scientific process of charting the topography of the seabed.', answer: 'Ocean floor mapping is the', options: ['Ocean floor mapping is the', 'Continental Drift Theory proposed by', 'The jigsaw fit of coastlines', 'Lithospheric plates are rigid segments'] }
          ] } }
    ],
    explore: { component: C11_GeographyOceanCurrentsSim, prompt: 'Explore the interactive — Continental Drift Theory: Wegener\'s Hypothesis' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_001', difficulty: 'standard',
          question: 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all.',
          hint: 'Revisit Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) to.',
          misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.',
          parts: [
                { id: 'a', prompt: 'State the name of the supercontinent and the global ocean in Wegener\'s theory, and give the approximate geological time when Pangaea began to break apart.', answer: 'Pangaea (supercontinent) and Panthalassa (global ocean)',
                  options: ['Pangaea (supercontinent) and Panthalassa (global ocean)', 'Gondwana and Laurasia', '100 million years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.' }
          ],
            remediations: { 'continents-drift-like-rafts-on': { steps: ['Use a "Pangaea puzzle" (cardboard cutouts of continents with continental shelves) — assemble on a sphere.', 'Overlay a transparent sheet showing modern plate boundaries (from c9_geo_ch1_2) — notice continents + adjacent ocean.', 'Watch a 30-second mantle convection animation (cross-section) — see plates dragged by circulating mantle, not plowing.', 'Redraw the India-Asia collision showing the *entire Indo-Australian Plate* subducting, not just the continent.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Wegener\'s theory was rejected because his evidence was weak." Support your judgment with three specific historical criticisms raised.', answer: 'The statement is false',
                  options: ['The statement is false', 'weak evidence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.' }
          ],
            remediations: { 'continents-drift-like-rafts-on': { steps: ['Use a "Pangaea puzzle" (cardboard cutouts of continents with continental shelves) — assemble on a sphere.', 'Overlay a transparent sheet showing modern plate boundaries (from c9_geo_ch1_2) — notice continents + adjacent ocean.', 'Watch a 30-second mantle convection animation (cross-section) — see plates dragged by circulating mantle, not plowing.', 'Redraw the India-Asia collision showing the *entire Indo-Australian Plate* subducting, not just the continent.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_003', difficulty: 'standard',
          question: 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity.',
          hint: 'Review the structure of the Earth\'s crust (continental vs. oceanic) and the concept of.',
          misconception: 'Students often think the jigsaw fit is based on the present-day coastlines (the land-water boundary seen on political.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between',
                  options: ['The jigsaw fit of coastlines refers to the remarkable geometric complementarity between', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost', 'Tropical cyclones in India are intense low-pressure systems forming over warm tropical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the jigsaw fit is based on the present-day coastlines (the land-water boundary seen on political maps) and that the.' }
          ],
            remediations: { 'the-jigsaw-fit-is-based': { steps: ['If a student holds this misconception, have them: 1) Compare a standard political map with a bathymetric map showing.', '2) Trace the continental shelf edges on tracing paper and attempt the fit.', '3) Identify and explain the gaps/overlaps (e.g., Niger Delta sediment, Walvis Ridge volcanism).', '4) Conclude that the fit is geological (continental crust) not geographical (shoreline).'] } } },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_007', difficulty: 'standard',
          question: 'Tropical cyclones in India are intense low-pressure systems forming over warm.',
          hint: 'If stuck, revisit Class 9 Chapter 2 (Atmosphere) sections on pressure belts, wind.',
          misconception: 'Students often believe that the Arabian Sea produces more cyclones because it is larger, or that cyclones only occur.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tropical cyclones in India are intense low-pressure systems forming over warm tropical',
                  options: ['Tropical cyclones in India are intense low-pressure systems forming over warm tropical', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between', 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Arabian Sea produces more cyclones because it is larger, or that cyclones only occur during the monsoon.' }
          ],
            remediations: { 'the-arabian-sea-produces-more': { steps: ['Plot the last 10 years’ cyclone tracks from IMD data on a blank map of the Indian Ocean — use red for Bay of Bengal,.', 'Count systems per basin per month; create a bar graph.', 'Overlay monthly mean wind shear (200–850 hPa) and SST charts from NOAA/ESRL.', 'Observe the inverse relationship between shear and cyclone count during June–September.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_005', difficulty: 'standard',
          question: 'Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal.',
          hint: 'Revisit node c11_geo_cbse_04_001 section "Why Wegener\'s Forces Were Rejected" and Class 9.',
          misconception: 'Students often think Holmes proposed convection currents in the *liquid outer core* or *asthenosphere* (modern plate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal convection',
                  options: ['Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal convection', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between', 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and uppermost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Holmes proposed convection currents in the *liquid outer core* or *asthenosphere* (modern plate tectonics view).' }
          ],
            remediations: { 'holmes-proposed-convection-currents-in': { steps: ['Re-read the "force problem" in Wegener\'s theory (node c11_geo_cbse_04_001).', 'Draw a simple boiling water analogy: heat source at bottom → rising bubbles → surface flow → sinking cooled water.', 'Contrast with modern plate tectonics (node c11_geo_cbse_04_008) using a T-chart: Holmes (whole-mantle cells, continents.', 'Explain to a peer why Holmes\' theory was rejected for 30 years (no seafloor data, mantle rigidity objection).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_006', difficulty: 'standard',
          question: 'Ocean floor mapping is the scientific process of charting the topography of the.',
          hint: 'Review Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) and.',
          misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system.',
          parts: [
                { id: 'a', prompt: 'What is the primary modern technology used to create high-resolution maps of the ocean floor, and what physical principle does it rely on?', answer: 'Multibeam echo sounding (sonar) is the primary ship-based technology',
                  options: ['Multibeam echo sounding (sonar) is the primary ship-based technology', 'satellite photography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' },
                { id: 'b', prompt: 'Why are mid-oceanic ridges elevated compared to the surrounding abyssal plains, and what does this elevation indicate about the underlying mantle?', answer: 'Ridges stand 2–3 km above abyssal plains',
                  options: ['Ridges stand 2–3 km above abyssal plains', 'ridges are piles of sediment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' },
                { id: 'c', prompt: 'Compare the morphology of the Mid-Atlantic Ridge (slow-spreading) and the East Pacific Rise (fast-spreading). How do their axial valley vs.', answer: 'Slow-spreading ridges (MAR) have a deep axial rift valley (1–2 km deep)',
                  options: ['Slow-spreading ridges (MAR) have a deep axial rift valley (1–2 km deep)', 'both have rift valleys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' }
          ],
            remediations: { 'mid-ocean-ridges-are-single': { steps: ['Have the student trace the Mid-Atlantic Ridge on a bathymetric map (e.g., GEBCO) from 60°N to 60°S, marking every major.', 'Then use a plate motion calculator (e.g., GPlates) to verify that the offsets match the predicted small circles of.', 'This visual-tactile exercise replaces the "single line" mental model with a segmented, faulted system.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
