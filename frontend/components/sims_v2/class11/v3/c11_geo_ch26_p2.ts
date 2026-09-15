import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch26_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch26_p2: SimDef = {
    id: 'v3_c11_geo_ch26_p2',
    title: 'Introduction to Remote Sensing · Part 2/2',
    subtitle: 'Read the Earth in invisible light — and learn why red forests are data, not paint.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Remote Sensing · Part 2/2',
    chapters: ['c11_geo_ch26'],
    nodeIds: ['c11_geo_cbse_26_007', 'c11_geo_cbse_26_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst choosing sensors for a flood map', intro: 'A satellite 700 km up sees infrared your eyes never will — the trick is knowing which platform and which bands answer the question.', goal: 'Explain remote-sensing principles, false-colour composites and the trade-offs among platforms.' },
    discovery: {
        question: 'The satellite image shows the forest glowing bright red — is India\'s vegetation actually scarlet?',
        options: ['No — it\'s a false-colour composite that paints near-infrared as red, and healthy vegetation reflects NIR intensely', 'Yes — tropical forests photograph red', 'Yes — iron-rich soil tints the trees', 'No — the sensor malfunctioned'],
        answer: 'No — it\'s a false-colour composite that paints near-infrared as red, and healthy vegetation reflects NIR intensely',
        hook: 'Sharper isn\'t always better either — a high-resolution sensor can lose the spectral bands that compute crop health and the swath that revisits often enough.',
    },
    teaching: [
        { title: 'Applications of Remote Sensing in India (Agriculture, Forestry, Disaster)', text: 'Applications of Remote Sensing in India refer to the systematic use of satellite-derived data from Indian Remote Sensing (IRS) satellites and other platforms to monitor, map, and manage agricultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_26_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match ground, airborne and spaceborne platforms to a Punjab farmer\'s 3-day wheat-monitoring need, then weigh GPS stations against satellite radar for landslide warning.',
        labels: ['Applications of Remote Sensing', 'Geographic Information System (GIS)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_007', title: 'Applications of Remote Sensing in India (Agriculture, Forestry, Disaster)',
          caseStudy: { intro: 'Imagine you are a district agriculture officer in Punjab during October.',
            decisions: [{ prompt: 'In a standard False Colour Composite (FCC) image from IRS LISS-III, healthy wheat crop in March appears in which colour, and which spectral.', options: [
                { text: 'Healthy wheat in March appears bright red in standard FCC', outcome: 'Healthy wheat in March appears bright red in standard FCC. This is produced by assigning Near.' },
                { text: 'dark blue', outcome: 'Not quite — Students believe "higher spatial resolution is always better" for all applications.', reveals: 'higher-spatial-resolution-is-always' },
                { text: 'higher spatial resolution is always better', outcome: 'Not quite — Students believe "higher spatial resolution is always better" for all applications.', reveals: 'higher-spatial-resolution-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_008', title: 'Geographic Information System (GIS): Concept and Integration with Remote Sensing',
          caseStudy: { intro: 'When you open Google Maps on your phone and see your location as a blue dot on a satellite image of your neighborhood, you are experiencing GIS-remote sensing.',
            decisions: [{ prompt: 'Define GIS and state its five core components as per the Class 11 NCERT framework.', options: [
                { text: 'GIS is a computer-based system for capturing, storing, manipulating, analyzing, managing,', outcome: 'GIS is a computer-based system for capturing, storing, manipulating, analyzing, managing, and.' },
                { text: 'software', outcome: 'Not quite — Students believe GIS is simply "making maps on computer" and that remote sensing images can.', reveals: 'gis-is-simply-making-maps' },
                { text: 'making maps on computer', outcome: 'Not quite — Students believe GIS is simply "making maps on computer" and that remote sensing images can.', reveals: 'gis-is-simply-making-maps' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a satellite false-colour composite in the lab, a student reports: \'The forest is red in this image, so this region has red trees. And for our crop study, we should hire drones — satellites fly too high to give useful data.\'',
            decisions: [{ prompt: 'What\'s wrong with both conclusions?', options: [
                { text: 'Decode the colours: FCC assigns near-infrared reflectance to red — healthy vegetation bounces NIR strongly, which is why forests render red; nothing on the ground is actually red. And altitude isn\'t quality: Sentinel-2 gives calibrated, multi-temporal 10 m data free over whole regions — vital for crop acreage — while drones cover small areas and need stitching and radiometric correction.', outcome: 'The lab report gets it right: spectral signatures are coded into channels, and platform choice is a resolution-coverage-cost trade-off, not a height contest.' },
                { text: 'Accept the red-forest reading — the image records what\'s really there.', outcome: 'FCC colours are assigned, not real: NIR→red is a display convention; misreading it leads to calling fallow fields water bodies and turbid water clear.', reveals: 'fcc-shows-real-colours' },
                { text: 'Back the drones — lower altitude always means better data for any job.', outcome: 'Spatial resolution isn\'t utility: satellites win on radiometric consistency, revisit reliability, coverage and cost-per-km² — exactly what regional crop estimation needs.', reveals: 'lower-altitude-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_008', title: 'You made it',
          caseStudy: { intro: 'Remote sensing reads what eyes can\'t — every surface has a spectral signature, and the platform you pick is a trade of detail against coverage.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_007', difficulty: 'standard',
          question: 'Applications of Remote Sensing in India refer to the systematic use.',
          hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
          misconception: 'Students believe "higher spatial resolution is always better" for all applications.',
          parts: [
                { id: 'a', prompt: 'In a standard False Colour Composite (FCC) image from IRS LISS-III, healthy wheat crop in March appears in which colour, and which spectral band combination.', answer: 'Healthy wheat in March appears bright red in standard FCC',
                  options: ['Healthy wheat in March appears bright red in standard FCC', 'dark blue', 'higher spatial resolution is always better', '"higher spatial resolution is always better" for all applications'],
                  hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
                  misconception: 'Students believe "higher spatial resolution is always better" for all applications.' },
                { id: 'b', prompt: 'A flood monitoring team uses IRS AWiFS data (56 m resolution, 5-day revisit) to map inundation in the Ganga-Brahmaputra delta during July 2023.', answer: 'Maximum continuous cloud-free gap = 10 days (July 10 to July 20',
                  options: ['Maximum continuous cloud-free gap = 10 days (July 10 to July 20', 'continuous', 'higher spatial resolution is always better', '"higher spatial resolution is always better" for all applications'],
                  hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
                  misconception: 'Students believe "higher spatial resolution is always better" for all applications.' },
                { id: 'c', prompt: 'Compare the suitability of IRS LISS-III (23.5 m, 4 bands, 24-day revisit) versus Sentinel-2 (10 m, 13 bands, 5-day revisit) for operational kharif rice area.', answer: 'Recommend IRS LISS-III for operational use despite coarser resolution',
                  options: ['Recommend IRS LISS-III for operational use despite coarser resolution', 'higher spatial resolution is always better', '"higher spatial resolution is always better" for all applications'],
                  hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
                  misconception: 'Students believe "higher spatial resolution is always better" for all applications.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Draw a 100 km × 100 km grid on paper. Calculate how many LISS-III scenes (141 km swath) vs LISS-IV scenes (70 km swath).', 'On a calendar, mark 5-day intervals (AWiFS) vs 24-day intervals (LISS-III) vs 26-day intervals (Cartosat) during.', 'Visit NRSC Bhuvan portal (bhuvan.nrsc.gov.in) - open "Crop Assessment" and "Flood Mapping" services.', 'Write one paragraph explaining why "best resolution" ≠ "best operational sensor" using your calculations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "higher spatial resolution is always better" for all applications.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since IRS Resourcesat-2A LISS-IV provides 5.8 m resolution, it should replace LISS-III (23.5 m) for all forest cover mapping.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'higher spatial resolution is always better', '"higher spatial resolution is always better" for all applications'],
                  hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
                  misconception: 'Students believe "higher spatial resolution is always better" for all applications.' },
                { id: 'b', prompt: 'Design a remote sensing-based workflow to assess drought impact on rabi crops in Bundelkhand region (Uttar Pradesh-Madhya Pradesh) using only Indian satellite.', answer: 'sensors and bands, (',
                  options: ['sensors and bands, (', 'higher spatial resolution is always better', '"higher spatial resolution is always better" for all applications'],
                  hint: 'Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) for spectral behaviour.',
                  misconception: 'Students believe "higher spatial resolution is always better" for all applications.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Draw a 100 km × 100 km grid on paper. Calculate how many LISS-III scenes (141 km swath) vs LISS-IV scenes (70 km swath).', 'On a calendar, mark 5-day intervals (AWiFS) vs 24-day intervals (LISS-III) vs 26-day intervals (Cartosat) during.', 'Visit NRSC Bhuvan portal (bhuvan.nrsc.gov.in) - open "Crop Assessment" and "Flood Mapping" services.', 'Write one paragraph explaining why "best resolution" ≠ "best operational sensor" using your calculations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_008', difficulty: 'standard',
          question: 'Geographic Information System (GIS) is a computer-based system for capturing.',
          hint: 'Revisit c11_geo_cbse_26_001 (stages) and c11_geo_cbse_26_007 (interpretation elements.',
          misconception: 'Students believe GIS is simply "making maps on computer" and that remote sensing images can be directly overlaid in GIS.',
          parts: [
                { id: 'a', prompt: 'Explain why remotely sensed satellite imagery must be georeferenced before it can be used as a data layer in GIS, and describe what happens if this step.', answer: 'Georeferencing assigns real-world coordinates (latitude/longitude or projected',
                  options: ['Georeferencing assigns real-world coordinates (latitude/longitude or projected', 'georeferencing improves image quality', 'making maps on computer'],
                  hint: 'Revisit c11_geo_cbse_26_001 (stages) and c11_geo_cbse_26_007 (interpretation elements + color.',
                  misconception: 'Students believe GIS is simply "making maps on computer" and that remote sensing images can be directly overlaid in GIS without any.' },
                { id: 'b', prompt: 'A Landsat 8 image (30m spatial resolution) covers a 185km × 185km scene. Calculate the number of pixels in one band of this image.', answer: '**Step 1:** Convert scene dimensions to meters: 185 km = 185,000 m',
                  options: ['**Step 1:** Convert scene dimensions to meters: 185 km = 185,000 m', 'making maps on computer'],
                  hint: 'Revisit c11_geo_cbse_26_001 (stages) and c11_geo_cbse_26_007 (interpretation elements + color.',
                  misconception: 'Students believe GIS is simply "making maps on computer" and that remote sensing images can be directly overlaid in GIS without any.' },
                { id: 'c', prompt: 'Compare raster and vector data models for representing the following geographic features in a GIS project for watershed management in the Western Ghats: (a).', answer: 'elevation surface, (',
                  options: ['elevation surface, (', 'making maps on computer'],
                  hint: 'Revisit c11_geo_cbse_26_001 (stages) and c11_geo_cbse_26_007 (interpretation elements + color.',
                  misconception: 'Students believe GIS is simply "making maps on computer" and that remote sensing images can be directly overlaid in GIS without any.' }
          ],
            remediations: { 'gis-is-simply-making-maps': { steps: ['** Take a printed IRS LISS-III FCC image (from c11_geo_cbse_26_007 activity) and a transparent overlay with district.', '** Open QGIS (free), load the same image and shapefile. Observe CRS (Coordinate Reference System) mismatch warning.', '** Use Ground Control Points (GCPs) from known locations (railway stations, road intersections) to georeference the.', '** Now overlay works. Extract water bodies using Band 4 (NIR) threshold → convert to vector → intersect with district.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
