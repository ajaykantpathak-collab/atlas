import type { SimDef } from '../../engine/types';
import C9_GeographyLandformsPlateausSim from '../../../simulations/c6_12/C9_GeographyLandformsPlateausSim';

/** v3 wrapped master — C9_GeographyLandformsPlateausSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_geographylandformsplateaussim: SimDef = {
    id: 'v3w_c9_geographylandformsplateaussim',
    title: 'Plains, Plateaus and Valleys: Formation and Characteristics',
    subtitle: 'Covers formation processes and characteristics of plains, plateaus, and valleys globally.',
    classLevel: 9, subject: 'geography', topic: 'Plains, Plateaus and Valleys: Formation and Characteristics',
    chapters: [],
    nodeIds: ['c9_geo_ch1_10', 'c9_geo_ch2_7', 'c9_geo_ch1_1', 'c9_geo_ch1_11', 'c9_geo_ch1_12', 'c9_geo_ch1_2', 'c9_geo_ch1_3', 'c9_geo_ch1_4', 'c9_geo_ch1_5', 'c9_geo_ch1_7', 'c9_geo_ch1_8', 'c9_geo_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Look at the flat farmland around your village or city - notice how the soil is deep, stone-free, and the land.', goal: 'Master Plains, Plateaus and Valleys: Formation and Characteristics.' },
    discovery: {
        question: 'Evaluate the statement: "The Indo-Gangetic Plain is entirely a depositional landform with no structural control." Provide evidence from its northern and.',
        options: ['The statement is partially incorrect', 'old, eroded mountains', 'young, flat lands'],
        answer: 'The statement is partially incorrect',
        hook: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically.',
    },
    teaching: [
        { title: 'Plains are extensive low-relief areas formed.', text: 'Plains are extensive low-relief areas formed primarily by depositional processes of rivers, wind, or glaciers, or by erosion reducing highlands to near-base level; plateaus are elevated flat-topped.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch1_10', title: 'Plains are extensive low-relief areas.',
          scaffold: { problem: 'The Damodar Valley in Jharkhand-West Bengal is a rift valley running east-west across the Chotanagpur Plateau.',
            steps: [
            { text: 'Identify the structural setting - Damodar Valley lies along the Damodar Fault, a major E-W trending fracture zone in.' },
            { text: 'Determine the tectonic mechanism - During Gondwana breakup (Permian-Triassic), crustal extension created a graben.' },
            { text: 'Explain sediment accumulation - The graben subsided over millions of years, accumulating fluvial/lacustrine sediments.' },
            { text: 'Link to coal formation - Dense forests grew in the warm humid basin; organic matter buried in anoxic lake bottoms.' },
            { text: 'Interpret present topography - Subsequent uplift of the plateau and river incision (Damodar River) exhumed the basin,.', faded: true, blankAnswer: 'Damodar Valley is a tectonic rift valley (graben) formed by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_7', title: 'The Indian Monsoon is a seasonal.',
          scaffold: { problem: 'A weather station in Bhopal (central India) records the following: On June 15, wind shifts from westerly to southwesterly, humidity jumps.',
            steps: [
            { text: 'Identify the events – June 15 marks Southwest Monsoon onset over Bhopal; October 5 marks Southwest Monsoon withdrawal.' },
            { text: 'Recall the pressure pattern for onset – intense heating over NW India (Thar Desert) creates a strong thermal low.' },
            { text: 'Apply to Bhopal – as the monsoon trough (elongated low) extends northwestward from the Bay of Bengal across central.' },
            { text: 'Recall the pressure pattern for withdrawal – by September, the sun shifts south, NW India cools, thermal low fills up.' },
            { text: 'Apply to Bhopal – by October 5, the monsoon trough has retreated southeastward; Bhopal comes under the influence of the.', faded: true, blankAnswer: 'June 15 = Southwest Monsoon onset caused by northward shift.' }
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
        { type: 'scaffold', nodeId: 'c9_geo_ch1_11', title: 'Coastal landforms are natural features.',
          scaffold: { problem: 'A student visits Dhanushkodi (Tamil Nadu) at the tip of Rameswaram Island and observes a narrow sandy ridge connecting the island to the.',
            steps: [
            { text: 'Identify the landform - the narrow sandy connection between an offshore island and the mainland is a tombolo, a.' },
            { text: 'Recall the formation principle - tombolos form when wave refraction around an island reduces wave energy in the lee.' },
            { text: 'Apply to Dhanushkodi - the Gulf of Mannar and Palk Bay converge here; waves refract around Rameswaram Island,.' },
            { text: 'Analyze cyclone impact - a cyclone breach would cut the tombolo, creating a tidal inlet; tidal currents would widen it,.' },
            { text: 'Interpret human consequence - the 1964 cyclone destroyed the railway line on this tombolo; rebuilding requires either.', faded: true, blankAnswer: 'Tombolo; formed by wave refraction and longshore drift.' }
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
        { type: 'dissect', nodeId: 'c9_geo_ch2_7', title: 'Identify each idea',
          dissect: { specimen: 'Plains, Plateaus and Valleys: Formation and Characteristics', spots: [
            { id: 's1', label: 'Plains are extensive low-relief areas', prompt: 'Which idea is this? — Plains are extensive low-relief areas formed primarily by depositional processes of.', answer: 'Plains are extensive low-relief areas', options: ['Plains are extensive low-relief areas', 'The Indian Monsoon is a', 'Earths interior is divided into', 'Coastal landforms are natural features'] },
            { id: 's2', label: 'The Indian Monsoon is a', prompt: 'Which idea is this? — The Indian Monsoon is a seasonal reversal of wind direction over the Indian subcontinent,.', answer: 'The Indian Monsoon is a', options: ['The Indian Monsoon is a', 'Plains are extensive low-relief areas', 'Earths interior is divided into', 'Coastal landforms are natural features'] },
            { id: 's3', label: 'Earths interior is divided into', prompt: 'Which idea is this? — Earth\'s interior is divided into three concentric layers based on chemical composition.', answer: 'Earths interior is divided into', options: ['Earths interior is divided into', 'Plains are extensive low-relief areas', 'The Indian Monsoon is a', 'Coastal landforms are natural features'] },
            { id: 's4', label: 'Coastal landforms are natural features', prompt: 'Which idea is this? — Coastal landforms are natural features shaped by the dynamic interaction of sea waves,.', answer: 'Coastal landforms are natural features', options: ['Coastal landforms are natural features', 'Plains are extensive low-relief areas', 'The Indian Monsoon is a', 'Earths interior is divided into'] },
            { id: 's5', label: 'Natural hazards are extreme geophysical', prompt: 'Which idea is this? — Natural hazards are extreme geophysical or hydrometeorological events — such as.', answer: 'Natural hazards are extreme geophysical', options: ['Natural hazards are extreme geophysical', 'Plains are extensive low-relief areas', 'The Indian Monsoon is a', 'Earths interior is divided into'] },
            { id: 's6', label: 'Plate tectonics is the scientific', prompt: 'Which idea is this? — Plate tectonics is the scientific theory explaining that Earth\'s lithosphere is divided.', answer: 'Plate tectonics is the scientific', options: ['Plate tectonics is the scientific', 'Plains are extensive low-relief areas', 'The Indian Monsoon is a', 'Earths interior is divided into'] }
          ] } }
    ],
    explore: { component: C9_GeographyLandformsPlateausSim, prompt: 'Explore the interactive — Plains, Plateaus and Valleys: Formation and Characteristics' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_10', difficulty: 'standard',
          question: 'Plains are extensive low-relief areas formed primarily by depositional.',
          hint: 'Revisit c9_geo_ch1_2 (Plate Tectonics) for structural controls and c9_geo_ch1_8 (River.',
          misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plains are extensive low-relief areas formed primarily by depositional processes of',
                  options: ['Plains are extensive low-relief areas formed primarily by depositional processes of', 'The Indian Monsoon is a seasonal reversal of wind direction over the Indian subcontinent,', 'Earth\'s interior is divided into three concentric layers based on chemical composition', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically think the Peninsular.' }
          ],
            remediations: { 'all-plateaus-are-old': { steps: ['Use a physical map of India - trace the Northern Plains boundary against the Himalayas (thrust fault) and Peninsular.', 'Draw a cross-section from Delhi to Chennai showing crustal structure: foreland basin (plains) vs.', 'Compare rock ages - plateau has Archaean basement (3.5 Ga), plains have Quaternary alluvium (<2 Ma).', 'Explain that plateau flatness is structural (horizontal lava flows), not erosional; plain flatness is depositional INTO.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Indo-Gangetic Plain is entirely a depositional landform with no structural control." Provide evidence from its northern and.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'old, eroded mountains', 'young, flat lands', 'all plateaus are "old, eroded mountains" and all plains are "young, flat lands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically think the Peninsular.' }
          ],
            remediations: { 'all-plateaus-are-old': { steps: ['Use a physical map of India - trace the Northern Plains boundary against the Himalayas (thrust fault) and Peninsular.', 'Draw a cross-section from Delhi to Chennai showing crustal structure: foreland basin (plains) vs.', 'Compare rock ages - plateau has Archaean basement (3.5 Ga), plains have Quaternary alluvium (<2 Ma).', 'Explain that plateau flatness is structural (horizontal lava flows), not erosional; plain flatness is depositional INTO.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_7', difficulty: 'standard',
          question: 'The Indian Monsoon is a seasonal reversal of wind direction over the Indian.',
          hint: 'Revisit c9_geo_ch2_3 (Air Pressure: Horizontal and Vertical Distribution) – specifically.',
          misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize.',
          parts: [
                { id: 'a', prompt: 'Compare the withdrawal of the Southwest Monsoon with the onset of the Northeast Monsoon. Are they the same process?', answer: 'No, they are distinct',
                  options: ['No, they are distinct', 'just reversal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize the Bay of Bengal.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-originate': { steps: ['Show a wind streamline map of June (from IMD or NCERT atlas) with arrows clearly marking both branches originating from.', 'Trace the Arabian Sea branch: hits Kerala coast June 1 → Mumbai June 10 → Gujarat → Madhya Pradesh → merges with Bay.', 'Trace the Bay branch: hits Andaman May 20 → Myanmar coast → West Bengal → splits along Himalayas (Brahmaputra valley).', 'Overlay rainfall data (June-Sept) showing highest totals on Western Ghats windward side (Arabian Sea branch) and.', 'Ask student to explain why Cherrapunji (Bay branch) and Mahabaleshwar (Arabian Sea branch) are both among the wettest.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize.',
          parts: [
                { id: 'a', prompt: 'Compare the withdrawal of the Southwest Monsoon with the onset of the Northeast Monsoon. Are they the same process?', answer: 'No, they are distinct',
                  options: ['No, they are distinct', 'just reversal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize the Bay of Bengal.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-originate': { steps: ['Show a wind streamline map of June (from IMD or NCERT atlas) with arrows clearly marking both branches originating from.', 'Trace the Arabian Sea branch: hits Kerala coast June 1 → Mumbai June 10 → Gujarat → Madhya Pradesh → merges with Bay.', 'Trace the Bay branch: hits Andaman May 20 → Myanmar coast → West Bengal → splits along Himalayas (Brahmaputra valley).', 'Overlay rainfall data (June-Sept) showing highest totals on Western Ghats windward side (Arabian Sea branch) and.', 'Ask student to explain why Cherrapunji (Bay branch) and Mahabaleshwar (Arabian Sea branch) are both among the wettest.'] } } },
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
        { type: 'subpart', nodeId: 'c9_geo_ch1_12', difficulty: 'standard',
          question: 'Natural hazards are extreme geophysical or hydrometeorological events — such as.',
          hint: 'Revisit c9_geo_ch1_8 (floodplain formation) and c9_geo_ch1_7 (weathering and slope.',
          misconception: 'Students believe landslides are caused only by heavy rain, ignoring that rain is the trigger, not the cause — the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Natural hazards are extreme geophysical or hydrometeorological events',
                  options: ['Natural hazards are extreme geophysical or hydrometeorological events', 'Plains are extensive low-relief areas formed primarily by depositional processes of', 'The Indian Monsoon is a seasonal reversal of wind direction over the Indian subcontinent,', 'Earth\'s interior is divided into three concentric layers based on chemical composition'],
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
            remediations: { 'plate-boundary-and-plate-margin': { steps: ['Use a tectonic map of South Asia (from NCERT Atlas) and trace the Indian Plate boundary with three colored pencils: red.', 'Label each segment with the plate names and movement arrows.', 'Explain that a single plate can have all three boundary types simultaneously.', 'Practice with a blank map until the student can draw and label the Indian Plate boundaries from memory.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
