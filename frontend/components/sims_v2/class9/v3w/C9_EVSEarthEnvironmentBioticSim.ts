import type { SimDef } from '../../engine/types';
import C9_EVSEarthEnvironmentBioticSim from '../../../simulations/c6_12/C9_EVSEarthEnvironmentBioticSim';

/** v3 wrapped master — C9_EVSEarthEnvironmentBioticSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_evsearthenvironmentbioticsim: SimDef = {
    id: 'v3w_c9_evsearthenvironmentbioticsim',
    title: 'Earth Environment Biotic',
    subtitle: 'Covers erosional and depositional coastal landforms formed by sea waves and currents,.',
    classLevel: 9, subject: 'evs', topic: 'Coastal Landforms and Human-Landform Relationships',
    chapters: [],
    nodeIds: ['c9_geo_ch1_11', 'c9_bio_ch4_6', 'c9_geo_ch1_1', 'c9_geo_ch1_12', 'c9_geo_ch1_2', 'c9_geo_ch1_5', 'c9_geo_ch1_6', 'c9_geo_ch1_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Stand on Marina Beach in Chennai at low tide and observe the wide sandy beach, then walk to the rocky.', goal: 'Master Earth Environment Biotic.' },
    discovery: {
        question: 'Why is the mass nesting (arribada) of Olive Ridley turtles on Odisha\'s Gahirmatha beach considered a behavioural adaptation?',
        options: ['Mass nesting is a behavioural adaptation', 'a habit they learned', 'they gather for safety'],
        answer: 'Mass nesting is a behavioural adaptation',
        hook: 'Students frequently believe adaptations arise because an organism *needs* a trait and *acquires* it during its lifetime.',
    },
    teaching: [
        { title: 'Coastal landforms are natural features.', text: 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves, currents, tides, and wind along the shoreline, classified as erosional (cliffs, wave-cut platforms, sea caves,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch1_11', title: 'Coastal landforms are natural features.',
          scaffold: { problem: 'A student visits Dhanushkodi (Tamil Nadu) at the tip of Rameswaram Island and observes a narrow sandy ridge connecting the island to the.',
            steps: [
            { text: 'Identify the landform - the narrow sandy connection between an offshore island and the mainland is a tombolo, a.' },
            { text: 'Recall the formation principle - tombolos form when wave refraction around an island reduces wave energy in the lee.' },
            { text: 'Apply to Dhanushkodi - the Gulf of Mannar and Palk Bay converge here; waves refract around Rameswaram Island,.' },
            { text: 'Analyze cyclone impact - a cyclone breach would cut the tombolo, creating a tidal inlet; tidal currents would widen it,.' },
            { text: 'Interpret human consequence - the 1964 cyclone destroyed the railway line on this tombolo; rebuilding requires either.', faded: true, blankAnswer: 'Tombolo; formed by wave refraction and longshore drift.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch4_6', title: 'Adaptation is a heritable structural,.',
          scaffold: { problem: 'The Indian Desert Jird (*Meriones hurrianae*), a rodent of the Thar Desert, has exceptionally long hind legs, large eyes, and produces.',
            steps: [
            { text: 'Identify the key abiotic challenges of the Thar Desert: extreme heat, scarce water, loose sandy substrate, and high.' },
            { text: 'Match each trait to a specific challenge: long hind legs → locomotion on sand; large eyes → sensory perception;.' },
            { text: 'Explain the biomechanical/physiological mechanism: elongated metatarsals increase stride length and allow bipedal.' },
            { text: 'Link to fitness consequences: efficient foraging over large home ranges, predator evasion at night, and survival.' },
            { text: 'Synthesise: These co-adapted traits form an "adaptive syndrome" for desert granivory, illustrating how multiple.', faded: true, blankAnswer: 'The long hind legs enable rapid, energy-efficient bipedal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_1', title: 'Earth\'s interior is divided into three.',
          scaffold: { problem: 'The continental crust under the Himalayas is ~70 km thick (density 2.7 g/cm³).',
            steps: [
            { text: 'Identify the principle — isostatic equilibrium: pressure at compensation depth is equal for both columns.' },
            { text: 'Set up equation for continental column: P_cont = ρ_crust_cont × g × T_crust_cont + ρ_mantle × g × T_root_cont.' },
            { text: 'Set up for oceanic column: P_ocean = ρ_crust_ocean × g × T_crust_ocean + ρ_mantle × g × T_root_ocean.' },
            { text: 'Equate pressures, cancel g, solve for root thickness difference (T_root_cont - T_root_ocean). Use ρ_mantle = 3.3 g/cm³.' },
            { text: 'Calculate: Continental root ≈ 70 × (3.3-2.7)/(3.3-2.7) + adjustment for crustal thickness difference → continental root.', faded: true, blankAnswer: 'Continental crust root extends ~35-40 km deeper into mantle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_12', title: 'Natural hazards are extreme geophysical.',
          scaffold: { problem: 'A village in the Kumaon Himalayas (Uttarakhand) sits on a 35° slope of weathered phyllite, 200 m above a river that is actively eroding its.',
            steps: [
            { text: 'Identify the geological setting — phyllite is a foliated metamorphic rock with low shear strength along foliation.' },
            { text: 'Evaluate slope angle — 35° exceeds the angle of repose for weathered phyllite (~30°), making it inherently unstable.' },
            { text: 'Analyze toe erosion — river undercutting removes lateral support, increasing driving forces on the slope mass.' },
            { text: 'Assess rainfall — 2500 mm concentrated in 2 months causes rapid pore water pressure rise, reducing effective stress and.' },
            { text: 'Factor in deforestation — loss of root cohesion (typically 5-15 kPa) and reduced evapotranspiration leave slopes.' },
            { text: 'Synthesize — All four factors (lithology, slope, toe erosion, rainfall, vegetation loss) align → Very High hazard.', faded: true, blankAnswer: 'Very High landslide hazard. The slope is critically.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_2', title: 'Plate tectonics is the scientific.',
          scaffold: { problem: 'A student observes that the east coast of South America and the west coast of Africa fit together like a jigsaw puzzle.',
            steps: [
            { text: 'Identify that the matching coastlines suggest the continents were once joined (Pangaea/ Gondwana).' },
            { text: 'Recall that the lithosphere is divided into plates; South America and Africa sit on separate plates (South American.' },
            { text: 'Determine the boundary type: a divergent boundary (mid-ocean ridge) exists between them in the Atlantic Ocean.' },
            { text: 'Apply the mechanism: mantle convection currents rose beneath the ancient continent, creating a rift valley that widened.' },
            { text: 'Verify with evidence: the Mid-Atlantic Ridge is the active divergent boundary; magnetic striping on the ocean floor.', faded: true, blankAnswer: 'The continents separated due to divergent plate movement.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_5', title: 'A volcano is a vent or fissure in the.',
          scaffold: { problem: 'A student is given a rock sample from a volcano with 52% silica content, low gas emissions, and lava flows that traveled 15 km from the.',
            steps: [
            { text: 'Note the silica content (52%) — this is intermediate between basaltic (<52%) and andesitic (52-63%), but closer to.' },
            { text: 'Recall that low silica = low viscosity = effusive eruptions with long lava flows; 15 km flow distance confirms fluid.' },
            { text: 'Match to volcano type: shield volcanoes produce such flows (e.g., Kilauea); composite volcanoes have higher silica.' },
            { text: 'Determine tectonic setting: basaltic shield volcanoes occur at divergent boundaries (mid-ocean ridges) and hotspots;.' },
            { text: 'Verify: Barren Island (India) is andesitic (composite) — so this sample is NOT from there; it matches Hawaiian or.', faded: true, blankAnswer: 'The sample is from a shield volcano, basaltic magma, likely.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_bio_ch4_6', title: 'Identify each idea',
          dissect: { specimen: 'Earth Environment Biotic', spots: [
            { id: 's1', label: 'Coastal landforms are natural features', prompt: 'Which idea is this? — Coastal landforms are natural features shaped by the dynamic interaction of sea waves,.', answer: 'Coastal landforms are natural features', options: ['Coastal landforms are natural features', 'Adaptation is a heritable structural', 'Earths interior is divided into', 'Natural hazards are extreme geophysical'] },
            { id: 's2', label: 'Adaptation is a heritable structural', prompt: 'Which idea is this? — Adaptation is a heritable structural, behavioural, or physiological trait that enhances.', answer: 'Adaptation is a heritable structural', options: ['Adaptation is a heritable structural', 'Coastal landforms are natural features', 'Earths interior is divided into', 'Natural hazards are extreme geophysical'] },
            { id: 's3', label: 'Earths interior is divided into', prompt: 'Which idea is this? — Earth\'s interior is divided into three concentric layers based on chemical composition.', answer: 'Earths interior is divided into', options: ['Earths interior is divided into', 'Coastal landforms are natural features', 'Adaptation is a heritable structural', 'Natural hazards are extreme geophysical'] },
            { id: 's4', label: 'Natural hazards are extreme geophysical', prompt: 'Which idea is this? — Natural hazards are extreme geophysical or hydrometeorological events — such as.', answer: 'Natural hazards are extreme geophysical', options: ['Natural hazards are extreme geophysical', 'Coastal landforms are natural features', 'Adaptation is a heritable structural', 'Earths interior is divided into'] },
            { id: 's5', label: 'Plate tectonics is the scientific', prompt: 'Which idea is this? — Plate tectonics is the scientific theory explaining that Earth\'s lithosphere is divided.', answer: 'Plate tectonics is the scientific', options: ['Plate tectonics is the scientific', 'Coastal landforms are natural features', 'Adaptation is a heritable structural', 'Earths interior is divided into'] },
            { id: 's6', label: 'A volcano is a vent', prompt: 'Which idea is this? — A volcano is a vent or fissure in the Earth\'s crust through which molten rock (magma),.', answer: 'A volcano is a vent', options: ['A volcano is a vent', 'Coastal landforms are natural features', 'Adaptation is a heritable structural', 'Earths interior is divided into'] }
          ] } }
    ],
    explore: { component: C9_EVSEarthEnvironmentBioticSim, prompt: 'Explore the interactive — Earth Environment Biotic' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_11', difficulty: 'standard',
          question: 'Coastal landforms are natural features shaped by the dynamic interaction of sea.',
          hint: 'Revisit c9_geo_ch1_9 "Erosion and Deposition by Sea Waves and Wind" - specifically the.',
          misconception: 'Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe sea walls should be.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) a major erosional coastal landform on the Western Coast, (b) a major depositional landform on the Eastern.', answer: 'a major erosional coastal landform on the Western Coast, (',
                  options: ['a major erosional coastal landform on the Western Coast, (', 'sea walls should be built everywhere to stop erosion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe sea walls should be built everywhere to.' }
          ],
            remediations: { 'all-coastal-erosion-is-bad': { steps: ['Use a tray of wet sand and a paddle to simulate waves - create a headland and bay, generate waves, and observe where.', 'Place a "sea wall" (ruler) at the headland base and repeat - observe increased scour at the wall base and reduced.', 'Compare with Google Earth images of Varkala (cliffs) and Kovalam (beach) 15 km apart - trace the longshore drift.', 'Draw the sediment cell concept: source (cliffs) → transport (longshore drift) → sink (beaches/spits) to visualize why.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_6', difficulty: 'standard',
          question: 'Adaptation is a heritable structural, behavioural, or physiological trait that.',
          hint: 'Revisit c9_bio_ch4_2 (Evolution: Basic Concept and Evidence) to reinforce variation,.',
          misconception: 'Students frequently believe adaptations arise because an organism *needs* a trait and *acquires* it during its lifetime.',
          parts: [
                { id: 'a', prompt: 'Why is the mass nesting (arribada) of Olive Ridley turtles on Odisha\'s Gahirmatha beach considered a behavioural adaptation?', answer: 'Mass nesting is a behavioural adaptation',
                  options: ['Mass nesting is a behavioural adaptation', 'a habit they learned', 'they gather for safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe adaptations arise because an organism *needs* a trait and *acquires* it during its lifetime through use or.' }
          ],
            remediations: { 'students-frequently-believe-adaptations-arise': { steps: ['**Simulation:** Use a "Bird Beak" activity: students use different tools (tweezers, spoons, clips) as "beaks" to pick.', 'Only the "survivors" (top collectors) reproduce (pass their tool to the next round).', '**Debrief:** Show that the "beak" type didn\'t change during the round; the *proportion* of beak types in the population.', '**Explicit Contrast:** Write "Lamarck: Need → Change → Inheritance" vs.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_1', difficulty: 'standard',
          question: 'Earth\'s interior is divided into three concentric layers based on chemical.',
          hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then.',
          misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.',
          parts: [
                { id: 'a', prompt: 'Name the three main chemical layers of Earth\'s interior in order from surface to centre, and state the approximate thickness of each.', answer: 'Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius)',
                  options: ['Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius)', 'lithosphere, asthenosphere, mesosphere', 'ductile solid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' },
                { id: 'b', prompt: 'Explain why the continental crust is thicker but less dense than oceanic crust, and how this relates to the principle of isostasy.', answer: 'Continental crust (avg',
                  options: ['Continental crust (avg', 'ductile solid', 'liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' },
                { id: 'c', prompt: 'An earthquake occurs at 20°N, 80°E. A seismometer at 40°N, 80°E (same longitude, 2,200 km away) records both P and S waves.', answer: 'Step 1: S-waves cannot travel through liquids',
                  options: ['Step 1: S-waves cannot travel through liquids', 'mantle = magma', 'ductile solid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' }
          ],
            remediations: { 'the-mantle-is-molten-liquid': { steps: ['Show seismic wave animation — S-waves travel through mantle (proving solid) but stop at outer core.', 'Demonstrate "solid but ductile" with silly putty: hit it (brittle fracture like crust), pull slowly (ductile flow like.', 'Use phase diagram of iron — show how pressure keeps inner core solid despite higher temperature.', 'Assign: "Explain why mantle xenoliths in basalt are solid rocks, not melt."'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_12', difficulty: 'standard',
          question: 'Natural hazards are extreme geophysical or hydrometeorological events — such as.',
          hint: 'Revisit c9_geo_ch1_8 (floodplain formation) and c9_geo_ch1_7 (weathering and slope.',
          misconception: 'Students believe landslides are caused only by heavy rain, ignoring that rain is the trigger, not the cause — the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Natural hazards are extreme geophysical or hydrometeorological events',
                  options: ['Natural hazards are extreme geophysical or hydrometeorological events', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,', 'Adaptation is a heritable structural, behavioural, or physiological trait that enhances', 'Earth\'s interior is divided into three concentric layers based on chemical composition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe landslides are caused only by heavy rain, ignoring that rain is the trigger, not the cause — the real cause is.' }
          ],
            remediations: { 'landslides-are-caused-only-by': { steps: ['Show a cross-section of a Himalayan slope — label bedrock, regolith, water table, vegetation roots.', 'Demonstrate with a tray of sand at 30°: dry = stable; add water → fails; add \'roots\' (mesh) → holds.', 'Map Malin landslide site on Google Earth — measure slope, check land cover change (1990 vs 2014), trace river bend at.', 'Ask student to rewrite the cause as a chain: "Tectonic uplift → steep slope + weak rock → deforestation → loss of root.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_2', difficulty: 'standard',
          question: 'Plate tectonics is the scientific theory explaining that Earth\'s lithosphere is.',
          hint: 'If stuck, review c9_geo_ch1_1 (Earth\'s Layers) to recall lithosphere/asthenosphere.',
          misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with.',
          parts: [
                { id: 'a', prompt: 'Explain why convection currents in the mantle cause tectonic plates to move.', answer: 'Heat from the core creates rising hot magma and sinking cooler magma in the',
                  options: ['Heat from the core creates rising hot magma and sinking cooler magma in the', 'plates move because the Earth is spinning', 'plates float like boats on water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate is.' },
                { id: 'b', prompt: 'On a world map, the Mid-Atlantic Ridge runs down the center of the Atlantic Ocean.', answer: 'Step 1: Recognize Mid-Atlantic Ridge as an underwater mountain chain',
                  options: ['Step 1: Recognize Mid-Atlantic Ridge as an underwater mountain chain', 'plate boundary', 'plate margin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate is.' },
                { id: 'c', prompt: 'Compare the geological activity at the Himalayan boundary (Indian Plate vs Eurasian Plate) with the Andes boundary (Nazca Plate vs South American Plate).', answer: 'Similarity: Both are convergent boundaries where plates collide',
                  options: ['Similarity: Both are convergent boundaries where plates collide', 'plate boundary', 'plate margin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate is.' }
          ],
            remediations: { 'plate-boundary-and-plate-margin': { steps: ['Use a tectonic map of South Asia (from NCERT Atlas) and trace the Indian Plate boundary with three colored pencils: red.', 'Label each segment with the plate names and movement arrows.', 'Explain that a single plate can have all three boundary types simultaneously.', 'Practice with a blank map until the student can draw and label the Indian Plate boundaries from memory.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Transform boundaries are the most destructive plate boundaries because they produce the strongest earthquakes." Justify your answer.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'plate boundary', 'plate margin'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate is.' }
          ],
            remediations: { 'plate-boundary-and-plate-margin': { steps: ['Use a tectonic map of South Asia (from NCERT Atlas) and trace the Indian Plate boundary with three colored pencils: red.', 'Label each segment with the plate names and movement arrows.', 'Explain that a single plate can have all three boundary types simultaneously.', 'Practice with a blank map until the student can draw and label the Indian Plate boundaries from memory.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_5', difficulty: 'standard',
          question: 'A volcano is a vent or fissure in the Earth\'s crust through which molten rock.',
          hint: 'Revisit c9_geo_ch1_3 (Types of Plate Movements) and practice identifying boundary types.',
          misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A volcano is a vent or fissure in the Earth\'s crust through',
                  options: ['A volcano is a vent or fissure in the Earth\'s crust through', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,', 'Adaptation is a heritable structural, behavioural, or physiological trait that enhances', 'Earth\'s interior is divided into three concentric layers based on chemical composition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' }
          ],
            remediations: { 'all-volcanoes-are-steep': { steps: ['Use a physical world map with plate boundaries overlaid; have the student trace the Pacific Plate boundary and mark.', 'Compare two volcano cross-section diagrams (shield vs. composite) side-by-side; ask the student to label magma.', 'Show a 30-second video of Kilauea\'s effusive lava vs. Mt. St. Helens\' explosive eruption; ask them to predict which.', 'Have them locate Barren Island (India\'s active volcano) on the map and identify its setting (subduction of Indian Plate.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "Volcanic eruptions are purely destructive natural hazards with no long-term benefits to human societies." Provide geographical reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'all volcanoes are steep, explosive mountains like Mt'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' },
                { id: 'b', prompt: 'Design a simple annotated sketch map for a Class 9 student showing the three main global volcanic zones, labeling one example volcano in each zone, and.', answer: 'A good sketch shows: (1) Pacific Ring of Fire',
                  options: ['A good sketch shows: (1) Pacific Ring of Fire', 'all volcanoes are steep, explosive mountains like Mt'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' }
          ],
            remediations: { 'all-volcanoes-are-steep': { steps: ['Use a physical world map with plate boundaries overlaid; have the student trace the Pacific Plate boundary and mark.', 'Compare two volcano cross-section diagrams (shield vs. composite) side-by-side; ask the student to label magma.', 'Show a 30-second video of Kilauea\'s effusive lava vs. Mt. St. Helens\' explosive eruption; ask them to predict which.', 'Have them locate Barren Island (India\'s active volcano) on the map and identify its setting (subduction of Indian Plate.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
